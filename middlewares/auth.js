const catchAsyncErrors = require("./CatchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next)=>{
    const {token} = req.cookies

    if(!token){
        next(new ErrorHandler("Please Login to access this resource", 401));
    } else {
        const DecodedData = jwt.verify(token,process.env.JWT_SECRET);
    
        req.user = await User.findById(DecodedData.id);
    
        next()
    }

})

exports.authorizeRoles = (...roles) => {    //Rest operator
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403,))
        }
        next();
    }

}