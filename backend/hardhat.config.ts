import "@nomiclabs/hardhat-waffle";

const ALCHEMY_API_KEY = "";
const RINKEBY_PRIVATE_KEY = ""

module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    }
  }
};