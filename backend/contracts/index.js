const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { privateKey, apiKey, contractAddress } = require("../config");
const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "mumbai", {
  secretKey: apiKey,
});

let contract;

async function setup() {
  contract = await sdk.getContract(contractAddress);
}

setup();

async function getBalance(address) {
  const balance = await contract.erc20.balanceOf(address);
  return balance;
}

async function addBalance(address, amount) {
  await contract.erc20.mintTo(address, amount);
}

module.exports.getBalance = getBalance;
module.exports.addBalance = addBalance;
