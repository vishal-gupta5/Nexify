const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const app = express();
dotenv.config({});
const PORT = process.env.PORT || 6000;

app.use(express.json());

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection is established!");
      console.log(`The app is successfully running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database can't be connected!`);
  });
