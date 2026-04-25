import {
  SignupResponseDTO,
  VerifyOtpResponseDTO,
  AuthTokensDTO,
  RefreshTokenResponseDTO,
  ResendOtpResponseDTO,
} from "../dtos/auth.dto";

export class AuthMapper {
  static toSignupResponse(): SignupResponseDTO {
    return { message: "Signup successful. Please verify your email." };
  }

  static toVerifyOtpResponse(): VerifyOtpResponseDTO {
    return { message: "Email verified successfully" };
  }

  static toLoginResponse(
    accessToken: string,
    refreshToken: string
  ): AuthTokensDTO {
    return { accessToken, refreshToken };
  }

  static toRefreshResponse(accessToken: string): RefreshTokenResponseDTO {
    return { accessToken };
  }

  static toResendOtpResponse(): ResendOtpResponseDTO {
    return { message: "OTP sent successfully" };
  }
}