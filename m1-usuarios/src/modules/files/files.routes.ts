import { Router } from "express";

import multer from "multer";
import {
    getInjusticeTypePicture,
    syncInjusticeTypesToMongo,
    uploadInjusticeTypePicture,
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

router.get(
    "/injustice-types/:injusticeTypeId/picture",
    getInjusticeTypePicture
);

export default router;
