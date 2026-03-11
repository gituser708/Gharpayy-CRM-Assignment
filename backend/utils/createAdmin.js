const User = require("../models/User");

const createAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (!existingAdmin) {
    await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: "admin123", //! will be hashed by pre-save hook
      role: "admin",
    });
    console.log("Default admin created: admin@example.com / admin123");
  }
};

module.exports = createAdmin;
