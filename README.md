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
npx hardhat verify --network rinkeby CONTRACT_ADDRESS "TOKEN_NAME" "TOKEN_SYMBOL"
```

## Usage

- Install dependencies:
```bash
yarn install
```

- Generate metadatas:
```bash
python3 scripts/metadata.py
```

- Run script to whitelist users :

You first need to add addresses of users that you want to whitelist inside `scripts/outputs/addresses.json` file. After, run the `signer.js` script in using 
```bash
node scripts/signer.js
```

- Run web app: 
```bash
cd webapp
yarn dev
```


