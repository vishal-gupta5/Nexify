const express = require("express");
require("dotenv").config({ quiet: true });
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.router");
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The app is successfully running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
