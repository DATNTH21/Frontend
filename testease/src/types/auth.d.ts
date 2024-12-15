import { ApiResponse } from './response';

export type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  isVerified: boolean;
};

export type GetUserResponse = ApiResponse<User>;
export type LoginResponse = ApiResponse<undefined>;
export type RegisterResponse = ApiResponse<undefined>;
export type LogoutResponse = ApiResponse<undefined>;
