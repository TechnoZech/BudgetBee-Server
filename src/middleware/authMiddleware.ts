import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = await User.findById(decoded.userId).select("-__v");

    next();
  } catch {
    res.status(401).json({ message: "Token invalid" });
  }
};