// Mini-games that appear periodically in the game

export const miniGamesData = [
    {
        id: 'meteor_shower',
        name: 'Meteor Shower',
        icon: '☄️',
        description: 'Click the meteors before they hit!',
        frequency: 300000, // Every 5 minutes
        duration: 15000, // 15 seconds
        difficulty: 'easy',
        rewards: {
            multiplier: 2,
            duration: 30000 // 30 second boost
        }
    },
    {
        id: 'solar_flare',
        name: 'Solar Flare',
        icon: '☀️',
        description: 'Rapid clicking challenge!',
        frequency: 420000, // Every 7 minutes
        duration: 10000, // 10 seconds
        difficulty: 'medium',
        rewards: {
            multiplier: 3,
            duration: 20000 // 20 second boost
        }
    },
    {
        id: 'asteroid_mining',
        name: 'Asteroid Rush',
        icon: '🪨',
        description: 'Mine the passing asteroids!',
        frequency: 360000, // Every 6 minutes
        duration: 20000, // 20 seconds
        difficulty: 'medium',
        rewards: {
            multiplier: 2.5,
            duration: 25000
        }
    },
    {
        id: 'alien_trader',
        name: 'Alien Trader',
        icon: '👽',
        description: 'Quick! Trade with the alien ship!',
        frequency: 600000, // Every 10 minutes
        duration: 12000, // 12 seconds
        difficulty: 'easy',
        rewards: {
            bonus: 1000000, // Flat currency bonus
            type: 'currency'
        }
    },
    {
        id: 'black_hole',
        name: 'Black Hole Event',
        icon: '🌌',
        description: 'Escape the gravitational pull!',
        frequency: 900000, // Every 15 minutes
        duration: 30000, // 30 seconds
        difficulty: 'hard',
        rewards: {
            multiplier: 5,
            duration: 60000 // 1 minute boost
        }
    }
];

export class MiniGameManager {
    constructor(gameState, ui) {
        this.gameState = gameState;
        this.ui = ui;
        this.activeGame = null;
        this.lastGameTime = {};
        this.gameTimers = new Map();
        
        // Initialize last game times
        miniGamesData.forEach(game => {
            this.lastGameTime[game.id] = Date.now();
        });
    }

    checkForMiniGames() {
        if (this.activeGame) return; // Don't start new game if one is active
        if (this.gameState.isInJail) return; // No mini-games in jail

        const now = Date.now();
        
        for (const game of miniGamesData) {
            const timeSinceLastGame = now - (this.lastGameTime[game.id] || 0);
            
            // Add some randomness (50-150% of frequency)
            const randomizedFrequency = game.frequency * (0.5 + Math.random());
            
            if (timeSinceLastGame >= randomizedFrequency) {
                this.startMiniGame(game);
                this.lastGameTime[game.id] = now;
                break; // Only start one game at a time
            }
        }
    }

    startMiniGame(game) {
        this.activeGame = game;
        this.showMiniGameUI(game);
        
        // Set timeout to end the game
        const timer = setTimeout(() => {
            this.endMiniGame(false); // Failed to complete in time
        }, game.duration);
        
        this.gameTimers.set(game.id, timer);
    }

    showMiniGameUI(game) {
        // Create mini-game overlay
        const overlay = document.createElement('div');
        overlay.id = 'mini-game-overlay';
        overlay.className = 'mini-game-overlay';
        
        overlay.innerHTML = `
            <div class="mini-game-container">
                <div class="mini-game-header">
                    <h2>${game.icon} ${game.name}</h2>
                    <div class="mini-game-timer">
                        <span id="mini-game-time">${Math.floor(game.duration / 1000)}</span>s
                    </div>
                </div>
                <div class="mini-game-description">${game.description}</div>
                <div id="mini-game-area" class="mini-game-area"></div>
                <div class="mini-game-progress">
                    <div id="mini-game-progress-bar" class="progress-bar"></div>
                </div>
                <button id="mini-game-skip" class="mini-game-skip">Skip</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Start the specific mini-game logic
        this.initMiniGameLogic(game);
        
        // Timer countdown
        this.startGameTimer(game);
        
        // Skip button
        document.getElementById('mini-game-skip').addEventListener('click', () => {
            this.endMiniGame(false);
        });
    }

    startGameTimer(game) {
        const timerElement = document.getElementById('mini-game-time');
        let timeLeft = Math.floor(game.duration / 1000);
        
        const countdown = setInterval(() => {
            timeLeft--;
            if (timerElement) {
                timerElement.textContent = timeLeft;
            }
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
            }
        }, 1000);
    }

    initMiniGameLogic(game) {
        const gameArea = document.getElementById('mini-game-area');
        
        switch(game.id) {
            case 'meteor_shower':
                this.initMeteorShower(gameArea, game);
                break;
            case 'solar_flare':
                this.initSolarFlare(gameArea, game);
                break;
            case 'asteroid_mining':
                this.initAsteroidMining(gameArea, game);
                break;
            case 'alien_trader':
                this.initAlienTrader(gameArea, game);
                break;
            case 'black_hole':
                this.initBlackHole(gameArea, game);
                break;
        }
    }

    initMeteorShower(gameArea, game) {
        let score = 0;
        const target = 10;
        
        const spawnMeteor = () => {
            if (!this.activeGame) return;
            
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.textContent = '☄️';
            meteor.style.left = Math.random() * 80 + '%';
            meteor.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            meteor.addEventListener('click', () => {
                score++;
                meteor.remove();
                this.updateMiniGameProgress(score / target * 100);
                
                if (score >= target) {
                    this.endMiniGame(true);
                }
            });
            
            gameArea.appendChild(meteor);
            
            setTimeout(() => meteor.remove(), 4000);
            
            if (this.activeGame && score < target) {
                setTimeout(spawnMeteor, 800);
            }
        };
        
        spawnMeteor();
    }

    initSolarFlare(gameArea, game) {
        let clicks = 0;
        const target = 50;
        
        gameArea.innerHTML = `
            <div class="clicker-game">
                <div class="clicker-target">☀️</div>
                <div class="clicker-count">${clicks}/${target}</div>
            </div>
        `;
        
        const clickerTarget = gameArea.querySelector('.clicker-target');
        const clickerCount = gameArea.querySelector('.clicker-count');
        
        clickerTarget.addEventListener('click', () => {
            clicks++;
            clickerCount.textContent = `${clicks}/${target}`;
            this.updateMiniGameProgress(clicks / target * 100);
            
            if (clicks >= target) {
                this.endMiniGame(true);
            }
        });
    }

    initAsteroidMining(gameArea, game) {
        let score = 0;
        const target = 8;
        
        const spawnAsteroid = () => {
            if (!this.activeGame) return;
            
            const asteroid = document.createElement('div');
            asteroid.className = 'asteroid';
            asteroid.textContent = '🪨';
            asteroid.style.left = Math.random() * 80 + '%';
            asteroid.style.top = Math.random() * 60 + '%';
            
            let health = 3;
            asteroid.addEventListener('click', () => {
                health--;
                if (health <= 0) {
                    score++;
                    asteroid.remove();
                    this.updateMiniGameProgress(score / target * 100);
                    
                    if (score >= target) {
                        this.endMiniGame(true);
                    } else {
                        spawnAsteroid();
                    }
                }
            });
            
            gameArea.appendChild(asteroid);
        };
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => spawnAsteroid(), i * 500);
        }
    }

    initAlienTrader(gameArea, game) {
        gameArea.innerHTML = `
            <div class="alien-trader">
                <div class="alien-ship">👽 🛸</div>
                <div class="trade-offer">Trade your resources for bonus currency!</div>
                <button id="accept-trade" class="trade-button">Accept Trade</button>
            </div>
        `;
        
        document.getElementById('accept-trade').addEventListener('click', () => {
            this.endMiniGame(true);
        });
    }

    initBlackHole(gameArea, game) {
        let escaped = false;
        gameArea.innerHTML = `
            <div class="black-hole-game">
                <div class="black-hole">🌌</div>
                <div class="escape-ship" id="escape-ship">🚀</div>
                <div class="escape-instructions">Click rapidly to escape!</div>
                <div class="escape-progress" id="escape-progress">0%</div>
            </div>
        `;
        
        let escapeProgress = 0;
        const ship = document.getElementById('escape-ship');
        const progressDisplay = document.getElementById('escape-progress');
        
        gameArea.addEventListener('click', () => {
            if (escaped) return;
            
            escapeProgress += 2;
            progressDisplay.textContent = Math.min(escapeProgress, 100) + '%';
            this.updateMiniGameProgress(Math.min(escapeProgress, 100));
            
            if (escapeProgress >= 100) {
                escaped = true;
                this.endMiniGame(true);
            }
        });
        
        // Gravity pull (reduces progress over time)
        const gravityInterval = setInterval(() => {
            if (!this.activeGame || escaped) {
                clearInterval(gravityInterval);
                return;
            }
            escapeProgress = Math.max(0, escapeProgress - 1);
            progressDisplay.textContent = escapeProgress + '%';
            this.updateMiniGameProgress(escapeProgress);
        }, 200);
    }

    updateMiniGameProgress(percentage) {
        const progressBar = document.getElementById('mini-game-progress-bar');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
    }

    endMiniGame(success) {
        if (!this.activeGame) return;
        
        const game = this.activeGame;
        
        // Clear timer
        const timer = this.gameTimers.get(game.id);
        if (timer) {
            clearTimeout(timer);
            this.gameTimers.delete(game.id);
        }
        
        // Award rewards if successful
        if (success) {
            this.awardRewards(game);
        }
        
        // Remove UI
        const overlay = document.getElementById('mini-game-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        this.activeGame = null;
    }

    awardRewards(game) {
        if (game.rewards.type === 'currency') {
            // Award flat currency bonus
            const bonus = game.rewards.bonus;
            this.gameState.addMoney(bonus);
            this.showRewardNotification(`+${this.ui.formatNumber(bonus)} ${this.getCurrentCurrencyName()}!`);
        } else if (game.rewards.multiplier) {
            // Award temporary multiplier
            this.applyTemporaryMultiplier(game.rewards.multiplier, game.rewards.duration);
            this.showRewardNotification(`${game.rewards.multiplier}x boost for ${game.rewards.duration / 1000}s!`);
        }
    }

    getCurrentCurrencyName() {
        const planetData = this.gameState.getCurrentPlanetData();
        return planetData ? planetData.currency.name : 'Money';
    }

    applyTemporaryMultiplier(multiplier, duration) {
        // Store original values
        const originalPerClick = this.gameState.currentPlanet === 'earth' 
            ? this.gameState.moneyPerClick 
            : this.gameState.marsCreditsPerClick;
        
        const originalPerSecond = this.gameState.currentPlanet === 'earth'
            ? this.gameState.moneyPerSecond
            : this.gameState.marsCreditsPerSecond;
        
        // Apply multiplier
        if (this.gameState.currentPlanet === 'earth') {
            this.gameState.moneyPerClick *= multiplier;
            this.gameState.moneyPerSecond *= multiplier;
        } else {
            this.gameState.marsCreditsPerClick *= multiplier;
            this.gameState.marsCreditsPerSecond *= multiplier;
        }
        
        // Remove multiplier after duration
        setTimeout(() => {
            if (this.gameState.currentPlanet === 'earth') {
                this.gameState.moneyPerClick = originalPerClick;
                this.gameState.moneyPerSecond = originalPerSecond;
            } else {
                this.gameState.marsCreditsPerClick = originalPerClick;
                this.gameState.marsCreditsPerSecond = originalPerSecond;
            }
        }, duration);
    }

    showRewardNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'mini-game-reward';
        notification.textContent = `🎉 ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}
