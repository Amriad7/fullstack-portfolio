import { Router } from "express";
import {
  deleteMedia,
  getAllMedia,
  getMediabyId,
  uploadMedia,
} from "../controllers/mediaControllers";
import { upload } from "../middleware/uploadFile";

const router = Router();

router.get("/", getAllMedia);
router.get("/:id", getMediabyId);
router.post("/", upload.single("image"), uploadMedia);
router.delete("/:id", deleteMedia);

export default router;
