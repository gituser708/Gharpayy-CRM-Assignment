const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Unknown" },
    phone: { type: String, default: "" },
    source: { type: String, default: "Unknown" },
    timestamp: { type: Date, default: Date.now },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: [
        "New Lead",
        "Contacted",
        "Requirement Collected",
        "Property Suggested",
        "Visit Scheduled",
        "Visit Completed",
        "Booked",
        "Lost",
      ],
      default: "New Lead",
    },
    visit: {
      property: String,
      date: Date,
      outcome: String,
    },
    lastActivity: { type: Date, default: Date.now },

    //! Flexible storage for extra fields from any platform
    rawPayload: { type: Object },
  },
  { strict: false },
);

module.exports = mongoose.model("Lead", leadSchema);
