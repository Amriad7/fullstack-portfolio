import { Request, Response, NextFunction } from "express";
import cloudinary from "../utils/cloudinary";
import { media } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db";

export const getAllMedia = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allMedia = await db.select().from(media);
    return res.status(200).json({
      media: allMedia,
      count: allMedia.length,
    });
  } catch (err) {
    next(err);
  }
};

export const getMediabyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const [mediaById] = await db.select().from(media).where(eq(media.id, id));

    if (!mediaById) {
      return res.status(404).json({
        message: "Media not Found",
      });
    }

    return res.status(200).json({
      media: mediaById,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

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
      publicId: result.public_id,
      format: result.format,
      url: result.secure_url,
      name: req.body.name,
      description: req.body.description,
      size: result.bytes,
      height: result.height,
      width: result.width,
    });

    return res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
    });
  } catch (error) {
    console.log("[Error Posting media]", error);
    next(error);
  }
};

export const deleteMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const [image] = await db.select().from(media).where(eq(media.id, id));
    if (!image) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    const response = await cloudinary.uploader
      .destroy(image.publicId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("res2", response);

    if (!response || response.result !== "ok") {
      throw Error("Could not delete the image");
    }

    await db.delete(media).where(eq(media.id, id));
    return res.status(200).json({
      message: "Media deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
