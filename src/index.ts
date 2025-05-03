import express from "express";
import userRoute from "./routes/user.routes";
import jobCategory from "./routes/jobCategory.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// accessing the path os database
const DB_URI = process.env.DB_URI || "";

import connectDatabase from "./config/database.config";
connectDatabase(DB_URI);

app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/jobcategory", jobCategory);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
