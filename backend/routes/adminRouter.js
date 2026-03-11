const express = require("express");

const adminRouter = express.Router();
const {
  createAgent,
  getAgents,
  deleteAgent,
} = require("../controllers/adminCtrl");
const { protect, adminOnly } = require("../middleware/authMiddleware");

//! Admin creates agent
adminRouter.post("/agents", protect, adminOnly, createAgent);

//! Admin lists agents
adminRouter.get("/agents", protect, adminOnly, getAgents);

//! Admin deletes agent
adminRouter.delete("/agents/:id", protect, adminOnly, deleteAgent);

module.exports = adminRouter;
