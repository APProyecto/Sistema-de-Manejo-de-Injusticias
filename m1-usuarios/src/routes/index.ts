import { prisma } from "../lib/prisma";
import { checkJwt } from "../middlewares/auth.middleware";
import { Router } from "express";
import usersRoutes from "../modules/users/users.routes";
import fileRoutes from "../modules/files/files.routes";
import crypto from "crypto";
const router = Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "M1 Usuarios API root",
  });
});

router.use("/users", usersRoutes);

router.use("/files", fileRoutes);

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

    const payload = req.auth?.payload;
    console.log(payload);

    const auth0Id = payload.sub;

    const email = req.headers["x-user-email"] as string;
    const name = req.headers["x-user-name"] as string || "User";

    console.log("EMAIL:", email);
    console.log("NAME:", name);

    let user = await prisma.appUser.findFirst({
      where: {
        Email: email,
      },
    });

    if (!user) {

      console.log("EMAIL:", email);
      console.log("NAME:", name);

      console.log("CREANDO USUARIO");

      user = await prisma.appUser.create({
        data: {

          FirstName: name,
          LastName: "",
          UserName: email.split("@")[0],
          Email: email,

          Password: "",

          RegisteredAt: new Date(),

          IsAdmin: false,

          NumberPublications: 0,

          MongoDocumentID: crypto.randomUUID(),

          CreatedAt: new Date(),

          GenderID: 3,
          CountryID: 40,
          AccountStateID: 1,
        },
      });
    }

    res.json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error syncing user",
    });
  }
});

export default router;