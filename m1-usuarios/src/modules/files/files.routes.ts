import { Router } from "express";

import multer from "multer";
import {
    getInjusticeTypePicture,
    getUserAppPicture,
    syncInjusticeTypesToMongo,
    uploadInjusticeTypePicture,
    uploadUserAppPicture,
    uploadEntityPicture,
    syncEntitiesToMongo,
    getEntityPicture,
    getEntityPictureByBoycottId
} from "./files.controller"

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post(
    "/injustice-types/sync",
    syncInjusticeTypesToMongo
);

router.post(
    "/entities/sync",
    syncEntitiesToMongo
);


router.put("/injustice-types/:injusticeTypeId/picture",
    upload.single("file"),
    uploadInjusticeTypePicture
);

router.put("/entities/:entityId/picture",
    upload.single("file"),
    uploadEntityPicture
);

router.put("/appUser/:appUserId/picture",
    upload.single("file"),
    uploadUserAppPicture
)

router.get(
    "/injustice-types/:injusticeTypeId/picture",
    getInjusticeTypePicture
);

router.get(
    "/entities/:entityId/picture",
    getEntityPicture
);

router.get(
    "/entityBoycott/:boycottId/picture",
    getEntityPictureByBoycottId
);

router.get(
    "/appUser/:appUserId/picture",
    getUserAppPicture
);



export default router;
