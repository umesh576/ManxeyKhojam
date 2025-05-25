import express from "express";
import cookieParser from "cookie-parser";

import connectDatabase from "./config/database.config";

import userRoute from "./routes/user.routes";
import jobCategory from "./routes/jobCategory.routes";
import passwordForget from "./routes/forgetPassword.routes";
import resetPassword from "./routes/resetPassword.routes";
import postRoute from "./routes/post.routes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//for accesing the element store in the cookies
app.use(cookieParser());

// accessing the path os database
const DB_URI = process.env.DB_URI || "";

connectDatabase(DB_URI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // This parses JSON request bodies

app.use("/api/user", userRoute);
app.use("/api/jobcategory", jobCategory);
app.use("/api/forget", passwordForget);
app.use("/api/password", resetPassword);
app.use("/api/post", postRoute);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
