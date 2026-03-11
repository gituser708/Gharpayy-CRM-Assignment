const express = require("express");

const authRouter = express.Router();
const { login, logout } = require("../controllers/authCtrl");

//! Agent/Admin login
authRouter.post("/login", login);

//! Logout
authRouter.post("/logout", logout);

module.exports = authRouter;
