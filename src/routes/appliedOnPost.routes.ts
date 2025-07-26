import { Router } from "express";
import {
  applyOnpost,
  deleteApplyOnPost,
} from "../controller/applyOnpost.controller";
import { Authenticate } from "../middleware/authentication.middleware";
import { admin, jobSeeker } from "../@types/role.jobseeker";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, fileName);
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
server.delete(
  "/delapplyPost/:applyOnpostId",
  Authenticate(admin),
  deleteApplyOnPost
);
export default server;
