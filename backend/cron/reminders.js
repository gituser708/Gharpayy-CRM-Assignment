const cron = require("node-cron");
const Lead = require("../models/Lead");
const { sendEmail } = require("../services/mailService");


//! Runs every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  const inactiveLeads = await Lead.find({
    lastActivity: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, //! 7 days inactivity
    status: { $nin: ["Booked", "Lost"] },
  }).populate("assignedAgent");

  inactiveLeads.forEach(async (lead) => {
    const subject = "Promotional Reminder: Rent Service";
    const text = `Hi ${lead.name}, Agent ${lead.assignedAgent.name} recommends you take a look at our Rent Service. Special offers are waiting for you!`;
    await sendEmail(lead.assignedAgent.email, subject, text);
  });
});
