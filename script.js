import characters from "./characters.js";

document.addEventListener("DOMContentLoaded", () => {
    const randomButton = document.querySelector("button");
    randomButton.textContent = "Choose A Random Card";

    characters.forEach(createCard);
    randomButton.addEventListener("click", chooseRandomCard);
});

const createCard = (character) => {
    const cardContainer = document.getElementById("card-container");
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
        <div class="images">
            <img class="background" src="${character.background}" />
            <img class="character" src="${character.character}" />
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
