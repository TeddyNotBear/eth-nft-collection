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

    constructor() public ERC1155("Test") {}

    function mint(address _to, uint256 id, uint _amount, bytes memory data) external {
        require(admins[msg.sender], "not able to mint");
        _mint(_to, id, _amount, data);
    }

    function addAdmin(address _admin) external onlyOwner {
        admins[_admin] = true;
    }

    function removeAdmin(address _admin) external onlyOwner {
        admins[_admin] = false;
    }
}