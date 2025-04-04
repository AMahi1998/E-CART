const Product= require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
//Get Products - /api/v1/products
exports.getProducts=async (req,res,next)=>{
    const  products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products
    });
}

// Create Product - /api/v1/products/new
exports.newProduct = catchAsyncError(async(req, res, next)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })

});

//Get Single Product- /api/v1/product/:id
exports.getSingleProduct = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 400));
    }
    res.status(201).json({
        success: true,
        product
    })
}

//Update Product - /api/v1/product/:id
exports.updateProduct = async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success: false,
            message:"Product not found"
        });
    }
    product= await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        product
    })
}

//Delete Product - /api/v1/product/:id
exports.deleteProduct= async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message:"Product not found"
        });
    }
    await Product.findByIdAndDelete(req.params.id);//updated line as remove() is deprecated in Mongoose>v6

    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })
}