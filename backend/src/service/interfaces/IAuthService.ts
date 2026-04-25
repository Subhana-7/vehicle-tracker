import {
  SignupRequestDTO,
  SignupResponseDTO,
  VerifyOtpResponseDTO,
  AuthTokensDTO,
  RefreshTokenResponseDTO,
  ResendOtpResponseDTO,
} from "../../dtos/auth.dto";

export interface IAuthService {
  signup(data: SignupRequestDTO): Promise<SignupResponseDTO>;
  verifyOtp(email: string, otp: string): Promise<VerifyOtpResponseDTO>;
  login(email: string, password: string): Promise<AuthTokensDTO>;
  refresh(token: string): Promise<RefreshTokenResponseDTO>;
  resendOtp(email: string): Promise<ResendOtpResponseDTO>;
}
