const express = require("express");
const cookieparser = require("cookie-parser")
const cors = require("cors");
const fileupload = require("express-fileupload")
const dotenv = require("dotenv");
const app = express();

//config
dotenv.config({ path: "./config/config.env" });

const ErrorMiddleware = require("./middlewares/error")
// console.log(process.env.CORS_ORIGIN)

app.use(express.json());    //always remember the parenthesis
app.use(express.urlencoded({extended: true}))
app.use(cookieparser());
app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN}));
app.use(fileupload());

//  Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const collection = require("./routes/collectionRoute")

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", collection);

// Middlewares

// - error middleware
app.use(ErrorMiddleware)

module.exports = app;
