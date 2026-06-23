// 1. The official GameDistribution feed (forced into JSON format)
const GD_API = "https://catalog.api.gamedistribution.com/api/v2.0/rss/All/?format=json";

// 2. The Proxy URL that bypasses the browser's security blocks
const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(GD_API)}`;

async function autoImportGames() {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = "<p>Auto-importing games from GameDistribution...</p>";

    try {
        // Fetch the data through our proxy
        const response = await fetch(PROXY_URL);
        if (!response.ok) throw new Error("Network issue connecting to proxy.");
        
        const proxyData = await response.json();
        
        // The proxy wraps the data in a "contents" string, so we parse it into a real object
        const gamesList = JSON.parse(proxyData.contents);
        
        // Clear the loading text
        grid.innerHTML = ""; 
        
        // Loop through the first 30 games in their live catalog
        gamesList.slice(0, 30).forEach(game => {
            const card = document.createElement('div');
            card.classList.add('game-card');
            
            // GameDistribution stores thumbnails in an array called "Asset"
            const thumbnail = game.Asset[0]; 
            const title = game.Title;
            const gameUrl = game.Url;
            
            card.innerHTML = `
                <img src="${thumbnail}" alt="${title}">
                <p>${title}</p>
            `;
            
            card.addEventListener('click', () => {
                alert(`Ready to load game: ${title}\nURL: ${gameUrl}`);
            });
            
            grid.appendChild(card);
        });

    } catch (error) {
        console.error("Auto-import failed:", error);
        grid.innerHTML = `<p style="color:red;">Failed to import games. Error: ${error.message}</p>`;
    }
}

// Run the auto-importer when the page loads
autoImportGames();
