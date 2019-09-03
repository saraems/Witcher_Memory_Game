console.log('Hellow fucking world !');


const avalibleCards = ['lte', 'cxw', 'eyn', 'srs', 'kqi', 'cyh', 'ijs', 'ycr'];

let turnBlocked = false;
let cards = [];

let revealdCards = [];
let revealLocked = false;

let score = 0;
let turns = 0;

function renderCards(cards) {
    const cardsContainer = document.getElementById('cards-container');
    for (let i = 0; i < cards.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        // card.classList.add(cards[i]);
        card.classList.add('revers');
        card.id = i;
        cardsContainer.appendChild(card);
        card.addEventListener('click', revealCard)
    };
};



function randomizeCardsPosition(avalibleCards) {
    for (let i = 0; i < (avalibleCards.length * 2); i++) {

        let newValue = avalibleCards[Math.floor(Math.random() * avalibleCards.length)];

        if (cards.indexOf(newValue) === cards.lastIndexOf(newValue)) {
            cards.push(newValue);
        } else {i--}
    }

    console.log(cards)
    return cards;
};


function revealCard() {
    const clickedCardIndex = this.id ;
    console.log(this.id, cards[clickedCardIndex])
    console.log(revealdCards)

    
    if (revealdCards.length < 2 && !turnBlocked) {
        revealdCards.push(this);

        this.classList.toggle(cards[clickedCardIndex])
        this.classList.toggle('revers');
        console.log('covered cards', revealdCards)

        if (revealdCards.length === 2) {

            turnBlocked = true;
            const isPair = revealdCards[0].classList.value == revealdCards[1].classList.value;
            console.log('isPair', isPair, revealdCards[0].classList, '===', revealdCards[1].classList)

            turns++;

            setTimeout(function() {

                if (isPair) {
    
                    revealdCards[0].classList.toggle(cards[revealdCards[0].id])
                    revealdCards[0].classList.toggle('paired')
    
                    revealdCards[1].classList.toggle(cards[revealdCards[1].id])
                    revealdCards[1].classList.toggle('paired')
    
                    score++
                    updateScore();
                    console.log('IS A PAIR!', score)
                } else {
                    revealdCards[0].classList.toggle(cards[revealdCards[0].id])
                    revealdCards[0].classList.add('revers')
    
                    revealdCards[1].classList.toggle(cards[revealdCards[1].id])
                    revealdCards[1].classList.add('revers')

                    updateScore();
                    console.log('IS NOT A PAIR!', score)
                }
                revealdCards = [];
            }, 1000);
        }  
        turnBlocked = false;
    } 
};

function updateScore() {
    document.getElementById('score').innerHTML = `Score: ${score} | Turns: ${turns}`;
}

renderCards(randomizeCardsPosition(avalibleCards))