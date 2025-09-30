const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret-key";

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" },
];

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({ token });
};

exports.ping = (req, res) => {
  res.json({
    message: "JWT is valid",
    user: req.user,
  });
};

exports.JWT_SECRET = JWT_SECRET;
