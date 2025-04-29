class customError extends Error {
  success: boolean;
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(err: string, statusCode: number) {
    super(err);

    this.name = this.constructor.name;
    this.success = false;
    this.statusCode = statusCode;
    this.status =
      this.statusCode >= 400 && this.statusCode <= 500 ? "fail" : "error";
    this.success = false;
    Error.captureStackTrace(this, customError);
    this.isOperational = true;
  }
}

export default customError;
