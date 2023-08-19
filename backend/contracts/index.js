const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { apiKey, contractAddress } = require("../config");

const sdk = new ThirdwebSDK("mumbai", {
  secretKey: apiKey,
});

const tokenDetails = async function getTokenDetails() {
  
}

module.exports = tokenDetails;
