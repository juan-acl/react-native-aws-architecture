class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServerError";
    this.message = message;
  }
}

module.exports = { ServerError };
