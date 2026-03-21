import express from "express";
import addTransactionController from "../controllers/addTransactionController";
import fetchTransactionController from "../controllers/fetchTransactionController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, addTransactionController);
router.get("/", protect, fetchTransactionController);

export default router;