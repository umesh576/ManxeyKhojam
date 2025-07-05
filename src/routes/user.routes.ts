import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  delUser,
  findAllUser,
  findOneUser,
  login,
  updateUser,
} from "../controller/user.controller";
import { registerUser } from "../controller/user.controller";
import express from "express";
import { Authenticate } from "../middleware/authentication.middleware";
import { admin } from "../@types/role.jobseeker";

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to save the file
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png)"));
  }
};

const upload = multer({ storage, fileFilter });

const router = Router();

router.post("/login", login);
router.post("/register", upload.single("profile"), registerUser);
router.delete("/delete", Authenticate(admin), delUser);
router.get("/searchById", Authenticate(admin), findOneUser);
router.get("/searchAll", Authenticate(admin), findAllUser);
router.put("/update", updateUser);

export default router;
