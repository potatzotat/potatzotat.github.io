// Tell JavaScript to look at your local file
const API_URL = "./games.json";

async function fetchGames() {
    try {
        const response = await fetch(API_URL);
        
        // If the file isn't found, stop and show an error
        if (!response.ok) throw new Error("Could not find games.json");
        
        const games = await response.json();
        
        const grid = document.getElementById('gameGrid');
        grid.innerHTML = ""; // Clear out any loading text
        
        games.forEach(game => {
            const card = document.createElement('div');
            card.classList.add('game-card');
            
            card.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <p>${game.title}</p>
            `;
            
            // This will alert the game URL for now when clicked
            card.addEventListener('click', () => {
                alert(`Loading game: ${game.title}\nURL: ${game.url}`);
            });
            
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading games:", error);
        document.getElementById('gameGrid').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

fetchGames();
