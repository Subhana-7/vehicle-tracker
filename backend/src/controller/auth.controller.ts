import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  signup = async (req: Request, res: Response) => {
    await this.authService.signup(req.body);
    res.json({ message: "OTP sent" });
  };

  verifyOtp = async (req: Request, res: Response) => {
    await this.authService.verifyOtp(req.body.email, req.body.otp);
    res.json({ message: "Verified" });
  };

  login = async (req: Request, res: Response) => {
    const tokens = await this.authService.login(
      req.body.email,
      req.body.password,
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

    const data = await this.authService.refresh(token);

    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ message: "Refreshed" });
  };

  resendOtp = async (req: Request, res: Response) => {
    await this.authService.resendOtp(req.body.email);
    res.json({ message: "OTP resent" });
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
