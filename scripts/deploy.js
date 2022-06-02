const { ethers, upgrades } = require('hardhat');

async function main () {
    const AdvancedNFT = await ethers.getContractFactory('AdvancedNFT');
    console.log('Deploying AdvancedNFT...');
    const advancedNFT = await upgrades.deployProxy(AdvancedNFT, ['AdvancedNFT', 'AdvancedNFT'], { initializer: 'initialize' });
    await advancedNFT.deployed();
    console.log('AdvancedNFT deployed to:', advancedNFT.address);
}

main();