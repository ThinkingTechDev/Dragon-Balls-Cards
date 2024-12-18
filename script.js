import { characters } from "./characters.js";

document.addEventListener("DOMContentLoaded", () => {
    const randomButton = document.querySelector("button");
    randomButton.textContent = "Choose A Random Card";

    characters.forEach(createCard);
    randomButton.addEventListener("click", chooseRandomCard);
});

const createCard = (character) => {
    const cardContainer = document.getElementById("card-container");
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${character.image}">
        <div class="name">Name: ${character.name}</div>
        <div class="power">Power: ${character.power}</div>
    `;

    cardContainer.appendChild(card);
};

const chooseRandomCard = () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        card.classList.remove("cycling");
        card.classList.remove("chosen");
    });

    let currentIndex = 0; // Track the current card being highlighted
    const totalCycles = 15; // Number of cycles through all cards
    let cycleCount = 0; // Counter for the number of cycles
    const interval = 150; // Speed of cycling in milliseconds

    const intervalId = setInterval(() => {
        cards[currentIndex].classList.remove("cycling");
        currentIndex = (currentIndex + 1) % cards.length;
        cards[currentIndex].classList.add("cycling");
        cycleCount++;

        if (cycleCount > totalCycles) {
            clearInterval(intervalId);

            const finalIndex = Math.floor(Math.random() * cards.length);
            cards.forEach((card) => card.classList.remove("cycling"));
            cards[finalIndex].classList.add("chosen");
        }
    }, interval);
};
