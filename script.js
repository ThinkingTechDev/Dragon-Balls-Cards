import { characters } from "./characters.js";

const title = document.querySelector("h1");
const randomButton = document.querySelector(".random-button");
const cardContainer = document.getElementById("card-container");

document.addEventListener("DOMContentLoaded", () => {
    title.textContent = "Dragon Ball Character Cards";

    randomButton.textContent = "Choose A Random Card";

    characters.map((character) => createCard(character));
    randomButton.addEventListener("click", chooseRandomCard);
});

const createCard = (character) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
        <div class="images">
            <img class="background" src="${character.background}" />
            <img class="character" src="${character.fighter}" />
        </div>
        <div class="info">
            <h2>${character.name}</h2>
            <span class="super-move">Super Move: ${character.superMove}</span>
            <div class="stats">
                <span>Strength: ${character.strength}</span>
                <span>Speed: ${character.speed}</span>
                <span>Energy: ${character.energy}</span>
                <span>Defense: ${character.defense}</span>
            </div>
        </div>
    `;

    cardContainer.appendChild(div);
};

const chooseRandomCard = () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        card.classList.remove("cycling");
        card.classList.remove("chosen");
    });

    let currentIndex = 0; // Track the current border being highlighted
    const totalCycles = 15; // Number of cycles through all cards
    let cycleCount = 0; // Counter for the number of cycles

    const interval = setInterval(() => {
        cards[currentIndex].classList.remove("cycling");

        currentIndex++;

        currentIndex = currentIndex % cards.length;

        cards[currentIndex].classList.add("cycling");

        cycleCount++;

        if (cycleCount > totalCycles) {
            clearInterval(interval);

            const randomIndex = Math.floor(Math.random() * cards.length);

            cards.forEach((card) => card.classList.remove("cycling"));

            cards[randomIndex].classList.add("chosen");
        }
    }, 200);
};
