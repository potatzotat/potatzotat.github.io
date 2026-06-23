const GD_API = "https://catalog.api.gamedistribution.com/api/v2.0/rss/All/?format=json";
const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(GD_API)}`;

// UI Elements
const grid = document.getElementById('gameGrid');
const gridTitle = document.getElementById('gridTitle');
const gamePlayer = document.getElementById('gamePlayer');
const gameFrame = document.getElementById('gameFrame');
const closeBtn = document.getElementById('closeGameBtn');

async function autoImportGames() {
    grid.innerHTML = "<p>Auto-importing games from GameDistribution...</p>";

    try {
        const response = await fetch(PROXY_URL);
        if (!response.ok) throw new Error("Network issue connecting to proxy.");
        
        const proxyData = await response.json();
        const gamesList = JSON.parse(proxyData.contents);
        
        grid.innerHTML = ""; 
        
        gamesList.slice(0, 30).forEach(game => {
            const card = document.createElement('div');
            card.classList.add('game-card');
            
            const thumbnail = game.Asset[0]; 
            const title = game.Title;
            const gameUrl = game.Url;
            
            card.innerHTML = `
                <img src="${thumbnail}" alt="${title}">
                <p>${title}</p>
            `;
            
            // NEW: Instead of an alert, we call openGame()
            card.addEventListener('click', () => {
                openGame(gameUrl);
            });
            
            grid.appendChild(card);
        });

    } catch (error) {
        console.error("Auto-import failed:", error);
        grid.innerHTML = `<p style="color:red;">Failed to import games. Error: ${error.message}</p>`;
    }
}

// --- Player Logic ---

function openGame(url) {
    // 1. Hide the grid and title
    grid.classList.add('hidden');
    gridTitle.classList.add('hidden');
    
    // 2. Load the game into the iframe
    gameFrame.src = url;
    
    // 3. Show the player
    gamePlayer.classList.remove('hidden');
    
    // 4. Scroll smoothly to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// When the "Back to Arcade" button is clicked
closeBtn.addEventListener('click', () => {
    // 1. Hide the player
    gamePlayer.classList.add('hidden');
    
    // 2. UNLOAD the game (crucial so game audio stops playing in the background!)
    gameFrame.src = "";
    
    // 3. Bring the grid back
    grid.classList.remove('hidden');
    gridTitle.classList.remove('hidden');
});

// Start the engine
autoImportGames();
