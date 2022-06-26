const { ethers, upgrades } = require("hardhat");
require('dotenv').config()

const PROXY_ADDRESS = process.env.PROXY_ADDRESS;

async function main() {
  const NftCollectionV2 = await ethers.getContractFactory("NftCollectionV2");
  console.log("Preparing upgrade...");
  const nftCollectionV2Addr = await upgrades.prepareUpgrade(PROXY_ADDRESS, NftCollectionV2);
  console.log("NftCollectionV2 at:", nftCollectionV2Addr);
}

main();
