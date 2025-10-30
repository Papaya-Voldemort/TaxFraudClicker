import { GameState } from './modules/GameState.js';
import { UI } from './modules/UI.js';
import { ClickHandler } from './modules/ClickHandler.js';
import { UpgradeManager } from './modules/UpgradeManager.js';
import { AutoClickerManager } from './modules/AutoClickerManager.js';
import { AutoClickerUpgradeManager } from './modules/AutoClickerUpgradeManager.js';
import { SaveManager } from './modules/SaveManager.js';
import { TabManager } from './modules/TabManager.js';
import { AchievementManager } from './modules/AchievementManager.js';
import { JailManager } from './modules/JailManager.js';

class Game {
    constructor() {
        this.gameState = new GameState();
        this.ui = new UI();
        this.clickHandler = new ClickHandler(this.gameState, this.ui);
        this.upgradeManager = new UpgradeManager(this.gameState, this.ui);
        this.autoClickerManager = new AutoClickerManager(this.gameState, this.ui);
        this.autoClickerUpgradeManager = new AutoClickerUpgradeManager(this.gameState, this.ui);
        this.jailManager = new JailManager(this.gameState, this.ui);
        this.saveManager = new SaveManager(this.gameState, this.jailManager);
        this.tabManager = new TabManager();
        this.achievementManager = new AchievementManager(this.gameState, this.ui);
        
        this.init();
    }

    init() {
        // Load saved game
        this.saveManager.load();
        
        // Initialize achievement manager
        this.achievementManager.unlockedAchievements = this.gameState.unlockedAchievements;
        this.achievementManager.init();
        
        // Initialize UI
        this.ui.updateAll(this.gameState);
        this.upgradeManager.renderUpgrades();
        this.autoClickerManager.renderAutoClickers();
        this.autoClickerUpgradeManager.renderUpgrades();
        this.updateAchievementProgress();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start game loop
        this.startGameLoop();
        
        console.log('Tax Fraud Clicker initialized! (Don\'t actually commit tax fraud!)');
    }

    setupEventListeners() {
        // Main clicker
        document.getElementById('main-clicker').addEventListener('click', (e) => {
            this.clickHandler.handleClick(e);
            this.achievementManager.checkAchievements();
        });

        // Jail clicker
        document.getElementById('jail-clicker').addEventListener('click', (e) => {
            this.jailManager.handleJailClick();
        });

        // Tab navigation
        this.tabManager.init();

        // Settings buttons
        document.getElementById('save-button').addEventListener('click', () => {
            this.saveManager.save();
            alert('Game saved successfully!');
        });

        document.getElementById('load-button').addEventListener('click', () => {
            if (this.saveManager.load()) {
                this.ui.updateAll(this.gameState);
                this.upgradeManager.renderUpgrades();
                this.autoClickerManager.renderAutoClickers();
                this.autoClickerUpgradeManager.renderUpgrades();
                alert('Game loaded successfully!');
            } else {
                alert('No save file found!');
            }
        });

        document.getElementById('export-button').addEventListener('click', () => {
            const saveData = JSON.stringify(this.gameState.toJSON());
            const blob = new Blob([saveData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tax-fraud-clicker-save.json';
            a.click();
            URL.revokeObjectURL(url);
        });

        document.getElementById('import-button').addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        this.gameState.fromJSON(data);
                        this.saveManager.save();
                        this.ui.updateAll(this.gameState);
                        this.upgradeManager.renderUpgrades();
                        this.autoClickerManager.renderAutoClickers();
                        this.autoClickerUpgradeManager.renderUpgrades();
                        alert('Save imported successfully!');
                    } catch (error) {
                        alert('Invalid save file!');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        });

        // Reset button
        document.getElementById('reset-game-button').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset your game? All progress will be lost!')) {
                this.achievementManager.manualUnlock('reset_game');
                setTimeout(() => {
                    this.saveManager.reset();
                    location.reload();
                }, 2000);
            }
        });

        // Upgrade buttons (delegated)
        document.getElementById('upgrades-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('upgrade-button')) {
                const upgradeId = e.target.dataset.upgradeId;
                this.upgradeManager.purchaseUpgrade(upgradeId);
                this.achievementManager.checkAchievements();
            }
        });

        // Auto-clicker buttons (delegated)
        document.getElementById('auto-clickers-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('auto-clicker-button')) {
                const autoClickerId = e.target.dataset.autoClickerId;
                this.autoClickerManager.purchaseAutoClicker(autoClickerId);
                this.achievementManager.checkAchievements();
            }
        });

        // Auto-clicker upgrade buttons (delegated)
        document.getElementById('ac-upgrades-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('upgrade-button')) {
                const upgradeId = e.target.dataset.acUpgradeId;
                this.autoClickerUpgradeManager.purchaseUpgrade(upgradeId);
                this.achievementManager.checkAchievements();
            }
        });

        // Jail upgrade buttons (delegated)
        document.getElementById('jail-upgrades-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('jail-upgrade-button')) {
                const upgradeId = e.target.dataset.upgradeId;
                this.jailManager.purchaseJailUpgrade(upgradeId);
            }
        });

        // Jail auto-clicker buttons (delegated)
        document.getElementById('jail-auto-clickers-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('jail-auto-clicker-button')) {
                const autoClickerId = e.target.dataset.autoClickerId;
                this.jailManager.purchaseJailAutoClicker(autoClickerId);
            }
        });

        // Auto-save every 10 seconds
        setInterval(() => {
            this.saveManager.save();
        }, 10000);

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveManager.save();
        });
    }

    startGameLoop() {
        let lastTime = Date.now();
        
        const gameLoop = () => {
            const currentTime = Date.now();
            const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
            lastTime = currentTime;

            if (!this.jailManager.isInJail) {
                // Generate passive income (only when not in jail)
                this.autoClickerManager.generatePassiveIncome(deltaTime);

                // Check for IRS detection
                this.jailManager.checkIRSDetection();

                // Update UI
                this.ui.updateAll(this.gameState);
                this.upgradeManager.updateUpgradeButtons();
                this.autoClickerManager.updateAutoClickerButtons();
                this.autoClickerUpgradeManager.updateUpgradeButtons();
                this.achievementManager.checkAchievements();
                this.achievementManager.updateAllProgressBars();
                this.updateSettings();
                this.updateAchievementProgress();
            } else {
                // In jail - generate freedom
                this.jailManager.generateJailPassiveIncome(deltaTime);
                
                // Check achievements even in jail
                this.achievementManager.checkAchievements();
            }

            requestAnimationFrame(gameLoop);
        };

        requestAnimationFrame(gameLoop);
    }

    updateAchievementProgress() {
        const progress = this.achievementManager.getProgress();
        const percentage = (progress.unlocked / progress.total) * 100;
        
        document.getElementById('achievements-unlocked').textContent = progress.unlocked;
        document.getElementById('achievements-total').textContent = progress.total;
        document.getElementById('achievements-progress-bar').style.width = percentage + '%';
        document.getElementById('achievement-counter').textContent = `${progress.unlocked}/${progress.total}`;
    }

    updateSettings() {
        // Update statistics in settings tab
        document.getElementById('stat-total-clicks').textContent = this.ui.formatNumber(this.gameState.totalClicks);
        document.getElementById('stat-total-money').textContent = this.ui.formatNumber(this.gameState.totalMoneyEarned);
    }
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});
