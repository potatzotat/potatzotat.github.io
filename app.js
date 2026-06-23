// GameDistribution free API endpoint (returns a list of HTML5 games)
const API_URL = "https://catalog.api.gamedistribution.com/api/v2.0/rss/All/?collection=all&type=json";

async function fetchGames() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Target the grid element in our HTML
        const grid = document.getElementById('gameGrid');
        
        // Loop through the first 20 games from the data feed
        data.slice(0, 20).forEach(game => {
            // Create a div wrapper for the game card
            const card = document.createElement('div');
            card.classList.add('game-card');
            
            // Inject the game's thumbnail and title into the card
            card.innerHTML = `
                <img src="${game.Asset && game.Asset[0]}" alt="${game.Title}">
                <p>${game.Title}</p>
            `;
            
            // When clicked, you can make this open the game's URL in an iframe
            card.addEventListener('click', () => {
                alert(`Loading game: ${game.Title}\nURL: ${game.Url}`);
                // Future step: load game.Url into an iframe!
            });
            
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading games:", error);
    }
}

// Run the function when the page loads
fetchGames();
