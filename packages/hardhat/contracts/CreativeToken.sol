// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract CreativeToken is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    string private _name;
    string private _symbol;
    uint256 private _decimals;
    uint256 private _initialSupply;


    // ERC20Upgradeable public token;

    function initialize() public initializer {
        _name = "Creative Token";
        _symbol = "CRTV";
        _decimals = 18;
        _initialSupply = 980000000;

        // Set the name and symbol
        __ERC20_init_unchained(_name, _symbol); // Not sure if this is supposed to be called like this to make the token, or if

        // Create the initial supply of 980,000,000 CRTV
        _mint(msg.sender, _initialSupply); // I think _mint also checks to make sure only the owner can call that function

    }

    // The onlyOwner makes it so only the owner of this contract can call this function
    // In the future this should only be callable by a smart ocntract that represents a DAO
    function generateNew(uint256 amountToGenerate) public onlyOwner {
        // don't think this would just call mint since the owner should be able to do that anyways, instead I imagine it would call other functions it needs to when this is happening
        _mint(msg.sender, amountToGenerate);
    }
}