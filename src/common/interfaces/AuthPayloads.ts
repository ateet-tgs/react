export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenData {
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPassword {
  email: string;
  role: string;
}
