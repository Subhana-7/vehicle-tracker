export interface IAuthService {
  signup(data: any): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<void>;
  login(email: string, password: string): Promise<any>;
  refresh(token: string): Promise<any>;
  resendOtp(email: string): Promise<void>;
}