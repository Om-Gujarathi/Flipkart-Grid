const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mongoUrl: process.env.MONGO_URL,
  apiKey: process.env.API_KEY,
  contractAddress: process.env.CONTRACT_ADDRESS,
};
