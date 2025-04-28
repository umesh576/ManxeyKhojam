import express from "express";
import userRoute from "./routes/user.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;

const DB_URI = process.env.DB_URI || "";
console.log(DB_URI);

import connectDatabase from "./config/database.config";
connectDatabase(DB_URI);

app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
