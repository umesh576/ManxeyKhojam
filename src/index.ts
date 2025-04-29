import express from "express";
import userRoute from "./routes/user.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;

// accessing the path os database
const DB_URI = process.env.DB_URI || "";

import connectDatabase from "./config/database.config";
connectDatabase(DB_URI);

app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
