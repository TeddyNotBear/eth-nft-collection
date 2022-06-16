# AdvancedNFT Implementation

## Configuration

- Add a personnal RPC on a `.env` file if you want or by default it uses `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`.
- Add your wallet private key in the `.env` file. !!! NOT IN CLEAR IN THE CODE !!!
- Add your etherscan api key in the `.env`.


## Installation

- Deploy contract on rinkeby testnet: 
```bash
npx hardhat run scripts/deploy.js --network rinkeby
```

- Verify contract code: 
```bash
npx hardhat verify --network rinkeby CONTRACT_ADDRESS
```

## Usage

- Install dependencies
```bash
yarn install
```

- Run web app: 
```bash
cd webapp
yarn dev
```

