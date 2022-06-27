# AdvancedNFT Implementation

## Configuration

- Add a personnal RPC on a `.env` file if you want or by default it uses `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`.
- Add your wallet private key in the `.env` file. !!! NOT IN CLEAR IN THE CODE !!!
- Add your etherscan api key in the `.env`.


## Installation

- Deploy contract on rinkeby testnet: 
```bash
npx hardhat run --network rinkeby scripts/deploy_upgradeable.js
```
Pay attention to enter the returned address in the `.env` file in PROXY_ADDRESS key.

- Deploy transfer ownership on rinkeby testnet: 
```bash
npx hardhat run --network rinkeby scripts/transfer_ownership.js
```

- Verify contract code: 
```bash
npx hardhat verify --network rinkeby CONTRACT_ADDRESS
```

- Upgrade the contract with stake function:
```bash
npx hardhat run --network rinkeby scripts/deploy_upgradeable_staking.js
```

How to test the contract versions : 

```bash
npx hardhat console --network rinkeby
const NftCollection = await ethers.getContractFactory("NftCollection")
const nftCollection = await NftCollection.attach(PROXY_ADDRESS)
await nftCollection.launchPublicSale()
await nftCollection.publicMintNft(1, {value: ethers.utils.parseEther("0.025") })
(await nftCollection.balanceOf(PUBLIC_KEY)).toString()

const NftCollectionV2 = await ethers.getContractFactory("NftCollectionV2")
const nftCollectionV2 = await NftCollectionV2.attach(PROXY_ADDRESS)
(await nftCollectionV2.balanceOf(PUBLIC_KEY)).toString()
```
- Replace "PROXY_ADDRESS" by the proxy address that you previously entered in your `.env`.
- Replace "PUBLIC_KEY" by the product key that is associated with the private key you previously entered in your `.env`.

source : https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-hardhat/3580

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