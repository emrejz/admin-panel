const { verify } = require("../helpers/jwt");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token && token !== "null") {
      const user = verify(token);
      req.user = user;
      return next();
    } else {
      return next({
        message: "Authentication failed, please sign in again!",
        code: 150,
      });
    }
  } catch (error) {
    return next({
      message: "Authentication failed, please sign in again!",
      code: 150,
    });
  }
};
