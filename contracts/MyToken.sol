// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";


contract MyToken is Initializable, ContextUpgradeable {
    // constructor (string memory name, string memory symbol) ERC20(name, symbol) {
    //     // Mint 100 tokens to msg.sender
    //     // Similar to how
    //     // 1 dollar = 100 cents
    //     // 1 token = 1 * (10 ** decimals)
    //     _mint(msg.sender, 100 * 10 ** uint(decimals()));
    // }

    ERC20Upgradeable public token;

    string private _name;
    string private _symbol;
    uint8 private _decimals;

    function __ERC20_init(string memory name, string memory symbol) internal initializer {
        __Context_init_unchained();
        __ERC20_init_unchained(name, symbol);
    }

    function __ERC20_init_unchained(string memory name, string memory symbol) internal initializer {
        _name = "MyToken";
        _symbol = "CRTV";
        _decimals = 18;
    }
}