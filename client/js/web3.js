"use strict";

const ethereumButton = document.querySelector('.enableEthereumButton');

// var Web3 = require("web3");
var abi;
const contractAddress = "0x370B04Abe31cb26A1527902A2e9B15f6DB324F0E"

fetch('json/gwent-abi.json')
  .then(response => response.json())
  .then(data => abi = data.abi)
  .then(() => console.log(abi))
  .catch(error => console.log(error));

// var fs = require('fs');
// var jsonFile = "js/gwent-abi.json";
// var parsed= JSON.parse(fs.readFileSync(jsonFile));
// var abi = parsed.abi;

// functions
const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
};




 const GetTokenId = async () => {
    console.log(`Getting totoal TokenIDs}`);

    const contract = new web3.eth.Contract(abi, contractAddress);
    const tokenId_number = await contract.methods._tokenIds().call();

    return tokenId_number;

}


const GetBalanceOfWalletAdress = async (walletAddress) => {
  console.log(`Getting TokenIDs of ${walletAddress}`);

  const contract = new web3.eth.Contract(abi, contractAddress);
  const balance = await contract.methods.balanceOf(walletAddress).call();

  return balance;

}

const GetTokenOfOwnerByIndex = async (walletAddress, i) => {
  console.log(`Getting TokenIDs Index of ${walletAddress} of position ${i}`);

  const contract = new web3.eth.Contract(abi, contractAddress);
  const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress,i).call();

  return tokenId;

}

const GetTokenDetails = async (tokenId) => {
  console.log(`Getting Gwent Card of tokenId : ${tokenId}`);

  const contract = new web3.eth.Contract(abi, contractAddress);
  const gwent_card = await contract.methods.getDetails(tokenId).call();

  return gwent_card;

}

async function GetGwentCards() {

  console.log('before start');
  var result  = await ethEnabled();
  console.log( result );
  var account = await web3.eth.getAccounts();
  var tokenId = await GetTokenId(account[0]);
  console.log(tokenId);

  var balance = await GetBalanceOfWalletAdress(account[0]);
  var tokens = [];
  var gwent_cards = [];

  for (let i = 0; i < balance; i++) {
    tokens.push(await GetTokenOfOwnerByIndex(account[0], i));
  } 

  for(let i = 0; i < tokens.length; i++){
    gwent_cards.push(await GetTokenDetails(tokens[i]));
}

  console.log(gwent_cards);

  return gwent_cards;
}

async function MintCard(index) {
  var result  = await ethEnabled();
  console.log( result );
  var account = await web3.eth.getAccounts();
  const wallet_address = account[0];
  const contract = new web3.eth.Contract(abi, contractAddress);

  const tokenId = await contract.methods.mintCard(wallet_address, index.toString()).send({from: wallet_address}, function(error, transactionHash){
    console.log(transactionHash);
});
  console.log(tokenId);
  
  return tokenId;
}

// Call start


ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  window.ethereum.request({ method: 'eth_requestAccounts'});

  // console.log(accounts)
  // Add if statement if not correct network

  // change to Ropsten
  window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x3'}], // chainId must be in hexadecimal numbers, Chain ID 1337
  });

  


  });


(async() => {


})();



// console.log( result );

// var account = await web3.eth.getAccounts()[0];
// var tokenId = await GetTokenId(account);
// console.log(tokenId);
