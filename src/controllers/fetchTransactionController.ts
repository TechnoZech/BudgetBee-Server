import { Request, Response } from "express";
import Transaction from "../models/Transaction";

const fetchTransactionController = async (req: any, res: Response) => {
    const userId = req.user._id;
    try {
        const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
        return res.status(200).json(transactions);
    } catch (error: any) {
        return res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
    }
}

export default fetchTransactionController;