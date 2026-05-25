import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

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
    const {email} = req.body;
    const ID = await prisma.appUser.findUnique({
      where : {Email : email},
      select : {UserID : true}
    });
    
    if (!Number.isInteger(ID?.UserID)) {
      return res.status(400).json({
        error: "Invalid or missing genderId",
      });
    }
    const Id = Number(ID?.UserID);
    
    const Deleterol = await prisma.admin.delete({
      where : {AdminID : Id},
    })

    const rol = await prisma.normalUser.create({
      data : {NormalUserID : Id},
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
    const {email} = req.body;
    const ID = await prisma.appUser.findUnique({
      where : {Email : email},
      select : {UserID : true}
    });
    
    if (!Number.isInteger(ID?.UserID)) {
      return res.status(400).json({
        error: "Invalid or missing genderId",
      });
    }
    const Id = Number(ID?.UserID);
    
    const Deleterol = await prisma.normalUser.delete({
      where : {NormalUserID : Id},
    })

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
    console.error("Rol error:", error);

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
