// SPDX-License-Identifier: GPL-3.0
    
pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol"; 

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import "remix_accounts.sol";
import "../contracts/cards.sol";


// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract testSuite {
    using Counters for Counters.Counter;

    Card cardToTest;
    /// 'beforeAll' runs before all other tests
    /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    function beforeAll() public {
        // <instantiate contract>
        cardToTest = new Card("");

    }



     function checkTokenId() public {
        uint256 number = cardToTest._tokenIds();
        Assert.equal(number, uint(0), "Current tokenId should be zero");
    }

    function checkMint() public {
        // Use 'Assert' methods: https://remix-ide.readthedocs.io/en/latest/assert_library.html
         uint256 tokenId = cardToTest._tokenIds();
         cardToTest.setMintAlive(true);
         uint256 new_tokenId = cardToTest.mintCard(address(0x1), uint16(1));
         Assert.equal(new_tokenId, tokenId + 1, "After successful mint tokenId increases by 1");
    }

    function checkGetDetails() public {
        cardToTest.setMintAlive(true);
        uint256 new_tokenId = cardToTest.mintCard(address(0x1), uint16(5));
        uint16 value = cardToTest.getDetails(new_tokenId);

        Assert.equal(uint(value), uint(5), "After successful mint value of NFT is 5");

    }

   function chectMintWithoutAlive() public {
         uint256 tokenId = cardToTest._tokenIds();
         try cardToTest.mintCard(address(0x0), uint16(1)) returns (uint new_tokenId) {
            Assert.equal(new_tokenId, tokenId + 1 , "Wrong output");
        } catch Error(string memory /*reason*/) {
            // This is executed in case
            // revert was called inside getData
            // and a reason string was provided.
            Assert.ok(true, "failed with reason");
        } catch (bytes memory /*lowLevelData*/) {
            // This is executed in case revert() was used
            // or there was a failing assertion, division
            // by zero, etc. inside getData.
            Assert.ok(false, "failed unexpected");
        }
    }

    function chectMintToZeroAddress() public {
         uint256 tokenId = cardToTest._tokenIds();
         cardToTest.setMintAlive(true);

         try cardToTest.mintCard(address(0x0), uint16(1)) returns (uint new_tokenId) {
            Assert.equal(new_tokenId, tokenId + 1 , "Wrong output");
        } catch Error(string memory /*reason*/) {
            // This is executed in case
            // revert was called inside getData
            // and a reason string was provided.
            Assert.ok(true, "failed with reason");
        } catch (bytes memory /*lowLevelData*/) {
            // This is executed in case revert() was used
            // or there was a failing assertion, division
            // by zero, etc. inside getData.
            Assert.ok(false, "failed unexpected");
        }
    }

    /// Custom Transaction Context: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    function chectMintOutOfBounds() public {
         uint256 tokenId = cardToTest._tokenIds();
         cardToTest.setMintAlive(true);
         try cardToTest.mintCard(address(0x0), uint16(214)) returns (uint new_tokenId) {
            Assert.equal(new_tokenId, tokenId + 1 , "Wrong output");
        } catch Error(string memory /*reason*/) {
            // This is executed in case
            // revert was called inside getData
            // and a reason string was provided.
            Assert.ok(true, "failed with reason");
        } catch (bytes memory /*lowLevelData*/) {
            // This is executed in case revert() was used
            // or there was a failing assertion, division
            // by zero, etc. inside getData.
            Assert.ok(false, "failed unexpected");
        }
    }
}
