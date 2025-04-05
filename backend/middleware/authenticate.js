const { tokenStore } = require('../controllers/authController');

function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  if (!token || !tokenStore[token]) {
    return res.status(401).json({ message: 'No valid token provided' });
  }
  req.user = tokenStore[token];
  next();
}

module.exports = authenticate;
