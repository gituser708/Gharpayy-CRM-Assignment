const Lead = require("../models/Lead");
const User = require("../models/User");
const {
  assignAgentRoundRobin,
  assignAgentWorkload,
} = require("../utils/assignAgent");

//! Capture Lead (auto-assign, works for forms + webhooks)
exports.createLead = async (req, res) => {
  try {
    const strategy = req.body.strategy || "roundrobin";
    let agentId;

    if (strategy === "workload") {
      agentId = await assignAgentWorkload(User);
    } else {
      agentId = await assignAgentRoundRobin(User);
    }

    const lead = await Lead.create({
      name: req.body.name || "Unknown",
      phone: req.body.phone || "",
      source: req.body.source || "Unknown",
      timestamp: req.body.timestamp || Date.now(),
      status: "New Lead",
      lastActivity: Date.now(),
      visit: req.body.visit || {},
      rawPayload: req.body, //! keep full payload for flexibility
      assignedAgent: agentId,
    });

    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! Agent: Update Pipeline Stage
exports.updateStage = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, assignedAgent: req.user._id },
      { status: req.body.status, lastActivity: Date.now() },
      { new: true },
    );
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! Agent: Schedule Visit
exports.scheduleVisit = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, assignedAgent: req.user._id },
      {
        visit: req.body,
        status: "Visit Scheduled",
        lastActivity: Date.now(),
      },
      { new: true },
    );
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! Role-based Dashboard
exports.dashboard = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "agent") {
      query.assignedAgent = req.user._id;
    }

    const leads = await Lead.find(query).populate("assignedAgent", "name role");

    const totalLeads = leads.length;

    const pipelineCounts = await Lead.aggregate([
      { $match: query },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const visits = await Lead.countDocuments({
      ...query,
      status: "Visit Scheduled",
    });
    const bookings = await Lead.countDocuments({
      ...query,
      status: "Booked",
    });

    res.json({
      role: req.user.role,
      totalLeads,
      pipelineCounts,
      visits,
      bookings,
      leads,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
