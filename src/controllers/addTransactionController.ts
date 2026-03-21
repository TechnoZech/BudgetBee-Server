import { Request, Response } from "express";
import Transaction from "../models/Transaction";

const addTransactionController = async (req: any, res: Response) => {
    const userId = req.user._id;
    const {isCredit, title, category, amount, date} = req.body;
    const transaction = new Transaction({
        user: userId,
        type: isCredit,
        title,
        category,
        amount,
        date
    });

    try {
        await transaction.save();
        return res.status(201).json({ message: "Transaction added successfully" });
    } catch (error: any) {
        return res.status(500).json({ message: "Failed to add Transaction", error: error.message });
    }
}

export default addTransactionController;