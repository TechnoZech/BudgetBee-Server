import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();


const app = express();

const PORT = process.env.PORT;


connectDB();


app.get("/", (req, res) => {
  res.send("BudgetBee API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});