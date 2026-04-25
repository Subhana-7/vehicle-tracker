import express from "express";
import container from "../config/inversify.config";
import { IAuthController } from "../controller/interface/IAuthController";
import { TYPES } from "../types";

const router = express.Router();

const controller = container.get<IAuthController>(TYPES.IAuthController)

router.post("/signup", controller.signup.bind(controller));
router.post("/verify-otp", controller.verifyOtp.bind(controller));
router.post("/login", controller.login.bind(controller));
router.post("/refresh", controller.refresh.bind(controller));
router.post("/resend-otp", controller.resendOtp.bind(controller));
router.post("/logout", controller.logout.bind(controller));

export default router;