const app = require("./app");
// const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary")

// uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to unhandled Promise rejection`);

  process.exit(1);
});

// config
// dotenv.config({ path: "./config/config.env" });

//connect database
connectDatabase();

//cloudinary condig
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});

//unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to unhandled Promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
