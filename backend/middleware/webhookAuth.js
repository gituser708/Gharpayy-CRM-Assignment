const webhookAuth = (req, res, next) => {
  const token = req.headers['authorization'];
  //! Hardcoded key for testing/demo
  const FORM_API_KEY = 'supersecretformkey123';

  if (!token || token !== `Bearer ${FORM_API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized webhook' });
  }
  next();
};

module.exports = webhookAuth;
