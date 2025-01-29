import { Router } from "express";
const router = Router();
import authRoute from "../modules/auth/authRouter.js";
import libraryRoute from "../modules/library/libraryRouter.js";

// Authentication router
router.use("/auth", authRoute);
// Library router
router.use("/library", libraryRoute);

export default router;
