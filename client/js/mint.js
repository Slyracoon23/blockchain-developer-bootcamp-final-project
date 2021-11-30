

const mintButton = document.querySelector('#mint-cards-btn');
const backButton = document.querySelector('#customization-tab-btn');
const mintSection = document.querySelector('#mint-cards');
const mintCardBank = document.querySelector("#mint-card-deck");
var mintCards = [];

function createCard(index, num, container_elem, cards){
    let card_data = card_dict[index];
    
    let outer_elem =  document.createElement("div");

    let elem = document.createElement("div");
    elem.style.backgroundImage = largeURL(card_data.deck + "_" + card_data.filename);
    elem.classList.add("card-lg");
    let count = document.createElement("div");

    let button = document.createElement("button");
    button.classList.add("mint-btn");
    button.textContent = "Mint Me"



    elem.appendChild(count);
    outer_elem.appendChild(elem);
    outer_elem.appendChild(button);

    container_elem.appendChild(outer_elem);
    
    let bankID = {index: index, count: num, elem: elem};
    let isBank = cards === this.bank;
    count.innerHTML = bankID.count;
    cards.push(bankID);
    let cardIndex = cards.length-1;
    
    button.addEventListener("click", () => {
        console.log(`Minting index: ${index}, card: ${card_data.name} `);
        MintCard(index).then( result => {

            console.log(`Minted tokenId: ${result}`);
            
            // Reload Viewable Cards
            dm.makeYourDeck(dm.faction);

        });

    }, false);

    return bankID;
}


mintButton.addEventListener('click', () => {
    mintSection.removeAttribute("hidden");

});

backButton.addEventListener('click', () => {
    mintSection.setAttribute("hidden", true);

});

for(let i =0; i<= 213; i++){
    createCard(i, 1, mintCardBank, mintCards);

}


// createCard(2, 1, mintCardBank, mintCards);
// createCard(3, 1, mintCardBank, mintCards);
// createCard(4, 1, mintCardBank, mintCards);
// createCard(5, 1, mintCardBank, mintCards);
// createCard(6, 1, mintCardBank, mintCards);
// createCard(7, 1, mintCardBank, mintCards);
// createCard(8, 1, mintCardBank, mintCards);