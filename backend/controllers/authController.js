const { createUser, findUserByEmail, verifyPassword } = require('../models/users');
const generateToken = require('../utils/tokenGenerator');

// In‑memory store for tokens: { token: { id, role } }
const tokenStore = {};

async function register(req, res) {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await createUser({ username, email, password, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const validPassword = await verifyPassword(user, password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate a simple access token (36-character random string)
    const token = generateToken();
    // Store token with user info in memory
    tokenStore[token] = { id: user.id, role: user.role };
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login, tokenStore };
