//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NftCollection.sol";

contract Breeding {
    NftCollection public immutable nftCollection;

    constructor(NftCollection _nftCollection) {
        nftCollection = _nftCollection;
    }

    function breed(uint256 token1, uint256 token2) public payable {

        require(nftCollection.ownerOf(token1) == msg.sender, "It's not your NFT");
        require(nftCollection.ownerOf(token2) == msg.sender, "It's not your NFT");

        nftCollection.airdropNfts{value: msg.value}(msg.sender, 1);

        nftCollection.burnNft(token1);
        nftCollection.burnNft(token2);
        
    }
}