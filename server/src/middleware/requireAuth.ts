import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../utils/auth";

type RolesType = string[] | undefined | null;

export const requireAuth = (roles: RolesType = undefined) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!data?.session) {
        return res.status(401).json({
          error: "Authentication required",
          message: "You are not authenticated please signin",
        });
      }

      if (roles && !roles.includes(data.user.role)) {
        return res.status(403).json({
          error: "Authorization required",
          message: "You are not authorized to access this resource",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
