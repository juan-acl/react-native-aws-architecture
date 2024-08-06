exports.Response = ({ res, code, message, payload = null }) => {
  return res.status(code).json({ code, message, payload });
};
