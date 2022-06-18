// npx hardhat run --network localhost scripts/deployV2.js

const { ethers } = require('hardhat');

async function main () {
    const NftCollection = await ethers.getContractFactory("NftCollection");
    const nftCollection = await NftCollection.deploy("ESGI NFT School Project", "ENSP");
  
    await nftCollection.deployed();
  
    console.log("NftCollection deployed to:", nftCollection.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
    });