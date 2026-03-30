import { Request, Response } from "express";
import Transaction from "../models/Transaction";

const fetchTransactionController = async (req: any, res: Response) => {
	const userId = req.user._id;
	try {
		const currentDate = new Date();
		const firstDayOfMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			1,
		);
		const lastDayOfMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			0,
		);
		const transactions = await Transaction.find({
			user: userId,
			date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
		})
			.populate("category", "name")
			.sort({ date: -1 });
            
		const formattedTransactions = transactions.map((tx) => ({
			...tx.toObject(),
			category: (tx as any).category?.name || null, 
		}));
		return res.status(200).json(formattedTransactions);
	} catch (error: any) {
		return res
			.status(500)
			.json({ message: "Failed to fetch transactions", error: error.message });
	}
};

export default fetchTransactionController;
