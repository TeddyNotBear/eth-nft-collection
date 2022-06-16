// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import 'erc721a-upgradeable/contracts/ERC721AUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// Ownable, Reentrancy, PaymentSplitter
contract AdvancedNFTV2 is ERC721AUpgradeable, ReentrancyGuardUpgradeable, OwnableUpgradeable {
    using ECDSA for bytes32;
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _nftIdCounter;

    // events 

    enum Steps { NotStarted, WhitelistedSale, PublicSale, SoldOut, Reveal }
    Steps public sellingStep;

    address private _ownerAddress;

    uint256 public MAX_SUPPLY_NFT;
    uint256 public publicSaleNftPrice;
    uint256 public whitelistSaleNftPrice;
    uint256 public maxNftPurchase;

    string private baseURI;
    string private notRevealedURI;
    string private baseExtension;

    bool public paused;
    bool public revealed;
    bool public stacking;

    mapping(address => uint256) public nftsPerWallet;

    function initialize(string memory _name, string memory _symbol) initializerERC721A initializer public {
        __ERC721A_init(_name, _symbol);
        __Ownable_init();

        MAX_SUPPLY_NFT = 50000;
        publicSaleNftPrice = 25000000000000000;
        whitelistSaleNftPrice = 20000000000000000;
        maxNftPurchase = 3;
        _ownerAddress = msg.sender;
        sellingStep = Steps.NotStarted;

        paused = false;
        revealed = false;
        stacking = false;
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
        
        for(uint256 i = 1 ; i <= _ammount ; i++) {
            _safeMint(msg.sender, numberNftSold + i);
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

        require(_ownerAddress == keccak256(
            abi.encodePacked(
                address(this),
                msg.sender
            )
        ).toEthSignedMessageHash().recover(signature), "Signer address mismatch.");

        for(uint256 i = 1 ; i <= _ammount ; i++) {
            _safeMint(msg.sender, numberNftSold + i);
            nftsPerWallet[msg.sender]++;
        }
    }

    function airdropNfts(address _recipient,uint256 _mintAmount) public payable {
        require(!paused, "The contract is paused");
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "Need to mint at least 1 NFT");
        require(supply + _mintAmount <= MAX_SUPPLY_NFT, "Max NFT limit");
        for (uint256 i = 1; i <= _mintAmount; i++) {
            nftsPerWallet[_recipient]++;
            _safeMint(_recipient, supply + i);
        }
    }

    function changePublicSaleNftPrice(uint256 _publicSaleNftPrice) external {
        publicSaleNftPrice = _publicSaleNftPrice;
    }

    function changeWhitelisteSaleNftPrice(uint256 _whitelistSaleNftPrice) external {
        whitelistSaleNftPrice = _whitelistSaleNftPrice;
    }

    function setBaseURI(string memory _newBaseURI) external {
        baseURI = _newBaseURI;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public {
        notRevealedURI = _notRevealedURI;
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

    function launchPublicSale() external {
        sellingStep = Steps.PublicSale;
    }

    function launchWhitelistedSale() external {
        sellingStep = Steps.WhitelistedSale;
    }

    function reveal() external {
        sellingStep = Steps.Reveal;
        revealed = true;
    }

    function pause(bool _state) public {
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