//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NftCollection.sol";
import "./BreededNft.sol";
import "./HybridToken.sol";

contract Breeding {
    NftCollection public immutable nftCollection;
    BreededNft public immutable breededNft;
    HybridToken public immutable hybridToken;

    constructor(NftCollection _nftCollection, BreededNft _breededNft, HybridToken _hybridToken) {
        nftCollection = _nftCollection;
        breededNft = _breededNft;
        hybridToken = _hybridToken;
    }

    function breed(uint256 token1, uint256 token2, uint256 hToken) public payable {

        require(nftCollection.ownerOf(token1) == msg.sender, "It's not your NFT");
        require(nftCollection.ownerOf(token2) == msg.sender, "It's not your NFT");

        breededNft.mintNft{value: msg.value}(1);

        nftCollection.burnNft(token1);
        nftCollection.burnNft(token2);
        hybridToken.burn(hToken);
    }
}