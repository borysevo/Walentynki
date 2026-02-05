const symbols = ["❤️","💌","💘","🌹","😍","💕"];
let cards = [...symbols, ...symbols];
cards.sort(() => 0.5 - Math.random());

const game = document.getElementById("game");
const reward = document.getElementById("reward");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card-memory");
    card.dataset.symbol = symbol;
    card.textContent = "❓";

    card.addEventListener("click", () => flipCard(card));
    game.appendChild(card);
});

function flipCard(card) {
    if (lockBoard || card.classList.contains("matched") || card === firstCard) return;

    card.textContent = card.dataset.symbol;
    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;

        resetTurn();

        if (matchedPairs === symbols.length) {
            reward.classList.remove("hidden");
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = "❓";
            secondCard.textContent = "❓";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 900);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function copyText() {
    const text = document.getElementById("code").innerText;
    navigator.clipboard.writeText(text);
    alert("💖 Tekst skopiowany!");
}