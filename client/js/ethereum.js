"use strict";

const ethereumButton = document.querySelector('.enableEthereumButton');

if (typeof window.ethereum == 'undefined') {
  console.log('MetaMask is not installed!');
}
else {
  console.log('MetaMask is installed!');

}


const Web3 = require("web3");
const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
}



window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      console.log(web3);
      try {
          // Request account access if needed
          await ethereum.enable();
          // Acccounts now exposed
          // web3.eth.sendTransaction({/* ... */});
      } catch (error) {
          // User denied account access...
      }
  }

});




// function getNFTs(walletAddress){
//     var balance = ERC721.methods.balanceOf(walletAddress).call();
//     var objects = [];
//     var tokens = [];
    
//     var GwentSmartContractAdress = "0x370B04Abe31cb26A1527902A2e9B15f6DB324F0E";
//     for (var i = 0; i < balance; i++) {
//         params = {
//           from: walletAddress,
//           to: GwentSmartContractAdress,
//           value: '0x29a2241af62c0000',
//           gasPrice: '0x09184e72a000',
//           gas: '0x2710',
//         };



//         tokens.push(await ERC721.methods.tokenOfOwnerByIndex(walletAddress, i).call());
//     }
    
//     for(i = 0; i < tokens.length; i++){
//         objects.push(await ERC721.methods.tokenURI(tokenIdList[i]).call());
//     }

//     console.log(tokens);
//     console.log(objects);
//   };


ethereum.on('accountsChanged', (accounts) => {
  // Handle the new accounts, or lack thereof.
  // "accounts" will always be an array, but it can be empty.

  let account =  accounts[0];


  console.log(account);

  // window.ethereum.request({
  //   method: 'eth_sendTransaction',
  //   params: [{ chainId: '0x539'}], // chainId must be in hexadecimal numbers, Chain ID 1337
  // });


  // get NFTs from account

  // const contractAddress = "0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb";
  // const userAddress = "0xCa3646EC2Ad647c67D7979B0710c71ce96653070";
  // const apiKey = "HTTF2CUEPS54E9S687ZWFUNTNVBJHDUINC"

  // let url = `https://api.ftmscan.com/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&address=${userAddress}&apikey=${apiKey}`;
  
  // console.log(url);

  // if( userAddress !== 'undefined'){

  // fetch(url)
  // .then( response  => response.json())
  // .then(data =>{
  //   console.log(data);
  // });

// }

  // window.location.reload();
  
});

/**
 * Main entry point.
 */
let accounts;
 ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  window.ethereum.request({ method: 'eth_requestAccounts'});

  // console.log(accounts)
  // Add if statement if not correct network

  // Not working on local
  window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x539'}], // chainId must be in hexadecimal numbers, Chain ID 1337
  });

  
  // Check fantom Rarity Token IDS
 
  // fetch(RESOURCE_URL)
  //   .then(response => response.json())
  //   .then(data => console.log(data))


  });