import { characters } from "./characters.js";

document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("h1");
    title.textContent = "Dragon Ball Character Cards";

    const randomButton = document.querySelector("button");
    randomButton.textContent = "Choose A Random Card";

    characters.forEach(createCard);
    randomButton.addEventListener("click", chooseRandomCard);
});

const createCard = (character) => {
    const cardContainer = document.getElementById("card-container");
    const borderDiv = document.createElement("div");
    borderDiv.classList.add("border");

    borderDiv.innerHTML = `
    <div class="card">
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
    </div>
    `;

    cardContainer.appendChild(borderDiv);
};

const chooseRandomCard = () => {
    const borders = document.querySelectorAll(".border");

    borders.forEach((border) => {
        border.classList.remove("cycling");
        border.classList.remove("chosen");
    });

    let currentIndex = 0; // Track the current border being highlighted
    const totalCycles = 15; // Number of cycles through all cards
    let cycleCount = 0; // Counter for the number of cycles
    const interval = 200; // Speed of cycling in milliseconds

    const intervalId = setInterval(() => {
        borders[currentIndex].classList.remove("cycling");

        currentIndex = (currentIndex + 1) % borders.length;

        borders[currentIndex].classList.add("cycling");

        cycleCount++;

        if (cycleCount > totalCycles) {
            clearInterval(intervalId);

            const finalIndex = Math.floor(Math.random() * borders.length);
            borders.forEach((border) => border.classList.remove("cycling"));

            borders[finalIndex].classList.add("chosen");
        }
    }, interval);
};
