const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/CatchAsyncErrors");
const Collection = require("../models/collectionModel");

// Create New Collection : Admin
exports.createCollection = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const collection = await Collection.create(req.body);

    res.status(200).json({
        success: true,
        collection
    })
})

// Get All Collections
exports.getAllCollections = catchAsyncErrors(async (req, res, next) => {
    const collections = await Collection.find();

    res.status(200).json({
        success: true,
        collections
    })
})

//Get All Collection Products
exports.getAllCollectionProducts = catchAsyncErrors(async (req, res, next) => {
    const {name, products} = await Collection.findById(req.params.id).populate("products");

    const count = products.length;

    res.status(200).json({
        success: true,
        count,
        name,
        products
    })
})