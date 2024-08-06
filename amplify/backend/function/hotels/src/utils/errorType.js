exports.TypeError = {
  ServerError: "ServerError",
  ValidationError: "ValidationError",
};

class ServerError extends Error {
  statusCode;
  constructor({ message, statusCode }) {
    super(message);
    this.name = TypeError.ServerError;
    this.message = message;
    this.statusCode = statusCode || 500;
  }
}

class ValidationError extends Error {
  statusCode;
  constructor({ message, statusCode }) {
    super(message);
    this.name = TypeError.ValidationError;
    this.message = message;
    this.statusCode = statusCode || 400;
  }
}

module.exports = { ServerError, ValidationError };
