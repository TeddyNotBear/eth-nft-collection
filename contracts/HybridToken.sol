// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract HybridToken is ERC1155Upgradeable, OwnableUpgradeable, ReentrancyGuardUpgradeable, PausableUpgradeable {

    mapping(address => bool) admins;

    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _nftIdCounter;

    uint256 public constant REWARD_TOKENS = 0;

    function initialize() initializer public {
        __ERC1155_init("");
        __Ownable_init();
        __Pausable_init();
        __ReentrancyGuard_init();
    }

    function mint(address _to, uint256 id, uint _amount, bytes memory data) external onlyOwner {
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