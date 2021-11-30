pragma solidity ^0.6.0;

// import "@openzeppelin/contracts@5.11.0/token/ERC20/ERC20Full.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0-beta.0/contracts/token/ERC721/ERC721Full.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0-beta.0/contracts/ownership/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0-beta.0/contracts/drafts/Strings.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0-beta.0/contracts/drafts/Counters.sol";

/**
 * @title Gwent Game
 * @notice The core ERC721 contract that holds all cards.
 * @author Earl Potters
 */
contract Card is ERC721Full, Ownable {

    // List of avaialbe cards
     mapping(uint256 => uint16) gwentCards;

    uint256 internal constant MAX_LENGTH = uint(2**256 - 1);

    Counters.Counter public _tokenIds;
  
    struct Gwent_Card {
        // name of card
        string name;
        // id of card
        uint8 id;
        // deck type
        string deck;
        // row the card occupies
        string row;
        // Card strength
        uint8 strength;
        // Card ability
        string ability;
    }

    // may change uint16[] uint16
    event CardMinted(
        uint256 indexed tokenId,
        address to,
        uint16 gwentCard
    );

    constructor(string memory baseURI )
        ERC721Full("Gwent: The Witcher", "GWT")
        public
    {

        string memory uri = string(abi.encodePacked(
            baseURI,
            "/"
        ));
        super._setBaseURI(uri);

    }
    
     function setBaseURI(string memory baseURI) public onlyOwner {
        _setBaseURI(baseURI);
    }

    /**
     * @dev Mint a single card
     *
     * @param _to The owner to receive the asset
     * @param _card The card to mint
     */
    function mintCard(
        address _to,
        uint16 _card
    )
        external
        returns (uint tokenId)
    {
        require(
            _to != address(0),
            "Cards: must not be null"
        );
        _tokenIds.increment();

        uint256 newtokenId = _tokenIds.current();
        super._mint(_to, newtokenId);
        gwentCards[newtokenId] = _card;
        
        super._setTokenURI(newtokenId, Strings.fromUint256(_card));


        emit CardMinted(newtokenId, _to, _card);

        return newtokenId;
    }
    

    function getDetails(
        uint256 tokenId
    )
        public
        view
        returns (uint16 gwentCard)
    {
        return gwentCards[tokenId];
    }

  
}