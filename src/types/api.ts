export interface ApiResponse<T = any> {
  code: number;
  status: string;
  data: T;
}
