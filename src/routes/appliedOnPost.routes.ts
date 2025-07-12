import { Router } from "express";
import { applyOnpost } from "../controller/applyOnpost.controller";
import { Authenticate } from "../middleware/authentication.middleware";
import { jobSeeker } from "../@types/role.jobseeker";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
const uploadMiddleware = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "coverLetter", maxCount: 1 },
]);

const server = Router();

server.post("/apply", Authenticate(jobSeeker), uploadMiddleware, applyOnpost);
export default server;
