import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

import {
  createOrUpdateAppUserDocument,
  getAppUserDocumentByUserId,
  createFileMetadata,
  updateAppUserPicture,
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";

import {
  uploadFileToGridFS,
} from "../../../../m0-base-datos/src/services/gridfs.service";


import { buildFileMetadata } from "../../../../m0-base-datos/src/utils/fileMetadata";

import {
  encryptText,
  safeDecryptText,
} from "../../../../m0-base-datos/src/utils/encryption";

import { createHmac} from "crypto";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

//function for the JWT token 
function base64Encode(text: string): string {
  return btoa(text).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}

function base64Decode(text: string): string {
  text = text.replace(/-/g, "+").replace(/_/g,"/");
  while (text.length % 4){
    text += "=";
  }
  return atob(text);
}

//Creates a token with the email and the ID of the user 
function GenerateJWT(email: string, id:Number): string {
  try {
    const header = {alg: "HS256", typ: "JWT"};
    const payload = {id: id, email: email};
    const encryptedheader = base64Encode(JSON.stringify(header));
    const encryptedpayload = base64Encode(JSON.stringify(payload));
    const pass = "askjda1l492_+?aaj@@_+s7102j4asf";
    const sign = createHmac("sha256", pass).update(`${encryptedheader}.${encryptedpayload}`).digest("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");


    return `${encryptedheader}.${encryptedpayload}.${sign}`;
  } catch (error) {
    console.error("countUsers error:", error);

    return "";
  }
}



//Checks if the token is valid and has not been changed 
function verifyToken(token: string): boolean {
  const [encryptedheader, encryptedpayload, sign] = token.split(".");
  const pass = "askjda1l492_+?aaj@@_+s7102j4asf";
  const TokenSign = createHmac("sha256", pass).update(`${encryptedheader}.${encryptedpayload}`).digest("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
  return TokenSign === sign;
} 


//gets the email 
function GetTokenEmail(token: string): string {
  const [encryptedheader,encryptedpayload,sign] = token.split(".");
  const payload = JSON.parse(base64Decode(encryptedpayload));
  return payload.email;
}

//gets the id
function GetTokenid(token: string): string {
  const [encryptedheader,encryptedpayload,sign] = token.split(".");
  const payload = JSON.parse(base64Decode(encryptedpayload));
  return payload.id;
}

export async function pruebaToken(req: Request, res: Response) {
    const email = "pruebadetoken@mail";
    let id = 2;
    const token = GenerateJWT(email,id);
    const ver = verifyToken(token);
    const emailToken = GetTokenEmail(token);
    const idToken = GetTokenid(token);
    return res.json({
        originalEmail : email,
        originid: id, 
        token : token,
        verify :  ver,
        emailtoken : emailToken,
        idtoken: idToken
      });
}

export async function checkRol(req: Request, res: Response) {
  try {
    const {email} = req.body;
    const ID = await prisma.appUser.findUnique({
      where : {Email : email},
      select : {UserID : true}
    });
    const rol = await prisma.admin.findUnique({
      where : {AdminID : ID?.UserID},
      select : {IsSuperAdmin : true}
    });

    if(rol){
      return res.json({
        result : '1',
        rol : rol.IsSuperAdmin
      });
    }
    return res.json({
      result : '0',
    });
  } catch (error) {
    console.error("Rol error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
export async function convertAdminToUser(req: Request, res: Response) {
  try {
    const {ID} = req.body;
    
    if (!Number.isInteger(ID?.UserID)) {
      return res.status(400).json({
        error: "Invalid",
      });
    }
    const Id = Number(ID?.UserID);
    
    const Deleterol = await prisma.admin.delete({
      where : {AdminID : Id},
    })

    const rol = await prisma.normalUser.create({
      data : {NormalUserID : Id},
    });
    const isAdminchange = await prisma.appUser.update({
      where : {UserID : Id},
      data : {IsAdmin : false},
    });
    if(rol){
      return res.json({
        result : '1',
      });
    }
    return res.json({
      result : '0',
    });
  } catch (error) {
    console.error("Rol error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function convertUserToAdmin(req: Request, res: Response) {
  try {
    const {ID} = req.body;
    
    if (!Number.isInteger(ID?.UserID)) {
      return res.status(400).json({
        error: "Invalid",
      });
    }
    const Id = Number(ID?.UserID);
    
    const Deleterol = await prisma.normalUser.delete({
      where : {NormalUserID : Id},
    })

    const isAdminchange = await prisma.appUser.update({
      where : {UserID : ID},
      data : {IsAdmin : true},
    });

    const rol = await prisma.admin.create({
      data : {AdminID : Id,
              IsSuperAdmin: false,
    },
    });
    if(rol){
      return res.json({
        result : '1',
      });
    }
    return res.json({
      result : '0',
    });
  } catch (error) {
    console.error("Error:", error);

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

    const decryptedUsers = users.map((user) => ({
      ...user,
      FirstName: safeDecryptText(user.FirstName),
      LastName: safeDecryptText(user.LastName),
      Email: safeDecryptText(user.Email),
    }));

    return res.json(decryptedUsers);
  } catch (error) {
    console.error("listUsers error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}


export async function listNormalUsers(_req: Request, res: Response) {
  try {
    const users = await prisma.normalUser.findMany({
      include: {
        AppUser_NormalUser_NormalUserIDToAppUser: true,
      },
    });
    
    const decryptedUsers = users.map((user) => ({
      ...user,
      FirstName: safeDecryptText(user.AppUser_NormalUser_NormalUserIDToAppUser.FirstName),
      LastName: safeDecryptText(user.AppUser_NormalUser_NormalUserIDToAppUser.LastName),
      Email: safeDecryptText(user.AppUser_NormalUser_NormalUserIDToAppUser.Email),
    }));

    return res.json(decryptedUsers);
  } catch (error) {
    console.error("listUsers error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function listAdminUsers(_req: Request, res: Response) {
  try {
    const users = await prisma.admin.findMany({
      include: {
        AppUser_Admin_AdminIDToAppUser: true,
      },
    });
    
    const decryptedUsers = users.map((user) => ({
      ...user,
      FirstName: safeDecryptText(user.AppUser_Admin_AdminIDToAppUser.FirstName),
      LastName: safeDecryptText(user.AppUser_Admin_AdminIDToAppUser.LastName),
      Email: safeDecryptText(user.AppUser_Admin_AdminIDToAppUser.Email),
    }));

    return res.json(decryptedUsers);
  } catch (error) {
    console.error("listUsers error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function listAccountStates(_req: Request, res: Response) {
  try {
    const accounts = await prisma.accountState.findMany();
    return res.json(accounts);
  } catch (error) {
    console.error("listUsers error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

/**
 * Function: getUserIdByEmail
 * Inputs:
 *   - email: String. Plain email received from the request.
 * Description: Searches an AppUser by comparing the provided email with the decrypted emails stored in the database.
 * Outputs: Object with:
 *   - found: Boolean indicating if the user was found.
 *   - appUserId: Number with the AppUser ID if found, or a negative value if not found.
 */
async function getUserIdByEmail(
  email: string
): Promise<{ found: boolean; appUserId: number }> {
  try {
    const users = await prisma.appUser.findMany({
      select: {
        UserID: true,
        Email: true,
      },
    });

    const cleanEmail = email.trim().toLowerCase();

    const user = users.find((user) => {
      const decryptedEmail = safeDecryptText(user.Email).toLowerCase();
      return decryptedEmail === cleanEmail;
    });

    if (user) {
      return {
        found: true,
        appUserId: user.UserID,
      };
    }

    return {
      found: false,
      appUserId: -1,
    };
  } catch (error) {
    console.log("getUserIdByEmail error", error);

    return {
      found: false,
      appUserId: -2,
    };
  }
}


export async function existingEmail(req: Request, res: Response) {
  try {
    const email =
      typeof req.query.email === "string" ? req.query.email.trim().toLowerCase() : "";

    if (!email) {
      return res.status(400).json({
        error: "username or email is required",
      });
    }

    const users = await prisma.appUser.findMany({
      select : {
        UserID : true,
        Email : true,
      },
    })

    const cleanEmail = email.trim().toLowerCase();
    let appUserid = -1;

    const existingEmail = users.find((user) => {
      const decryptedEmail = safeDecryptText(user.Email).toLocaleLowerCase();
      appUserid = user.UserID;
      return decryptedEmail === cleanEmail;
    });

    if(existingEmail) {
      return res.json({
        found: true,
        appUserId: appUserid,
      });
    }

    return res.json({
      found : false,
      appUserId: -1,
    })

  }catch(error) {
    console.log("getIdByEmail error", error);
    return res.status(500).json({
            error:
                "Internal server error",
        });
  }
}


/**
 * Function: registerUser
 * Inputs:
 *   - firstName: String. User first name.
 *   - lastName: String. User last name.
 *   - username: String. Public username.
 *   - email: String. User email.
 *   - password: String. Plain password received from the frontend.
 *   - genderId: Number. Gender ID selected by the user.
 *   - countryId: Number. Country ID selected by the user.
 * Description: Registers a new AppUser by validating the input data, encrypting sensitive personal data, hashing the password, creating the MySQL record, creating the base MongoDB document, and storing the MongoDocumentID in MySQL.
 * Outputs: JSON response with the created AppUser ID.
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

    const existingUsername = await prisma.appUser.findUnique({
      where: {
        UserName: cleanUsername,
      },
      select: {
        UserID: true,
      },
    });

    if (existingUsername) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    const existingEmail = await getUserIdByEmail(cleanEmail);

    if (existingEmail.found) {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    const encryptedFirstName = encryptText(cleanFirstName);
    const encryptedLastName = encryptText(cleanLastName);
    const encryptedEmail = encryptText(cleanEmail);

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
        FirstName : encryptedFirstName,
        LastName : encryptedLastName,
        UserName : cleanUsername,
        Email : encryptedEmail, 
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

    await prisma.normalUser.create({
      data : {
        NormalUserID : appUser.UserID,
      }
    })

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
 *   - email: String. Plain email received from the frontend.
 *   - password: String. Plain password received from the frontend.
 * Description: Authenticates an AppUser by locating the user through decrypted email comparison and validating the password with bcrypt.
 * Outputs: JSON response with basic decrypted user data if login is successful.
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

    const appUserId = await getUserIdByEmail(cleanEmail);

    const appUser = await prisma.appUser.findFirst({
      where: {
        UserID: appUserId.appUserId,
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
        firstName: safeDecryptText(appUser.FirstName),
        lastName: safeDecryptText(appUser.LastName),
        username: appUser.UserName,
        email: safeDecryptText(appUser.Email),
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
  CaseNumber: number | null;
  PublicationDate: Date;
  MongoDocumentId: string | null;
  CreatorID: number;
  BoycottStateID: number;
  InjusticeTypeID: number;
  EntityID: number;
};

type CommentBoycott = {
  CommentBoycottID: number;
  Description: string;
  VotesInFavor: number;
  VotesAgainst: number;
  CommentDate: Date;
  BoycottID: number;
  CommentStateID: number;
};

type Entity = {
  EntityID: number;
  EntityName: string;
  MongoDocumentID: string | null;
};

type History = {
  userId?: number;
  Publications: Publication[];
  Comments: CommentBoycott[];
  Entities: Entity[];
};


/** 
 * Function: getUserHistory
 * Input:
 *    - username: String that has the username
 *    - email: String that has the user's email 
 * Description: Auxiliary function which creates the user's history 
 * It needs that one of them isn't empthy.
 * Output: 
*/
async function getUserHistory(username: string, email: string) : Promise<History>  {
  try {
    let appUser : any;
    
    if(username.trim() == "") {

        const userSearch = await getUserIdByEmail(email);

          if (!userSearch.found) {
              return {
                Publications: [],
                Comments: [],
                Entities: [],
              };
            }

        appUser = await prisma.appUser.findUnique({
        where: {
          UserID : userSearch.appUserId,
        },
        select : {
          UserID : true,
        },
      });
    }

    else {
      appUser = await prisma.appUser.findUnique({
        where: {
          UserName : username,
        },
        select : {
          UserID : true,
        },
      });
    }
    
    
    if(!appUser) {
      return {
        Publications: [],
        Comments: [],
        Entities: []
      };
    }
    
    const publications = await prisma.boycott.findMany({
      where : {
        CreatorID : appUser?.UserID,
      },
      select : {
        BoycottID: true,
        Title: true,
        CaseNumber: true,
        PublicationDate: true,
        MongoDocumentId: true,
        CreatorID: true,
        BoycottStateID: true,
        InjusticeTypeID: true,
        EntityID: true,
      }
    });
    

    const comments = await prisma.commentBoycott.findMany({
      where : {
        CreatorID : appUser.UserID,
      },
      select : {
        CommentBoycottID : true,
        VotesInFavor : true,
        VotesAgainst : true,
        Description: true,
        CommentDate : true,
        BoycottID : true,
        CommentStateID : true
      },
    });

    const boycotts = await prisma.boycott.findMany({
      where: {
        OR: [
          {
            CreatorID: appUser.UserID,
          },
          {
            CommentBoycott: {
              some: {
                CreatorID: appUser.UserID,
              },
            },
          },
        ],
      },
      distinct: ["EntityID"],
      select: {
        Entity: {
          select: {
            EntityID: true,
            EntityName: true,
            MongoDocumentID: true,
          },
        },
      },
    });

    const entities = boycotts.map((boycott) => boycott.Entity);

    return {
      userId: appUser.UserID,
      Publications : publications,
      Comments:comments,
      Entities: entities, 
    };

  }catch(error) {
    console.error("Error en getUserHistory:", error);        
    throw new Error("No se pudo obtener el historial del usuario debido a un error interno.");
  }
}

/**
 * Function: userHistory
 * Inputs:
 *   - username: Optional string from query params.
 *   - email: Optional string from query params.
 * Description: Gets the activity history of a user by username or email. The history includes publications created by the user, comments made by the user, and entities related to those interactions.
 * Outputs: JSON response with user identifier data and grouped history information.
 */
export async function userHistory(req: Request, res: Response) {
  try {
    const username =
      typeof req.query.username === "string" ? req.query.username.trim() : "";

    const email =
      typeof req.query.email === "string" ? req.query.email.trim().toLowerCase() : "";

    if (!username && !email) {
      return res.status(400).json({
        error: "username or email is required",
      });
    }

    const history = await getUserHistory(username, email);

    return res.json({
      userAppId: history.userId,
      username,
      email,
      history: {
        publications: history.Publications,
        comments: history.Comments,
        entities: history.Entities,
      },
    });

  }catch(error) {
    console.log("userHistory error:", error);
    
    return res.status(500).json({
      error: "Internal server error",
    })
  }
}

/**
Function: getAppUserProfile,
Inputs: appUserId from request params,
Description: Retrieves the app user profile information from Prisma,,
including username, country, gender and account status, and obtains,
the picture metadata stored in MongoDB.,
Outputs: JSON with the app user profile or an error message.*/
export async function getAppUserProfile(
    req: Request,
    res: Response
) {
    try {
        const appUserId = Number(
            req.params.appUserId
        );

        const appUser =
            await prisma.appUser.findUnique({
                where: {
                    UserID: appUserId,
                },
                select: {
                    UserID: true,
                    FirstName: true,
                    LastName: true,
                    UserName: true,
                    Email: true,
                    CountryID: true,
                    GenderID: true,
                    AccountStateID: true,
                    MongoDocumentID: true,
                },
            });

        if (!appUser) {
            return res.status(404).json({
                error: "appUser not found",
            });
        }

        const mongoDocument =
            await getAppUserDocumentByUserId(
                appUser.UserID
            );

        const isSuperAdmin = await prisma.Admin.findUnique ({
              where: {
                AdminID : appUserId,
              },
              select : {
                IsSuperAdmin : true,
              },
        });

        const isAdmin = isSuperAdmin ? true : false;

        return res.status(200).json({
            appUserId: appUser.UserID,
            firstName: 
                safeDecryptText(appUser.FirstName),
            lastName : 
                safeDecryptText(appUser.LastName),
            appUserName:
                appUser.UserName,
            email:
              safeDecryptText(appUser.Email),
            country:
                appUser.CountryID,
            gender:
                appUser.GenderID,
            accountStatus:
                appUser.AccountStateID,

            picture:
                mongoDocument
                    ?.picture ?? null,
            
            isSuperAdmin : isSuperAdmin?.IsSuperAdmin || false,

            isAdmin : isAdmin,

            isNormal : !isAdmin,
        });

    } catch (error) {
        console.error(
            "getAppUserProfile error:",
            error
        );

        return res.status(500).json({
            error:
                "Internal server error",
        });
    }
}

/**
 * Function: googleLogin
 * Inputs: token (Google).
 * Description: Authenticates the user via Google and registers them if they do not exist.
 * Outputs: JSON response including the system's JWT and user data.
**/
export async function googleLogin(req: Request, res: Response) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Google token is required" });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(401).json({ error: "Invalid Google token" });
    }

    const { email, given_name, family_name, name, picture } = payload;
    const cleanEmail = email.toLowerCase();
    
    const genderRecord = await prisma.gender.findFirst({
      where: {
        GenderName: { contains: 'Other' } 
      }
    });
    
    const defaultGenderId = genderRecord?.GenderID|| 3;
    
    const userSearch = await getUserIdByEmail(cleanEmail);

    let appUser = null;

    if (userSearch.appUserId > -1) {
      appUser = await prisma.appUser.findUnique({
        where: {
          UserID: userSearch.appUserId,
        },
      });
    }


    if (userSearch.appUserId === -1) {
      const randomNum = Math.floor(Math.random() * 10000);
      const filledNum = String(randomNum).padStart(4, '0');
      appUser = await prisma.appUser.create({
        data: {
          FirstName: encryptText(given_name || ""),
          LastName: encryptText(family_name || ""),
          UserName: `${email.split('@')[0]}${filledNum}`,
          Email: encryptText(cleanEmail),
          Password: "", 
          IsAdmin: false, 
          AccountStateID: 1,
          CountryID: 196,           
          GenderID: defaultGenderId,
        },
      });

      const mongoDocument = await createOrUpdateAppUserDocument(
        appUser.UserID,
        appUser.UserName,
      );
      
      if (mongoDocument?._id) {
        appUser = await prisma.appUser.update({
          where: {
            UserID: appUser.UserID,
          },
          data: {
            MongoDocumentID: mongoDocument._id.toString(),
          },
        });
      }

      await prisma.normalUser.create({
        data : {
          NormalUserID : appUser.UserID,
        }
      });

      if (picture) {
        const imageResponse = await fetch(picture);

        if (imageResponse.ok) {
          const arrayBuffer = await imageResponse.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const contentType =
            imageResponse.headers.get("content-type") ?? "image/jpeg";

          const mongoFileId = await uploadFileToGridFS(
            `google-profile-${appUser.UserID}.jpg`,
            buffer,
            contentType
          );

          const fileMetadata = buildFileMetadata(
            `google-profile-${appUser.UserID}.jpg`,
            buffer.length,
            contentType,
            mongoFileId
          );

          await createFileMetadata(fileMetadata);

          await updateAppUserPicture(
            appUser.UserID,
            appUser.UserName,
            fileMetadata
          );
        }
      }
    }

    if (appUser.AccountStateID !== 1) {
      return res.status(403).json({ error: "Account is not active" });
    }
    
    return res.status(200).json({
      message: "Login successful with Google",
      user: {
        userId: appUser.UserID,
        firstName: safeDecryptText(appUser.FirstName),
        lastName: safeDecryptText(appUser.LastName),
        username: appUser.UserName,
        email: safeDecryptText(appUser.Email),
        isAdmin: appUser.IsAdmin,
        isSuperAdmin : false,
        isNormal : !appUser.isAdmin,
        mongoDocumentId: appUser.MongoDocumentID,
      },
    });

  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(401).json({ error: "Authentication failed" });
  }
}

/**
 * Function: updateAppUserProfile
 * Inputs: appUserId from request params and
 * optional profile fields from request body
 * Description: Updates only the provided
 * app user profile fields in Prisma.
 * Outputs: JSON with updated app user
 * information or an error message.
 */
export async function updateAppUserProfile(
  req: Request,
  res: Response
) {
  try {
    const appUserId =
      Number(req.params.appUserId);

    const appUser =
      await prisma.appUser.findUnique({
        where: {
          UserID: appUserId,
        },
      });

    if (!appUser) {
      return res.status(404).json({
        error: "appUser not found",
      });
    }

    const updatedAppUser =
      await prisma.appUser.update({
        where: {
          UserID: appUserId,
        },
        data: {
        FirstName: req.body.firstName
            ? encryptText(req.body.firstName.trim())
            : appUser.FirstName,

          LastName: req.body.lastName
            ? encryptText(req.body.lastName.trim())
            : appUser.LastName,
          UserName:
            req.body.userName?.trim() ||
            appUser.UserName,


          GenderID:
            req.body.genderId
              ? Number(req.body.genderId)
              : appUser.GenderID,

          CountryID:
            req.body.countryId
              ? Number(req.body.countryId)
              : appUser.CountryID,
        },
      });

    return res.status(200).json({
      message:
        "appUser updated successfully",

        appUser: {
          userId: updatedAppUser.UserID,
          firstName: safeDecryptText(updatedAppUser.FirstName),
          lastName: safeDecryptText(updatedAppUser.LastName),
          userName: updatedAppUser.UserName,
          email: safeDecryptText(updatedAppUser.Email),
          genderId: updatedAppUser.GenderID,
          countryId: updatedAppUser.CountryID,
          accountStateId: updatedAppUser.AccountStateID,
        },
      
    });

  } catch (error) {
    console.error(
      "updateAppUserProfile error:",
      error
    );

    return res.status(500).json({
      error:
        "Internal server error",
    });
  }
}