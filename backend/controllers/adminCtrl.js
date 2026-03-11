const User = require("../models/User");

//! Admin: Manage Agents
exports.createAgent = async (req, res) => {
  const { name, email, password } = req.body;
  const agent = await User.create({ name, email, password, role: "agent" });
  res.json(agent);
};

exports.getAgents = async (req, res) => {
  const agents = await User.find({ role: "agent" });
  res.json(agents);
};

exports.deleteAgent = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Agent deleted" });
};
