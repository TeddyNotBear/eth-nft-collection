// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import 'erc721a-upgradeable/contracts/ERC721AUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import "./HybridToken.sol";
import "./NftCollection.sol";

// Ownable
contract BreededNft is ERC721AUpgradeable, OwnableUpgradeable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _nftIdCounter;

    string private baseURI;
    string private baseExtension;

    bool public canChangeBaseURI;
    bool public canChangeNotRevealURI;

    NftCollection public nftCollection;
    HybridToken public hybridToken;

    function initialize(string memory _name, string memory _symbol, NftCollection _nftCollection, HybridToken _hybridToken) initializerERC721A initializer public {
        __ERC721A_init(_name, _symbol);
        __Ownable_init();
        canChangeBaseURI = true;
        canChangeNotRevealURI = true;
        nftCollection = _nftCollection;
        hybridToken = _hybridToken;
    }

    function _baseURI() internal view  virtual override returns (string memory) {
        return baseURI;
    }

    function mintNft(uint256 _ammount) internal {
        _safeMint(msg.sender, _ammount);
    }

    function burnNft(uint256 _tokenId) external {
        _burn(_tokenId);
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        require(canChangeBaseURI == true, "You can change the uri only once");
        baseURI = _newBaseURI;
        canChangeBaseURI = false;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(),".json"))
            : "";
    }

    function breed(uint256 token1, uint256 token2, uint256 hToken) public payable {

        require(nftCollection.ownerOf(token1) == msg.sender, "It's not your NFT");
        require(nftCollection.ownerOf(token2) == msg.sender, "It's not your NFT");
        require(hybridToken.balanceOf(msg.sender, hToken) > 0, "You need at least 1 ERC 1155 token");

        mintNft(1);

        hybridToken.burn(hToken);
        nftCollection.burnNft(token1);
        nftCollection.burnNft(token2);
    }
}