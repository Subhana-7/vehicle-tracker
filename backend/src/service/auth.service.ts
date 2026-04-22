import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { generateOtp, otpExpiry } from "../utilis/otp.utils";
import { hashPassword, comparePassword } from "../utilis/bcrypt.util";
import { generateAccessToken, generateRefreshToken } from "../utilis/jwt.util";
import { sendOtpEmail } from "./resend.service";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private userRepo: IUserRepository) {}

  async signup(data: any) {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new Error("User already exists");

    const hashed = await hashPassword(data.password);
    const otp = generateOtp();

    await this.userRepo.create({
      ...data,
      password: hashed,
      otp: { code: otp, expiresAt: otpExpiry() },
      isVerified: false,
    });

    await sendOtpEmail(data.email, otp);
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !user.otp) throw new Error("Invalid request");

    if (user.otp.code !== otp) throw new Error("Invalid OTP");
    if (user.otp.expiresAt < new Date()) throw new Error("OTP expired");

    await this.userRepo.updateByEmail(email, {
      isVerified: true,
      otp: undefined,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");

    if (!user.isVerified) throw new Error("Verify email first");

    const isMatch = await comparePassword(password, user.password!);
    if (!isMatch) throw new Error("Invalid credentials");

    const payload = { id: user._id };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await this.userRepo.updateByEmail(email, {
      refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async refresh(token: string) {
    const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

    const user = await this.userRepo.findByEmail(decoded.id);
    if (!user || user.refreshToken !== token)
      throw new Error("Invalid refresh token");

    const accessToken = generateAccessToken({ id: user._id });

    return { accessToken };
  }

  async resendOtp(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const otp = generateOtp();

    await this.userRepo.updateByEmail(email, {
      otp: { code: otp, expiresAt: otpExpiry() },
    });

    await sendOtpEmail(email, otp);
  }
}
