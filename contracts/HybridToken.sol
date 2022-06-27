// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract HybridToken is ERC1155, Ownable, ReentrancyGuard, Pausable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _nftIdCounter;

    uint256 public constant REWARD_TOKENS = 0;

    constructor() public ERC1155("") {
        _mint(msg.sender, REWARD_TOKENS, 10**18, "");
    }

    function _ownerOf(uint256 tokenId) internal view returns (bool) {
        return balanceOf(msg.sender, tokenId) != 0;
    }

    function burn (uint256 tokenId) external {
        require(_ownerOf(tokenId) == true, "It's not your token");
        _burn(msg.sender, tokenId, 1);
    }
}