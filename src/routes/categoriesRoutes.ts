import express from "express";
import {addCategories, getCategory} from "../controllers/categoriesController";
import protect from "../middleware/protect";

const router = express.Router();

router.get("/", protect, getCategory);
router.post("/", protect, addCategories);

export default router;