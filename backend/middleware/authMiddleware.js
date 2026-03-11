const protect = (req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") next();
  else res.status(403).json({ error: "Admin access required" });
};

module.exports = { protect, adminOnly };
