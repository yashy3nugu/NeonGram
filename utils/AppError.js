class AppError extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.message = message;
  }
}

module.exports = AppError;
