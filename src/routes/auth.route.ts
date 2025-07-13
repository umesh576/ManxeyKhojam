// import { Router } from "express";
// import { verifyJWtToken } from "../middleware/verifyAccessToken.middleware";

// const server = Router();

// server.get("/check-login", verifyJWtToken, (req, res) => {
//   res.status(200).json({ user: req.user });
// });

// export default server;
import { Router } from "express";
import { Request, Response } from "express";
import { Authenticate } from "../middleware/authentication.middleware";
import { jobSeeker } from "../@types/role.jobseeker";
// import { jobSeeker } from "../@types/role.jobseeker";

const router = Router();

// Add this new route
router.get("/check", Authenticate(jobSeeker), (req: Request, res: Response) => {
  res.status(200).json({
    authenticated: true,
    message: "auth check successfully",
    user: req.user,
  });
});

export default router;
