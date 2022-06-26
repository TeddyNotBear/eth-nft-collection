const { ethers, upgrades } = require("hardhat");
const PROXY_ADDRESS = "";

async function main() {
  const NftCollectionV2 = await ethers.getContractFactory("NftCollectionV2");
  console.log("Preparing upgrade...");
  const nftCollectionV2Addr = await upgrades.prepareUpgrade(PROXY_ADDRESS, NftCollectionV2);
  console.log("NftCollectionV2 at:", nftCollectionV2Addr);

  // const Breeding = await ethers.getContractFactory("Breeding");
  // console.log("Preparing to deploy breeding contract...");
  // const breedingContract = await Breeding.deploy(nftCollectionV2Addr);
  // await breedingContract.deployed();
  // console.log(`Breeding contract is deployed to: ${breedingContract.address}`);
}

main();