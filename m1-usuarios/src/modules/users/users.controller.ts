import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";

import {
  createOrUpdateAppUserDocument
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";


/*
  Function: countUsers.
  Inputs: None.
  Description: Counts all users registered in the AppUser table.
  Outputs: JSON response with the total number of users.
*/
export async function countUsers(_req: Request, res: Response) {
  try {
    const totalUsers = await prisma.appUser.count();

    return res.json({
      totalUsers,
    });
  } catch (error) {
    console.error("countUsers error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

/*
  Function: listUsers.
  Inputs: None.
  Description: Retrieves a small list of users from the AppUser table.
  Outputs: JSON response containing AppUser records.
*/
export async function listUsers(_req: Request, res: Response) {
  try {
    const users = await prisma.appUser.findMany({
      take: 20,
      select: {
        UserID: true,
        FirstName: true,
        LastName: true,
        UserName: true,
        Email: true,
        IsAdmin: true,
        NumberPublications: true,
        RegisteredAt: true,
        GenderID: true,
        CountryID: true,
        AccountStateID: true,
      },
    });

    return res.json(users);
  } catch (error) {
    console.error("listUsers error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

/**
 * Function: registerUser
 * Inputs:
 *   - The following inputs are strings:
 *      firstName, lastName, username, email, password
 *   - The other ones are numbers. These are the ids of each catalogue element selected by the user :
 *      genderId, countryId
 * 
 */
export async function registerUser(req: Request, res: Response) {
  try {
    const {firstName, lastName, username, email, password, genderId,  countryId} = req.body;

    const fieldsToValidate = { firstName, lastName, username, email, password };

    for(const[key, value] of Object.entries(fieldsToValidate)) {
      if(!value || typeof value !== 'string' || value.trim() === '') {
        return res.status(400).json({
          error: `Invalid or missing ${key}`,
        });
      }
    }

    const parsedGenderId = Number(genderId);
    const parsedCountryId = Number(countryId);
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!Number.isInteger(parsedGenderId) || parsedGenderId <= 0) {
      return res.status(400).json({
        error: "Invalid or missing genderId",
      });
    }

    if (!Number.isInteger(parsedCountryId) || parsedCountryId <= 0) {
      return res.status(400).json({
        error: "Invalid or missing countryId",
      });
    }

    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    const appUser = await prisma.appUser.create({
      data: {
        FirstName : cleanFirstName,
        LastName : cleanLastName,
        UserName : cleanUsername,
        Email : cleanEmail, 
        Password : hashedPassword,
        GenderID : parsedGenderId,
        CountryID : parsedCountryId,
        AccountStateID : 1,
      },
      select : {
        UserID : true,
        UserName : true,
      }
    });

    const mongoDocument = await createOrUpdateAppUserDocument(appUser.UserID, appUser.UserName);

    if(!mongoDocument?._id) {
      return res.status(500).json({
          error: "Mongo document was not created or updated",
      });
    }

    await prisma.appUser.update({
      where : {
        UserID : appUser.UserID,
      },
      data : {
        MongoDocumentID : mongoDocument._id.toString(),
      }
    });

      return res.status(201).json({
        message: "AppUser uploaded succesfully",
        appUserId: appUser.UserID,
    });

  }catch(error) {
    console.error("registerUser error:", error);

    return res.status(500).json({
       error: "Internal server error",
    })
  }
}



/**
 * Function: loginUser
 * Inputs:
 *   - email: String. User email.
 *   - password: String. User password.
 * Description: Validates user credentials using bcrypt comparison.
 * Outputs: JSON response with basic user data if login is successful.
 */
export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({
        error: "Invalid or missing email",
      });
    }

    if (!password || typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({
        error: "Invalid or missing password",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const appUser = await prisma.appUser.findFirst({
      where: {
        Email: cleanEmail,
      },
      select: {
        UserID: true,
        FirstName: true,
        LastName: true,
        UserName: true,
        Email: true,
        Password: true,
        IsAdmin: true,
        AccountStateID: true,
        MongoDocumentID: true,
      },
    });

    if (!appUser) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      cleanPassword,
      appUser.Password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    if (appUser.AccountStateID !== 1) {
      return res.status(403).json({
        error: "Account is not active",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        userId: appUser.UserID,
        firstName: appUser.FirstName,
        lastName: appUser.LastName,
        username: appUser.UserName,
        email: appUser.Email,
        isAdmin: appUser.IsAdmin,
        mongoDocumentId: appUser.MongoDocumentID,
      },
    });
  } catch (error) {
    console.error("loginUser error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

type Publication = {
  BoycottID: number;
  Title: string;
  CaseNumber?: number;
  PublicationDate: Date;
  MongoDocumentId: string;
  CreatorID: number;
  BoycottStateID: number;
  InjusticeTypeID: number;
  EntityID: number;
}

type commentBoycott = {
  CommentBoycottID: Number;
  Description: string;
  CommentDate: Date;
  BoycottID: Number;
  CommentStateID: Number;
}

type Entity = {
  EntityID: Number;
  EntityName: string;
  MongoDocumentID: string;
}

type history = {
  Publication : Publication[];
  Comments : commentBoycott[];
  Entities : Entity[];
}


function userHistoryByUsername(username: string) : {Publication[], }
export async function userHistory(req: Request, res: Response) {
  try {
    const {email, username} = req.body;

    if ((!email) && (!username)) {
      return res.status(400).json({
        error: "Missing email or username",
      });
    }

    if(typeof email !== "string" || typeof username !== "string") {
      return res.status(400).json({
        error: "Invalid email or username",
      });
    }

    if(email.trim() == "" && username.trim() == "") {
      return res.status(400).json({
        error: "Invalid email or username",
      });
    }

    if(email.trim() == "") {

    }





  }catch(error) {
    console.log("userHistory error:", error);
    
    return res.status(500).json({
      error: "Internal server error",
    })
  }
}
