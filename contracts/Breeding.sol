//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NftCollection.sol";
import "./BreededNft.sol";

contract Breeding {
    NftCollection public immutable nftCollection;
    BreededNft public immutable breededNft;

    constructor(NftCollection _nftCollection, BreededNft _breededNft) {
        nftCollection = _nftCollection;
        breededNft = _breededNft;
    }

    function breed(uint256 token1, uint256 token2) public payable {

        require(nftCollection.ownerOf(token1) == msg.sender, "It's not your NFT");
        require(nftCollection.ownerOf(token2) == msg.sender, "It's not your NFT");
        
        breededNft.mintNft{value: msg.value}(1);

        nftCollection.burnNft(token1);
        nftCollection.burnNft(token2);
        
    }
}