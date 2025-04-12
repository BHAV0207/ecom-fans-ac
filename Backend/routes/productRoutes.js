const express = require('express'); 
const router = express.Router();
const Product = require('../models/product');
const { createProduct, getAll, getById, updateProduct, deleteProduct } = require('../controllers/product');
const {protect} = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/authMiddleware');


router.post('/' , protect, authorize('admin') , createProduct);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', protect, authorize('admin'), updateProduct);



module.exports = router;