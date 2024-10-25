// middlewares/jwtMiddleware.js
const jwt = require('jsonwebtoken');

// Secret key for signing tokens
const SECRET_KEY = process.env.JWT_KEY;

exports.jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded; // Store decoded info in req.user
    next();
  });
};

// Helper function to generate token
exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};
