const Products = require("../models/product");

const createProduct = async (req, res) => {
  const { name, description, price, colors, sizes, inventory } = req.body;

  try {
    const newProduct = new Products({
      name,
      description,
      price,
      colors,
      sizes,
      inventory,
    });

    await newProduct.save();
    res.status(201).json({ status: "success", data: newProduct });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getAll = async (req, res) => {
  try {
    const products = await Products.find();

    if (!products) {
      return res.status(404).json({ msg: "No products found" });
    }
    res.json({ status: "success", data: products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getById = async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    if (!products) {
      return res.status(404).json({ msg: "No products found" });
    }
    res.json({ status: "success", data: products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "No products found" });
    }

    const { name, description, price, colors, sizes, inventory } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.colors = colors || product.colors;
    product.sizes = sizes || product.sizes;
    product.inventory = inventory || product.inventory;
    await product.save();
    res.json({ status: "success", data: product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
};