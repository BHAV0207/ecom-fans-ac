const express = require("express");
const { protect } = require("../middleware/auth");
const { getAllRiders } = require("../controllers/adminRider");
const { authorize } = require("../middleware/auth");
const router = express.Router();



router.get("/riders" , protect, authorize("admin"), getAllRiders);


module.exports = router;