import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
} from "../controllers/messagesControllers";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/", getAllMessages, requireAuth(["admin"]));
router.get("/:id", getMessageById, requireAuth(["admin"]));
router.post("/", createMessage);
router.put("/:id", updateMessage, requireAuth(["admin"]));
router.delete("/:id", deleteMessage, requireAuth(["admin"]));

export default router;
