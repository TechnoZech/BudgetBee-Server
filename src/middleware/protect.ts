import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = async (req: any, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader?.startsWith("Bearer ")
			? authHeader.split(" ")[1]
			: null;

		if (!token) {
			console.log("Not authorized, token missing");
			return res.status(401).json({ message: "Not authorized, token missing" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			userId: string;
			iat: number;
			exp: number;
		};

		const user = await User.findById(decoded.userId).select("-__v -password");
		if (!user) {
            console.log('user not found')
			return res
				.status(401)
				.json({ message: "Not authorized, user not found" });
		}

		req.user = user;

		next();
	} catch (err) {
		console.error("Protect middleware error:", err);
		res.status(401).json({ message: "Token invalid" });
	}
};

export default protect;
