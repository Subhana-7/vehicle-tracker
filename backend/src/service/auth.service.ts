import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { generateOtp, otpExpiry } from "../utils/otp.utils";
import { hashPassword, comparePassword } from "../utils/bcrypt.util";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";
import jwt from "jsonwebtoken";
import { IAuthService } from "./interfaces/IAuthService";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IEmailService } from "./interfaces/IEmailService";
import {
  SignupRequestDTO,
  SignupResponseDTO,
  VerifyOtpResponseDTO,
  AuthTokensDTO,
  RefreshTokenResponseDTO,
  ResendOtpResponseDTO,
} from "../dtos/auth.dto";
import { AuthMapper } from "../mapper/auth.mapper";
import { AppError } from "../utils/AppError";
import { AUTH_MESSAGES } from "../constants/error-messages";
import { STATUS_CODES } from "../constants/status-codes";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.IUserRepository) private _userRepo: IUserRepository,
    @inject(TYPES.IEmailService) private _emailService: IEmailService,
  ) {}

  async signup(data: SignupRequestDTO): Promise<SignupResponseDTO> {
    const existing = await this._userRepo.findByEmail(data.email);

    if (existing && existing.isVerified) {
      throw new AppError(AUTH_MESSAGES.USER_EXISTS,STATUS_CODES.CONFLICT);
    }

    if (existing && !existing.isVerified) {
      throw new AppError(AUTH_MESSAGES.USER_NOT_VERIFIED_EXISTS,STATUS_CODES.CONFLICT);
    }

    const hashed = await hashPassword(data.password);
    const otp = generateOtp();

    await this._userRepo.create({
      ...data,
      password: hashed,
      otp: { code: otp, expiresAt: otpExpiry() },
      isVerified: false,
    });

    await this._emailService.sendOtpEmail(data.email, otp);

    return AuthMapper.toSignupResponse();
  }

  async verifyOtp(email: string, otp: string): Promise<VerifyOtpResponseDTO> {
    const user = await this._userRepo.findByEmail(email);

    if (!user) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,STATUS_CODES.NOT_FOUND);

    if (user.isVerified) {
      throw new AppError(AUTH_MESSAGES.USER_ALREADY_VERIFIED,STATUS_CODES.BAD_REQUEST);
    }

    if (!user.otp) {
      throw new AppError(AUTH_MESSAGES.OTP_NOT_FOUND,STATUS_CODES.BAD_REQUEST);
    }

    if (user.otp.expiresAt < new Date()) {
      throw new AppError(AUTH_MESSAGES.OTP_EXPIRED,STATUS_CODES.BAD_REQUEST);
    }

    if (user.otp.code !== otp) {
      throw new AppError(AUTH_MESSAGES.INVALID_OTP,STATUS_CODES.BAD_REQUEST);
    }

    await this._userRepo.updateByEmail(email, {
      isVerified: true,
      otp: undefined,
    });

    return AuthMapper.toVerifyOtpResponse();
  }

  async login(email: string, password: string): Promise<AuthTokensDTO> {
    const user = await this._userRepo.findByEmail(email);

    if (!user) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,STATUS_CODES.NOT_FOUND);

    if (!user.password) {
      throw new AppError(AUTH_MESSAGES.INVALID_LOGIN_METHOD,STATUS_CODES.BAD_REQUEST);
    }

    if (!user.isVerified) {
      throw new AppError(AUTH_MESSAGES.NOT_VERIFIED,STATUS_CODES.FORBIDDEN);
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new AppError(AUTH_MESSAGES.INVALID_CREDENTIALS,STATUS_CODES.UNAUTHORIZED);
    }

    const payload = { id: user._id };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await this._userRepo.updateByEmail(email, { refreshToken });

    return AuthMapper.toLoginResponse(accessToken, refreshToken);
  }

  async refresh(token: string): Promise<RefreshTokenResponseDTO> {
    if (!token) {
      throw new AppError(AUTH_MESSAGES.REFRESH_TOKEN_MISSING,STATUS_CODES.UNAUTHORIZED);
    }

    let decoded: any;

    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch {
      throw new AppError(AUTH_MESSAGES.INVALID_REFRESH_TOKEN,STATUS_CODES.UNAUTHORIZED);
    }

    const user = await this._userRepo.findById(decoded.id);

    if (!user) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,STATUS_CODES.NOT_FOUND);

    if (!user.refreshToken || user.refreshToken !== token) {
      throw new AppError(AUTH_MESSAGES.OTP_RATE_LIMIT,STATUS_CODES.UNAUTHORIZED);
    }

    const accessToken = generateAccessToken({ id: user._id });

    return AuthMapper.toRefreshResponse(accessToken);
  }

  async resendOtp(email: string): Promise<ResendOtpResponseDTO> {
    const user = await this._userRepo.findByEmail(email);

    console.log(user?.otp?.expiresAt)

    if (!user) throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND,STATUS_CODES.NOT_FOUND);

    if (user.isVerified) {
      throw new AppError(AUTH_MESSAGES.USER_ALREADY_VERIFIED,STATUS_CODES.BAD_REQUEST);
    }

    const otp = generateOtp();

    await this._userRepo.updateByEmail(email, {
      otp: { code: otp, expiresAt: otpExpiry() },
    });

    await this._emailService.sendOtpEmail(email, otp);

    return AuthMapper.toResendOtpResponse();
  }
}
