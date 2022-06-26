//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NftCollectionV2.sol";

contract Breeding {
    NftCollectionV2 public immutable nftCollectionV2;

    constructor(NftCollectionV2 _nftCollectionV2) {
        nftCollectionV2 = _nftCollectionV2;
    }

    function breed(uint256 token1, uint256 token2) external {

        require(nftCollectionV2.ownerOf(token1) == msg.sender, "It's not your NFT");
        require(nftCollectionV2.ownerOf(token2) == msg.sender, "It's not your NFT");

        nftCollectionV2.airdropNfts(msg.sender, 1);

        nftCollectionV2.burnNft(token1);
        nftCollectionV2.burnNft(token2);
    }
}