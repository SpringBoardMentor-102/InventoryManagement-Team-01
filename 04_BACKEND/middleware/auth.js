const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //taking token from headers
  const authHeader = req.headers.authorization;
  console.log("token is", authHeader);

  // checking if token is null or undefined

  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({
      status: 401,
      message: "UnAuthorized",
    });
  }

  console.log("token is", authHeader);

  //splitting token
  const token = authHeader.split(" ")[1];

  //verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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
