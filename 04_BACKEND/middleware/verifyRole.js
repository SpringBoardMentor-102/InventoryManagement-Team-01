const verifyRole = (allowedRoles) => (req, res, next) => {
  // Assuming user data is accessible in req.user (from authentication)
  const user = req.user;
  if (!user || !allowedRoles.includes(user.role)) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  next(); // Allow request to proceed if authorized
};

module.exports = { roles, verifyRole };

