export class ApiResponse<T> {
  message: string;
  status: number;
  data: T;

  constructor(message: string, status: number, data: T) {
    this.message = message;
    this.status = status;
    this.data = data;
  }

  static success<T>(
    data: T,
    message = "Success",
    status = 200,
  ): ApiResponse<T> {
    return new ApiResponse(message, status, data);
  }

  static error<T>(
    message = "Error",
    status = 400,
    data: T = null,
  ): ApiResponse<T> {
    return new ApiResponse(message, status, data);
  }
}
