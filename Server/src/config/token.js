const jwt = require("jsonwebtoken");

const genToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

module.exports = genToken;
