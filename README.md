# AdvancedNFT Implementation

## Configuration

Add a personnal RPC on a `.env` file if you want or by default it uses https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161.

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

- Run web app: 
```bash
cd webapp
yarn dev
```

