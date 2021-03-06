// npx hardhat run --network rinkeby scripts/deploy_upgradeable.js
const { ethers, upgrades } = require('hardhat');

async function main () {
    const HybridToken = await ethers.getContractFactory('HybridToken');
    console.log('Deploying HybridToken...');
    const hybridToken = await HybridToken.deploy();
    await hybridToken.deployed();
    console.log('HybridToken deployed to:', hybridToken.address);

    const NftCollection = await ethers.getContractFactory('NftCollection');
    console.log('Deploying NftCollection...');
    const nftCollection = await upgrades.deployProxy(NftCollection, 
        ["ESGI NFT School Project", "ENSP", hybridToken.address], 
        { initializer: 'initialize' }
    );
    await nftCollection.deployed();
    console.log('NftCollection deployed to:', nftCollection.address);
}

main();