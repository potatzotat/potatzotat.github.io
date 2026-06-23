// A reliable, open-source testing endpoint for HTML5 games
const API_URL = "https://raw.githubusercontent.com/thegamedevstore/games-json/main/games.json";

async function fetchGames() {
    try {
        const response = await fetch(API_URL);
        const games = await response.json();
        
        const grid = document.getElementById('gameGrid');
        grid.innerHTML = ""; // Clear "Loading..." text if any
        
        // Take the first 20 games from this list
        games.slice(0, 20).forEach(game => {
            const card = document.createElement('div');
            card.classList.add('game-card');
            
            card.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <p>${game.title}</p>
            `;
            
            card.addEventListener('click', () => {
                alert(`Loading game: ${game.title}\nURL: ${game.url}`);
            });
            
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading games:", error);
        document.getElementById('gameGrid').innerHTML = "<p>Failed to load games. Make sure you are running a local server!</p>";
    }
}

fetchGames();
