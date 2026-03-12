require('dotenv').config({ quiet: true });
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const leadRouter = require('./routes/leadRouter');
const adminRouter = require('./routes/adminRouter');
const createAdmin = require('./utils/createAdmin');

require('./cron/reminders');

const app = express();

//! ✅ CORS setup: allow React dev server and credentials
app.use(
  cors({
    origin: 'http://localhost:5173', //! frontend origin
    credentials: true, //! allow cookies
  }),
);

app.use(express.json());

app.set("trust proxy", 1);

//! ✅ Session setup: environment-aware cookie flags
const isProd = process.env.NODE_ENV === 'production';

app.use(
  session({
    secret: 'crmsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProd, //! true on Render (HTTPS), false locally
      sameSite: isProd ? 'none' : 'lax',
    },
  }),
);

//! ✅ Routes
app.use('/api/auth', authRouter);
app.use('/api/leads', leadRouter);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 5000;

//! Connect DB and create default admin before starting server
Promise.all([connectDB(), createAdmin()])
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
