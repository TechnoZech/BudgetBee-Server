import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { startOfMonth, endOfMonth } from "date-fns";

const fetchTransactionController = async (req: any, res: Response) => {
	const userId = req.user._id;
	try {
		const { timezone } = req.query as { timezone: string };
		const now = new Date();

		const userNow = toZonedTime(now, timezone);
		

		const userFirstDay = startOfMonth(userNow); 
		const userLastDay = endOfMonth(userNow);

		const firstDayUtc = fromZonedTime(userFirstDay, timezone);
		const lastDayUtc = fromZonedTime(userLastDay, timezone);

		const transactions = await Transaction.find({
			user: userId,
			date: { $gte: firstDayUtc, $lte: lastDayUtc },
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
