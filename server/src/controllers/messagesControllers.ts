import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { messages } from "../db/schema";
import { eq } from "drizzle-orm";
import { messagesSchema } from "../schemas/messagesSchema";
import z from "zod";

export const getAllMessages = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allMessages = await db.select().from(messages);
    return res.status(200).json({
      messages: allMessages,
      count: allMessages.length,
    });
  } catch (err) {
    next(err);
  }
};

export const getMessageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const [message] = await db
      .select()
      .from(messages)
      .where(eq(messages.id, id));

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    return res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = messagesSchema.parse(req.body);
    await db.insert(messages).values(message);

    return res.status(200).json({
      success: true,
      message: "Message was sent successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }
    next(error);
  }
};

export const updateMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    const [message] = await db
      .select()
      .from(messages)
      .where(eq(messages.id, id));

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    await db
      .update(messages)
      .set({ isRead: Boolean(isRead) })
      .where(eq(messages.id, id));
    return res.status(200).json({ message: "Message updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const [message] = await db
      .select()
      .from(messages)
      .where(eq(messages.id, id));

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    await db.delete(messages).where(eq(messages.id, id));
    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    next(err);
  }
};
