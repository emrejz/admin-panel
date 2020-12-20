const { verify } = require("../helpers/jwt");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token && token !== "null") {
      const user = verify(token);
      req.user = user;
      next();
    } else {
      next({
        message: "Authentication failed, please sign in again!",
        code: 150,
      });
    }
  } catch (error) {
    next({
      message: "Authentication failed, please sign in again!",
      code: 150,
    });
  }
};
