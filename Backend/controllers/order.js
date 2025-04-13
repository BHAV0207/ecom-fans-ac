const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  const { products, address } = req.body;
  try {
    const order = new Order({ user: req.user._id, products, address });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("assignedRider", "name email")
      .populate("products.product", "name price");

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

exports.getOrdersOfUser = async (req, res) => {
  try {
    const order = await Order.findById({ user: req.user.id }).populate(
      "products.product"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

exports.getOrdersById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("assignedRider", "name email")
      .populate("products.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

exports.assignRider = async (req, res) => {
  const { orderId, riderId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Shipped";
    order.assignedRider = riderId;
    await order.save();

    res.status(200).json({ status: "success", data: order });
  } catch (err) {
    console.error("Assign Rider Error:", err.message);
    res
      .status(500)
      .json({ status: "error", message: "Failed to assign rider" });
  }
};

exports.updateOrderStatusByRider = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findOne({
      _id: orderId,
      assignedRider: req.user._id,
    });
    if (!order)
      return res
        .status(404)
        .json({ message: "Order not found or not assigned to you" });

    order.status = status;
    await order.save();

    res.status(200).json({ status: "success", data: order });
  } catch (err) {
    console.error("Update Order Status Error:", err.message);
    res
      .status(500)
      .json({ status: "error", message: "Failed to update order status" });
  }
};
