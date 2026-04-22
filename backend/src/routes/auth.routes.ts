import express from "express";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { UserRepository } from "../repository/user.repository";

const router = express.Router();

const repo = new UserRepository();
const service = new AuthService(repo);
const controller = new AuthController(service);

router.post("/signup", controller.signup);
router.post("/verify-otp", controller.verifyOtp);
router.post("/login", controller.login);
router.post("/refresh", controller.refresh);
router.post("/resend-otp", controller.resendOtp);
router.post("/logout", controller.logout);

export default router;