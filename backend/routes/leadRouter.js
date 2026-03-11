const express = require("express");

const leadRouter = express.Router();
const leadController = require("../controllers/leadCtrl");
const { protect } = require("../middleware/authMiddleware");

//! Capture new lead (auto-assign to agent)
leadRouter.post("/", protect, leadController.createLead);

//! Agent updates pipeline stage
leadRouter.put("/:id/stage", protect, leadController.updateStage);

//! Agent schedules visit
leadRouter.put("/:id/visit", protect, leadController.scheduleVisit);

//! Role-based dashboard (admin sees all, agent sees only theirs)
leadRouter.get("/dashboard", protect, leadController.dashboard);

module.exports = leadRouter;
