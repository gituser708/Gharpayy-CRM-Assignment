let currentIndex = 0;

const assignAgentRoundRobin = async (User) => {
  const agents = await User.find({ role: "agent" });
  if (!agents.length) throw new Error("No agents available");
  const agent = agents[currentIndex];
  currentIndex = (currentIndex + 1) % agents.length;
  return agent._id;
};

const assignAgentWorkload = async (User) => {
  const agent = await User.findOne({ role: "agent" }).sort("workload");
  if (!agent) throw new Error("No agents available");
  agent.workload += 1;
  await agent.save();
  return agent._id;
};

module.exports = { assignAgentRoundRobin, assignAgentWorkload };
