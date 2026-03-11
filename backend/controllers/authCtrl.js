const User = require("../models/User");

//! Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    req.session.user = { _id: user._id, role: user.role, name: user.name };
    res.json({ message: "Login successful", user: req.session.user });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

//! Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
};
