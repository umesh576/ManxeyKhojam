import { Router } from "express";
import {
  delUser,
  findAllUser,
  findOneUser,
  login,
} from "../controller/user.controller";
import { registerUser } from "../controller/user.controller";

const router = Router();

router.post("/login", login);
router.post("/register", registerUser);
router.delete("/delete", delUser);
router.get("/searchById", findOneUser);
router.get("/searchAll", findAllUser);

export default router;
