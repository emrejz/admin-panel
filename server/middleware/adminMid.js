//helpers
const { verify } = require("../helpers/jwt");

//constants
const { USER_ADMIN_ROLE } = require("../constants");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token && token !== "null") {
      const user = verify(token);
      if (user.role === USER_ADMIN_ROLE) {
        req.user = user;
        return next();
      }
    } else {
      return next({
        message: "It's not your business!",
        code: 151,
      });
    }
  } catch (error) {
    return next({
      message: "Authentication failed, please sign in again!",
      code: 150,
    });
  }
};
