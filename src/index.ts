import express from "express";
import cookieParser from "cookie-parser";
// import os from "os";
// import cluster from "cluster";

import connectDatabase from "./config/database.config";

import userRoute from "./routes/user.routes";
import jobCategory from "./routes/jobCategory.routes";
import passwordForget from "./routes/forgetPassword.routes";
import resetPassword from "./routes/resetPassword.routes";
import postRoute from "./routes/post.routes";
// import appliedPostRoutes from "./routes/appliedPost.routes";
import appliedOnPost from "./routes/appliedOnPost.routes";
import authRoute from "./routes/authUser.route";
import acceptRoute from "./routes/Applicantaccept.routes";
import path from "path";

import dotenv from "dotenv";

import cors from "cors";
const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

// let noOfCpu = os.cpus().length;

// if (cluster.isPrimary) {
//   for (let i = 0; i < noOfCpu; i++) {
//     cluster.fork();
//   }
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });
// } else {
//for accesing the element store in the cookies
app.use(cookieParser());

//
app.use(
  cors({
    // origin: "http://localhost:3001", // your frontend origin
    credentials: true, // 🔑 allow cookies to be sent
  })
);

// accessing the path os database
const DB_URI = process.env.DB_URI || "";

connectDatabase(DB_URI);

app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // This parses JSON request bodies
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", userRoute);
app.use("/api/jobcategory", jobCategory);
app.use("/api/forget", passwordForget);
app.use("/api/password", resetPassword);
app.use("/api/post", postRoute);
// app.use("/api/applied", appliedPostRoutes);
app.use("/api/applypost", appliedOnPost);
app.use("/api/auth", authRoute);
app.use("/useraccpet", acceptRoute);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
// }
