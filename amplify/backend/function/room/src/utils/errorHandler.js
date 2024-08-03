exports.ErrorHandlerAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      console.log(`error in errorHandlerAsync ${req.url}: ${error}`);
      next(error);
    });
  };
};
