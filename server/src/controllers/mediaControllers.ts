import { Request, Response, NextFunction } from "express";
import cloudinary from "../utils/cloudinary";
import { db } from "../db";
import { media, messages } from "../db/schema";
import { UploadStream } from "cloudinary";

export const uploadMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file || !req.body.name) {
      return res.status(400).json({ error: "Image file or name not provided" });
    }

    const result = (await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "portfolio",
            public_id: `${req.body.name.replace(
              /[^a-zA-Z0-9]/g,
              "-"
            )}-${Date.now()}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(req.file!.buffer);
    })) as any;

    await db.insert(media).values({
      id: result.asset_id,
      type: result.type,
      format: result.format,
      url: result.secure_url,
      name: req.body.name,
      description: req.body.description,
      size: Math.floor(result.size * 100) / 100,
      height: result.height,
      width: result.width,
    });

    return res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};
