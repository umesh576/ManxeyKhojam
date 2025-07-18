// export default server;
import { Router } from "express";
import { Request, Response } from "express";
import { Authenticate } from "../middleware/authentication.middleware";
// import { jobSeeker } from "../@types/role.jobseeker";
import { admin, jobSeeker } from "../@types/role.jobseeker";

const router = Router();

// route for check the user authenciate
router.get("/check", Authenticate(jobSeeker), (req: Request, res: Response) => {
  res.status(200).json({
    authenticated: true,
    message: "auth check successfully",
    user: req.user,
  });
});

// route for check the admin authenciate

router.get(
  "/checkAdmin",
  Authenticate(admin),
  (req: Request, res: Response) => {
    res.status(200).json({
      authenticated: true,
      message: "auth check successfully",
      user: req.user,
    });
  }
);

export default router;
