class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
      this.userFriendly = true;
    }
  }
  
  module.exports = AppError;
  