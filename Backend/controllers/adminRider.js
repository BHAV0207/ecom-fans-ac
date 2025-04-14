const User = require("../models/user");


const getAllRiders = async (req, res) => {
  try{
    const riders = await User.find({role: 'rider'})
    if (!riders || riders.length === 0) {
      return res.status(404).json({ message: "No riders found" });
    }

    res.status(200).json({ status: "success", data: riders });

  }catch(error){
    console.error("Error fetching riders:", error.message);
    res.status(500).json({ message: "Error fetching riders", error });
  }
}

const createRider = async (req, res) => {
  try{
    const { name, email, phone } = req.body;

    if(!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRider = new User({
      name,
      email,
      phone,
      role: 'rider'
    });

    await newRider.save();

    res.status(201).json({ status: "success", data: newRider });
  }
  catch(err){
    console.error("Error creating rider:", err.message);
    res.status(500).json({ message: "Error creating rider", error: err });
  }
}

module.exports = {getAllRiders , createRider};