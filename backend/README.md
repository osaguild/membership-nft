# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# tips for development

## set up command

- `npm init --yes`
- `npm install --save-dev hardhat`
- `npx hardhat`
- `npm i --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai`
- `npm i @openzeppelin/contracts`
- `npm install --save-dev ts-node typescript`
- `npm install --save-dev chai @types/node @types/mocha @types/chai`
- `mv hardhat.config.js hardhat.config.ts`
- `cat tsconfig.json`

## compile -> test -> deploy(to local)
- `npx hardhat compile`
- `npx hardhat test`
- `npx hardhat node`
- `npx hardhat run scripts/deploy.ts --network localhost`
- `npx hardhat run scripts/deploy.ts --network rinkeby`