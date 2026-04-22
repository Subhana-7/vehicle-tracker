import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const verifyAccessToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    );

    req.user = { id: decoded.id };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};