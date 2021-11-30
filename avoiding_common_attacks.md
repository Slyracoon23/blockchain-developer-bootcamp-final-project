# Security Measures

## Proper Setting of Function Visibility (SWC-100)
- functions in the contracts are properly specified as being `public`, `external`, `internal` and `private`


## Proper Use of `require` (SWC-123)
- function `MintCard()` in `cards.sol` utilizes `require` to limit max supply of Gwent NFTs
