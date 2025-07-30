import { Request, Response, NextFunction } from "express";
import {
  createSettingsSchema,
  updateSettingsSchema,
} from "../schemas/settingsSchema";
import { settings } from "../db/schema";
import { db } from "../db";
import z from "zod";

export const getSettings = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [websiteSettings] = await db.select().from(settings);

    if (!websiteSettings) {
      return res.status(404).json({
        success: false,
        message: "Website settings not found",
      });
    }

    return res.status(200).json(websiteSettings);
  } catch (error) {
    next(error);
  }
};

export const createSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedSettings = createSettingsSchema.parse(req.body);

    const currentSettings = await db.select().from(settings);

    if (currentSettings.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Website settings already exists",
      });
    }

    await db.insert(settings).values(validatedSettings);
    return res.status(201).json({
      success: true,
      message: "Website settings created successfully",
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

export const updateSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedSettings = updateSettingsSchema.parse(req.body);

    const currentSettings = await db.select().from(settings);
    if (currentSettings.length < 1) {
      return res.status(404).json({
        success: false,
        message: "Website settings not found",
      });
    }

    await db.update(settings).set(validatedSettings);
    return res.status(200).json({
      success: true,
      message: "Website settings updated successfully",
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
