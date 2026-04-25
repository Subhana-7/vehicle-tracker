import { Request, Response } from "express";
import { IAuthController } from "./interface/IAuthController";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { IAuthService } from "../service/interfaces/IAuthService";

import {
  signupSchema,
  verifyOtpSchema,
  loginSchema,
  resendOtpSchema,
} from "../validations/auth.validation";

import { validate } from "../utils/validation.util";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(TYPES.IAuthService)
    private _authService: IAuthService
  ) {}

  signup = async (req: Request, res: Response) => {
    const data = validate(signupSchema, req.body);

    const result = await this._authService.signup(data);
    res.json(result);
  };

  verifyOtp = async (req: Request, res: Response) => {
    const data = validate(verifyOtpSchema, req.body);

    const result = await this._authService.verifyOtp(
      data.email,
      data.otp
    );

    res.json(result);
  };

  login = async (req: Request, res: Response) => {
    const data = validate(loginSchema, req.body);

    const tokens = await this._authService.login(
      data.email,
      data.password
    );

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ message: "Login success" });
  };

  refresh = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) throw new Error("Refresh token missing");

    const data = await this._authService.refresh(token);

    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json(data);
  };

  resendOtp = async (req: Request, res: Response) => {
    const data = validate(resendOtpSchema, req.body);

    const result = await this._authService.resendOtp(data.email);

    res.json(result);
  };

  logout = async (_req: Request, res: Response) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ message: "Logged out" });
  };
}