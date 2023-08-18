const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { apiKey, contractAddress } = require("../config");

const sdk = new ThirdwebSDK("mumbai", {
  secretKey: apiKey,
});

const contract = await sdk.getContract(contractAddress);

const token = await contract.erc20.get();

console.log(token);

module.exports = contract;
