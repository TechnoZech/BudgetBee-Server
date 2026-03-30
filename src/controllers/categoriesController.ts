import Category from "../models/Category";
import { Request, Response } from "express";

export const getCategory = async (req: any, res: Response) => {
	try {
		const { type } = req.query;

		const isCredit = type === "true";

		const categories = await Category.find({
			type: isCredit,
			$or: [
				{ user: null },
				{ user: req.user._id },
			],
		}).sort({ user: 1, name: 1 });

		res.json({ categories });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Failed to fetch categories" });
	}
};

export const addCategories = async (req: any, res: Response) => {
    try {
        const {name, slug, type} = req.body;

        const category = new Category({
            name,
            slug,
            type,
            user: req.user._id
        });

        const existingCategory = await Category.findOne({ name, type, user: req.user._id });

        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const savedCategory = await category.save();
        return res.status(201).json({ message: "Category added successfully", category: savedCategory });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to add category" });
    }
}



