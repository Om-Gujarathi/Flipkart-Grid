// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LoyaltyToken is ERC20 {
    address public admin; // The admin who can mint tokens
    
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    function mint(address account, uint256 amount) external onlyAdmin {
        _mint(account, amount);
    }
    
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        // Add any additional logic here, e.g., check for user actions before transferring
        return super.transfer(recipient, amount);
    }
}