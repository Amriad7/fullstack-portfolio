import { Router } from "express";
import { uploadMedia } from "../controllers/mediaControllers";
import { upload } from "../middleware/uploadFile";

const router = Router();

router.post("/", upload.single("image"), uploadMedia);

export default router;
