export interface SignupRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponseDTO {
  message: string;
}

export interface VerifyOtpRequestDTO {
  email: string;
  otp: string;
}

export interface VerifyOtpResponseDTO {
  message: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface AuthTokensDTO {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponseDTO {
  accessToken: string;
}

export interface ResendOtpResponseDTO {
  message: string;
}