import { Request, Response } from "express";
import admin from "../config/firebaseAdmin";
import User from "../models/User";
import { generateToken } from "../config/generateToken";

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const decoded = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        photo: decoded.picture
      });
    }

    const jwtToken = generateToken(user.id);
    res.json({
      token: jwtToken,
      user
    });

  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};