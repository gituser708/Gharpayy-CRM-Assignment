const User = require('../models/User');

// ✅ Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    req.session.user = { _id: user._id, role: user.role, name: user.name };

    // ✅ Force session save so cookie is sent
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Session save failed' });
      }
      res.json({ message: 'Login successful', user: req.session.user });
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// ✅ Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
};
