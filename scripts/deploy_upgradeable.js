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

    // REMOVE BREEDING WHEN FULLY TESTED
    const BreededNft = await ethers.getContractFactory("BreededNft");
    console.log("Deploying BreededNft...");
    const breededNft = await upgrades.deployProxy(BreededNft, 
        ["Mutant ESGI NFT School Project", "MENSP", nftCollection.address, hybridToken.address],
        { initializer: 'initialize' }
    );
    await breededNft.deployed();

    console.log(`BreededNft deployed to: ${breededNft.address}`);
    // const Breeding = await ethers.getContractFactory("Breeding");
    // console.log("Preparing to deploy breeding contract...");
    // const breedingContract = await Breeding.deploy(nftCollection.address, breededNft.address, hybridToken.address);
    // await breedingContract.deployed();
    // console.log(`Breeding contract is deployed to: ${breedingContract.address}`);
}

main();