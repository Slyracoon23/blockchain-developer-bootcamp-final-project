# Design Patterns

## Inheritance and Interfaces
- Using OpenZeppelin ERC-721 and Owner contracts as a base for following contract
        - `Cards.sol`

## Access Control Design Patterns
- Using `onlyOwner` to wait to activate critical functions like `mintCard()` using the `setMintAlive()` function f