const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/CatchAsyncErrors");
const Features = require("../utils/Features");
const cloudinary = require('cloudinary');

//Create Product : Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  let images = [];

  // if(req.files !== null) {
  //   if(Array.isArray(req.files.images)){
  //     images = req.files.images;
  //   } else {
  //     images.push(req.files.images);
  //   }
  // }

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    // console.log(`${i}th image: `, images[i]);
    let result;
    try {
      result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "/xetra/products"
      });
    } catch(err) {
      console.log(err);
    }

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  console.log(req.body);

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

  const resultsPerPage = 7;
  const productCount = await Product.countDocuments();

  // OLD CODE : IN CASE BREAKS => UNCOMMENT
  // const apiFeatures = new Features(Product.find(), req.query).search().filter().pagination(resultsPerPage);
  // const product = await apiFeatures.query;
  // const resultsInQuery = product.length
  
  const apiFeatures = new Features(Product.find().sort({createdAt: -1}), req.query).search().filter();
  let product = await apiFeatures.query.clone();
  const resultsInQuery = product.length
  apiFeatures.pagination(resultsPerPage);
  product = await apiFeatures.query;

  res.status(200).json({
    success: true,
    product,
    productCount,
    resultsInQuery
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    //console.log("Not found")
    //return res.status(500).json({
    //  success: false,
    //  message: "Product Not Found"
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product : Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id); // await is important here or this never fails

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product: Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Create and Update Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const {rating, comment} = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating,
    comment
  }

  const product = await Product.findById(req.params.id);

  const isReviewed = product.reviews.find(rev=>req.user._id.toString()===rev.user.toString());

  if(isReviewed){
    product.reviews.forEach(rev=>{
      if(req.user._id.toString()===rev.user.toString()){
        rev.rating = rating
        rev.comment = comment
      }
    })
  } else {
    product.reviews.push(review);
    product.numOfReviews++;
  }

  product.ratings = product.reviews.reduce((a,rev)=>a+=rev.rating,0)/product.numOfReviews;

  await product.save({validateBeforeSave: false});

  res.status(200).json({
    success: true,
  })
})

// Get All Product Reviews
exports.getAllReviews = catchAsyncErrors(async (req, res, next)=>{
  const product = await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHandler("Product Not Found", 400));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

//Delete Product Review
exports.DeleteReviews = catchAsyncErrors(async (req, res, next)=>{
  const product = await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHandler("Product Not Found", 400));
  }

  console.log(product)

  const reviews = product.reviews.filter(rev=>rev._id.toString()!== req.query.id.toString());
  const numOfReviews = reviews.length;
  const ratings = numOfReviews === 0 ? 0:reviews.reduce((a,rev)=>a+=rev.rating,0)/numOfReviews;

  console.log(reviews,numOfReviews,ratings)

  await Product.findByIdAndUpdate(req.params.id, {
    reviews,
    numOfReviews,
    ratings
  },{new: true, runValidators: true, useFindAndModify: false})


  res.status(200).json({
    success: true,
  })
})
