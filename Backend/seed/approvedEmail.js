const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ApprovedEmail = require("../models/approvedEmail");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedEmails = async () => {
  const emails = [
    { email: "jainbhav0207@gmail.com", role: "admin" },
    { email: "bhavyawork0207@gmail.com", role: "rider" },
    { email: "bhavyajain4274@gmail.com", role: "user" }
  ];

  try {
    await ApprovedEmail.deleteMany({});
    await ApprovedEmail.insertMany(emails);
    console.log("✅ Approved emails seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedEmails();
