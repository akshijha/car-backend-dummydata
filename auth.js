//MjYgjlQHAFc2zAzV
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let users = [];

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, email, password: hashedPassword };
  users.push(user);
  res.status(201).json({ message: 'User registered successfully' });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
  res.status(200).json({ token });
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function protectedRoute(req, res) {
  res.status(200).json({ message: 'Protected route accessed' });
}

module.exports = { registerUser, loginUser, verifyToken, protectedRoute };
