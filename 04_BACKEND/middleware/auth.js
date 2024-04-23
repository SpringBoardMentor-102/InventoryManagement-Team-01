const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // Get token from header
  const token = req.header("Authorization").split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = verifyToken;