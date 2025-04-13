const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrdersById,
  getAllOrders,
  getOrdersOfUser,
  assignRider,
  updateOrderStatusByRider,
} = require("../controllers/order");


// @route   POST /api/orders
// @desc    Create a new order
// @access  Private (Admin only)
router.post("/", protect, authorize("admin"), createOrder);


// @route   GET /api/orders
// @desc    Get all orders
// @access  Private (Admin only)
router.get("/", protect, authorize("admin"), getAllOrders);


// @route   GET /api/orders/:id
// @desc    Get an order by its ID
// @access  Public (can restrict later if needed)
router.get("/:id", getOrdersById);


// @route   GET /api/orders/user/:id
// @desc    Get all orders of a specific user
// @access  Private (User must be logged in)
router.get("/user/:id", protect, getOrdersOfUser);


// @route   PUT /api/orders/assign-rider
// @desc    Assign a rider to an order and update status to 'Shipped'
// @access  Private (Admin only)
router.put("/assign-rider", protect, authorize("admin"), assignRider);


// @route   PATCH /api/orders/update-status
// @desc    Rider updates the status of an assigned order
// @access  Private (Rider only)
router.patch("/update-status", protect, authorize("rider"), updateOrderStatusByRider);

module.exports = router;
