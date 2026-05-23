import { Router } from "express";

import multer from "multer";
import {
    getInjusticeTypePicture,
    syncInjusticeTypesToMongo,
    uploadInjusticeTypePicture,
    uploadUserAppPicture,
} from "./files.controller"

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post(
    "/injustice-types/sync",
    syncInjusticeTypesToMongo
);

router.put("/injustice-types/:injusticeTypeId/picture",
    upload.single("file"),
    uploadInjusticeTypePicture
);

router.put("/appUser/:appUserId/picture",
    upload.single("file"),
    uploadUserAppPicture
)

router.get(
    "/injustice-types/:injusticeTypeId/picture",
    getInjusticeTypePicture
);

export default router;
