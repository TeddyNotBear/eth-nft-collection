// npx hardhat run --network localhost scripts/deployV2.js

const { ethers, upgrades } = require('hardhat');

async function main () {
    const AdvancedNFTV2 = await ethers.getContractFactory('AdvancedNFTV2');
    console.log('Deploying AdvancedNFTV2...');
    const advancedNFTV2 = await upgrades.deployProxy(AdvancedNFTV2, ['AdvancedNFTV2', 'AdvancedNFTV2'], { initializer: 'initialize' });
    await advancedNFTV2.deployed();
    console.log('AdvancedNFTV2 deployed to:', advancedNFTV2.address);
}

main();