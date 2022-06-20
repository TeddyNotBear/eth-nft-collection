// npx hardhat run --network rinkeby scripts/deploy_upgradeable.js
const { ethers, upgrades } = require('hardhat');

async function main () {
    const NftCollection = await ethers.getContractFactory('NftCollection');
    console.log('Deploying NftCollection...');
    const nftCollection = await upgrades.deployProxy(NftCollection, ["ESGI NFT School Project", "ENSP"], { initializer: 'initialize' });
    await nftCollection.deployed();
    console.log('NftCollection deployed to:', nftCollection.address);
}

main();