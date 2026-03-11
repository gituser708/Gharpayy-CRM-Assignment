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

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));
app.use(express.json());
app.use(session({
    secret: 'crmsecret',
    resave: false,
    saveUninitialized: false
}));

//! routes
app.use('/api/auth', authRouter);
app.use('/api/leads', leadRouter);
app.use('/api/admin', adminRouter);


const PORT = process.env.PORT || 5000;

Promise.all([connectDB(), createAdmin()]).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
}).catch((error) => {
    console.error(error);
});

