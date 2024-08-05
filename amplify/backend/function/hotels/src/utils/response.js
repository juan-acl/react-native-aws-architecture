exports.Response = ({ res, code, message, payload = null }) => {
  return res.statusCode(code).json({ code, message, payload });
};
