import { Router } from "express";
const router = Router();
import * as authController from "./authController.js";
import { zodMiddleware } from "../../middleware/zodMiddleware.js";
import { loginSchema, signupSchema } from "./authSchema.js";

router.post("/login", zodMiddleware(loginSchema), authController.login);
router.post("/signup", zodMiddleware(signupSchema), authController.signup);

export default router;
