const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //taking token from headers
  const authHeader = req.headers.token;

  // checking if token is null or undefined

  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({
      status: 401,
      message: "UnAuthorized",
    });
  }

  console.log("token is", authHeader);

  //verify token
  jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "UnAuthorized",
      });
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = authMiddleware;
