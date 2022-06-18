// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// Ownable, Reentrancy, PaymentSplitter
contract NftCollection is ERC721A, ReentrancyGuard, Ownable {
    using ECDSA for bytes32;
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _nftIdCounter;

    // events 

    enum Steps { NotStarted, WhitelistedSale, PublicSale, SoldOut, Reveal }
    Steps public sellingStep;

    uint256 public MAX_SUPPLY_NFT = 50000;
    uint256 public publicSaleNftPrice = 25000000000000000;
    uint256 public whitelistSaleNftPrice = 20000000000000000;
    uint256 public maxNftPurchase = 3;

    string private baseURI;
    string private notRevealedURI;
    string private baseExtension;

    bool public paused = false;
    bool public revealed = false;
    bool public stacking = false;
    bool public canChangeBaseURI = true;
    bool public canChangeNotRevealURI = true;

    mapping(address => uint256) public nftsPerWallet;

    constructor(string memory _name, string memory _symbol) ERC721A(_name, _symbol) Ownable() {
        sellingStep = Steps.NotStarted;
    }

    function _baseURI() internal view  virtual override returns (string memory) {
        return baseURI;
    }

    function publicMintNft(uint256 _ammount) external payable nonReentrant {
        uint256 numberNftSold = totalSupply();

        require(totalSupply() < MAX_SUPPLY_NFT, "Sorry, no nfts left.");
        require(sellingStep == Steps.PublicSale, "Sale has not started yet.");
        require(nftsPerWallet[msg.sender] <= maxNftPurchase, "You can't mint more than X nfts");
        require(numberNftSold + _ammount <= MAX_SUPPLY_NFT, "Sale is almost done and we don't have enought NFTs left.");
        require(msg.value >= publicSaleNftPrice * _ammount, "You don't have enough funds.");

        if(numberNftSold + _ammount == MAX_SUPPLY_NFT) {
            sellingStep = Steps.SoldOut;
        }

        _safeMint(msg.sender, _ammount);
        
        for(uint256 i = 1 ; i <= _ammount ; i++) {
            nftsPerWallet[msg.sender]++;
        }
    }

    function whitelistMintNft(uint256 _ammount, bytes calldata signature) public payable {
        uint256 numberNftSold = totalSupply();

        require(totalSupply() < MAX_SUPPLY_NFT, "Sorry, no nfts left.");
        require(sellingStep == Steps.WhitelistedSale, "WhitelistedSale has not started yet.");
        require(nftsPerWallet[msg.sender] <= maxNftPurchase, "You can't mint more than X nfts");
        require(numberNftSold + _ammount <= MAX_SUPPLY_NFT, "Sale is almost done and we don't have enought NFTs left.");
        require(msg.value >= whitelistSaleNftPrice * _ammount, "You don't have enough funds.");

        require(owner() == keccak256(
            abi.encodePacked(
                address(this),
                msg.sender
            )
        ).toEthSignedMessageHash().recover(signature), "Signer address mismatch.");

        _safeMint(msg.sender, _ammount);

        for(uint256 i = 1 ; i <= _ammount ; i++) {
            nftsPerWallet[msg.sender]++;
        }
    }

    function airdropNfts(address _recipient,uint256 _mintAmount) public payable onlyOwner {
        require(!paused, "The contract is paused");
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "Need to mint at least 1 NFT");
        require(supply + _mintAmount <= MAX_SUPPLY_NFT, "Max NFT limit");
        _safeMint(_recipient, _mintAmount);
        for (uint256 i = 1; i <= _mintAmount; i++) {
            nftsPerWallet[_recipient]++;
        }
    }

    function burnNft(uint256 _tokenId) external {
        _burn(_tokenId);
    }

    function changePublicSaleNftPrice(uint256 _publicSaleNftPrice) external onlyOwner {
        publicSaleNftPrice = _publicSaleNftPrice;
    }

    function changeWhitelisteSaleNftPrice(uint256 _whitelistSaleNftPrice) external onlyOwner {
        whitelistSaleNftPrice = _whitelistSaleNftPrice;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        require(canChangeBaseURI == true, "You can change the uri only once");
        baseURI = _newBaseURI;
        canChangeBaseURI = false;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        require(canChangeNotRevealURI == true, "You can change the uri only once");
        notRevealedURI = _notRevealedURI;
        canChangeNotRevealURI = false;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        if(revealed == false) {
            return bytes(notRevealedURI).length > 0
            ? string(abi.encodePacked(notRevealedURI, tokenId.toString(),".json"))
            : "";
        }

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(),".json"))
            : "";
    }

    function launchPublicSale() external onlyOwner {
        sellingStep = Steps.PublicSale;
    }

    function launchWhitelistedSale() external onlyOwner {
        sellingStep = Steps.WhitelistedSale;
    }

    function reveal() external onlyOwner {
        sellingStep = Steps.Reveal;
        revealed = true;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function isRevealed() public view returns (bool){
        return revealed;
    }

    function isPause() public view returns (bool){
        return paused;
    }

    function getPublicSaleNftPrice() public view returns (uint256) {
        return publicSaleNftPrice;
    }

    function getWhitelistSaleNftPrice() public view returns (uint256) {
        return whitelistSaleNftPrice;
    }

    function getInitialTotalSupply() public view returns (uint256) {
        return MAX_SUPPLY_NFT;
    }

    function getSignerRecovery(bytes calldata signature) external view returns (address) {
        return keccak256(
            abi.encodePacked(
                address(this),
                msg.sender
            )
        ).toEthSignedMessageHash().recover(signature);
    }

    // fulfillRandomness() --> avoid specific nft giveway

    // reserveNfts()
        // get totalSupply()
        // _safeMint(msg.sender, supply + i) loop

    // burnNft()

    // isStakingLive() --> check if stacking is already available

    // staking()

    // add fallback

}