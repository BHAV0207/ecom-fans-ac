
const express = require('express');
const router = express.Router();
const Products = require('../models/Product');

router.get('/' , async (req, res) => {
  try{
    const products = await Products.find();

    if(!products){
      return res.status(404).json({msg: 'No products found'});
    }
    res.json({status : 'success', data: products});

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


router.get('/:id' , async(req , res) => {
  try{
    const products = await Products.findById(req.params.id);
    if(!products){
      return res.status(404).json({msg: 'No products found'});
    }
    res.json({status : 'success', data: products});
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
})



module.exports = router;