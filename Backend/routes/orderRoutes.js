const express = require('express');

const router = express.Router();
const Orders = require('../models/Order');

router.post('/' , async (req, res) => {
  try{
    const order = new Order({
      user: req.user.id,
      products: req.body.products,
      status: 'Pending'
    });
    await order.save();
    res.status(201).json({ status: 'success', data: order });
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


router.patch('/:id' , async(req , res) => {
  try{
    const order = await Orders.findById(req.params.id);
    if(!order){
      return res.status(404).json({msg: 'No order found'});
    }
    order.status = req.body.status;
    await order.save();
    res.json({status : 'success', data: order});
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
}
)


module.exports = router;
