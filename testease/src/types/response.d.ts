export type ApiResponse<T = any> = {
  status: string;
  message: string;
  data?: T;
  error?: string;
};
