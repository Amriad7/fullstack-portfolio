import { Router } from "express";
import {
  createSettings,
  getSettings,
  updateSettings,
} from "../controllers/settingsControllers";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/", getSettings);
router.post("/", requireAuth(["admin"]), createSettings);
router.put("/", requireAuth(["admin"]), updateSettings);

export default router;
