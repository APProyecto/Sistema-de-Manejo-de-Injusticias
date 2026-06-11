import { prisma } from "../lib/prisma";
import { checkJwt } from "../middlewares/auth.middleware";
import { Router } from "express";
import usersRoutes from "../modules/users/users.routes";
import fileRoutes from "../modules/files/files.routes";
import cataloguesRoutes from "../modules/catalogues/catalogues.routes";

import {
  encryptText,
  safeDecryptText,
} from "../../../m0-base-datos/src/utils/encryption";

import {
  createOrUpdateAppUserDocument,
  updateAppUserPicture,
  createFileMetadata,
} from "../../../m0-base-datos/src/services/mongoDocuments.service";

import { uploadFileToGridFS } from "../../../m0-base-datos/src/services/gridfs.service";
import { buildFileMetadata } from "../../../m0-base-datos/src/utils/fileMetadata";


import crypto from "crypto";
const router = Router();

async function getUserIdByEmail(email: string): Promise<number | null> {
  const users = await prisma.appUser.findMany({
    select: {
      UserID: true,
      Email: true,
    },
  });

  const cleanEmail = email.trim().toLowerCase();

  const foundUser = users.find((user) => {
    const decryptedEmail = safeDecryptText(user.Email).toLowerCase();
    return decryptedEmail === cleanEmail;
  });

  return foundUser?.UserID ?? null;
}


router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M1 Usuarios API root",
  });
});

router.use("/users", usersRoutes);

router.use("/files", fileRoutes);

router.use("/catalogues", cataloguesRoutes);

router.get(
  "/protected",
  checkJwt,
  (_req, res) => {
    res.json({
      message: "JWT valido",
    });
  }
);

router.get("/db-test", async (_req, res) => {
  try {
    const count = await prisma.appUser.count();

    res.json({
      ok: true,
      totalUsers: count,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      error,
    });
  }
});

router.get("/me", checkJwt, async (req: any, res) => {
  try {
    const email = req.headers["x-user-email"] as string;
    const name = (req.headers["x-user-name"] as string) || "User";
    const pictureUrl = req.headers["x-user-picture"] as string;

    if (!email) {
      return res.status(400).json({
        error: "x-user-email header is required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingUserId = await getUserIdByEmail(cleanEmail);

    let user = existingUserId
      ? await prisma.appUser.findUnique({
          where: {
            UserID: existingUserId,
          },
        })
      : null;

    if (!user) {
      const parts = name.trim().split(" ");
      const firstName = parts[0] || "";
      const lastName = parts.slice(1).join(" ");

      const username = cleanEmail.split("@")[0];

      user = await prisma.appUser.create({
        data: {
          FirstName: encryptText(firstName),
          LastName: encryptText(lastName),
          UserName: username,
          Email: encryptText(cleanEmail),
          Password: "",
          RegisteredAt: new Date(),
          IsAdmin: false,
          NumberPublications: 0,
          CreatedAt: new Date(),

          GenderID: 3,
          CountryID: 40,
          AccountStateID: 1,
        },
      });

      await prisma.normalUser.create({
        data: {
          NormalUserID: user.UserID,
        },
      });

      const mongoDocument = await createOrUpdateAppUserDocument(
        user.UserID,
        user.UserName
      );

      if (mongoDocument?._id) {
        user = await prisma.appUser.update({
          where: {
            UserID: user.UserID,
          },
          data: {
            MongoDocumentID: mongoDocument._id.toString(),
          },
        });
      }

      if (pictureUrl) {
        const imageResponse = await fetch(pictureUrl);

        if (imageResponse.ok) {
          const arrayBuffer = await imageResponse.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const contentType =
            imageResponse.headers.get("content-type") || "image/jpeg";

          const fileName = `auth0-profile-${user.UserID}.jpg`;

          const mongoFileId = await uploadFileToGridFS(
            fileName,
            buffer,
            contentType
          );

          const picture = buildFileMetadata(
            fileName,
            buffer.length,
            contentType,
            mongoFileId
          );

          await createFileMetadata(picture);

          await updateAppUserPicture(user.UserID, user.UserName, picture);
        }
      }
    }

    return res.status(200).json({
      UserID: user.UserID,
      FirstName: safeDecryptText(user.FirstName),
      LastName: safeDecryptText(user.LastName),
      UserName: user.UserName,
      Email: safeDecryptText(user.Email),
      IsAdmin: user.IsAdmin,
      MongoDocumentID: user.MongoDocumentID,
      GenderID: user.GenderID,
      CountryID: user.CountryID,
      AccountStateID: user.AccountStateID,
    });
  } catch (error) {
    console.error("Auth0 /me error:", error);

    return res.status(500).json({
      error: "Error syncing user",
    });
  }
});

export default router;
