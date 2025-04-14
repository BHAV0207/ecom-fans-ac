const express = require("express");
const { protect } = require("../middleware/auth");
const { getAllRiders, createRider } = require("../controllers/adminRider");
const { authorize } = require("../middleware/auth");
const router = express.Router();



router.get("/riders" , protect, authorize("admin"), getAllRiders);

router.post("/rider-create", protect, authorize("admin"), createRider);


module.exports = router;