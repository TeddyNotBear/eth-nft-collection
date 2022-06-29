// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract HybridToken is ERC1155, Ownable, ReentrancyGuard, Pausable {

    mapping(address => bool) admins;

    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _nftIdCounter;

    uint256 public constant REWARD_TOKENS = 0;

    constructor() public ERC1155("") {}

    function mint(address _to, uint256 id, uint _amount, bytes memory data) external {
        require(admins[msg.sender], "not able to mint");
        _mint(_to, id, _amount, data);
    }

    function _ownerOf(uint256 tokenId) internal view returns (bool) {
        return balanceOf(msg.sender, tokenId) != 0;
    }

    function burn (uint256 tokenId) external {
        require(_ownerOf(tokenId) == true, "It's not your token");
        _burn(msg.sender, tokenId, 1);
    }

    function addAdmin(address _admin) external onlyOwner {
        admins[_admin] = true;
    }

    function removeAdmin(address _admin) external onlyOwner {
        admins[_admin] = false;
    }
}