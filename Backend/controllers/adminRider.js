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

module.exports = {getAllRiders}