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
import { MarsManager } from './modules/MarsManager.js';
import { PlanetManager } from './modules/PlanetManager.js';

class Game {
    constructor() {
        this.gameState = new GameState();
        this.ui = new UI();
        this.clickHandler = new ClickHandler(this.gameState, this.ui);
        this.upgradeManager = new UpgradeManager(this.gameState, this.ui);
        this.autoClickerManager = new AutoClickerManager(this.gameState, this.ui);
        this.autoClickerUpgradeManager = new AutoClickerUpgradeManager(this.gameState, this.ui);
        this.jailManager = new JailManager(this.gameState, this.ui);
        this.marsManager = new MarsManager(this.gameState, this.ui, this.upgradeManager, this.autoClickerManager, this.autoClickerUpgradeManager);
        this.planetManager = new PlanetManager(this.gameState, this.ui, this.upgradeManager, this.autoClickerManager, this.autoClickerUpgradeManager);
        this.saveManager = new SaveManager(this.gameState, this.jailManager);
        this.tabManager = new TabManager();
        this.achievementManager = new AchievementManager(this.gameState, this.ui);
        
        // Set up bi-directional references
        this.upgradeManager.setPlanetManager(this.planetManager);
        
        this.init();
    }

    init() {
        // Load saved game
        this.saveManager.load();
        
        // Initialize achievement manager
        this.achievementManager.unlockedAchievements = this.gameState.unlockedAchievements;
        this.achievementManager.init();
        
        // Initialize Mars if unlocked (legacy support)
        if (this.gameState.marsUnlocked || this.gameState.unlockedPlanets.has('mars')) {
            this.gameState.unlockedPlanets.add('mars');
            this.marsManager.updatePlanetToggle();
            this.marsManager.updateTheme(this.gameState.currentPlanet);
            this.marsManager.updateHeader(this.gameState.currentPlanet);
        }
        
        // Initialize current planet theme
        this.planetManager.updateTheme(this.gameState.currentPlanet);
        this.planetManager.updateHeader(this.gameState.currentPlanet);
        
        // Create warp menu if multiple planets unlocked
        if (this.gameState.unlockedPlanets.size > 1) {
            this.planetManager.createWarpMenu();
        }
        
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
        
        // Planet toggle (delegated event for dynamic button)
        document.addEventListener('click', (e) => {
            if (e.target.closest('#planet-toggle')) {
                const newPlanet = this.gameState.currentPlanet === 'earth' ? 'mars' : 'earth';
                this.marsManager.switchToPlanet(newPlanet);
                this.saveManager.save();
            }
        });

        // Settings buttons
        document.getElementById('save-button').addEventListener('click', () => {
            this.saveManager.save();
            this.showToast('💾 Game saved successfully!', 'success');
        });

        document.getElementById('load-button').addEventListener('click', () => {
            if (this.saveManager.load()) {
                this.ui.updateAll(this.gameState);
                this.upgradeManager.renderUpgrades();
                this.autoClickerManager.renderAutoClickers();
                this.autoClickerUpgradeManager.renderUpgrades();
                this.showToast('📂 Game loaded successfully!', 'success');
            } else {
                this.showToast('❌ No save file found!', 'error');
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
            const stats = {
                money: this.ui.formatNumber(this.gameState.money || 0),
                clicks: this.ui.formatNumber(this.gameState.totalClicks || 0),
                achievements: this.achievementManager?.unlockedAchievements?.size || 0,
                planets: this.gameState?.unlockedPlanets?.size || 0
            };
            
            const message = `⚠️ WARNING: This will reset ALL game progress! ⚠️\n\n` +
                `You will lose:\n` +
                `• ${stats.money} Hidden Money\n` +
                `• ${stats.clicks} Total Clicks\n` +
                `• ${stats.achievements} Achievements\n` +
                `• ${stats.planets} Unlocked Planets\n` +
                `• All upgrades and auto-clickers\n\n` +
                `This action CANNOT be undone!\n\n` +
                `Are you absolutely sure?`;
            
            if (confirm(message)) {
                // Disable auto-save to prevent saving during reset
                // Note: This flag is only set temporarily before page reload, so no need to reset it
                this.saveManager.savingEnabled = false;
                // Reset the game data in localStorage
                this.saveManager.reset();
                // Reload the page immediately to start fresh
                location.reload();
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

        // Dev menu toggle (press 'd' key)
        let devMenuOpen = false;
        window.addEventListener('keydown', (e) => {
            if (e.key === 'd' || e.key === 'D') {
                devMenuOpen = !devMenuOpen;
                if (devMenuOpen) {
                    this.showDevMenu();
                } else {
                    this.hideDevMenu();
                }
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

                // Check for IRS detection (only on Earth)
                if (this.gameState.currentPlanet === 'earth') {
                    this.jailManager.checkIRSDetection();
                }
                
                // Check if Mars launch option should be shown (legacy)
                this.marsManager.checkAndShowLaunchOption();
                
                // Check for planet unlock options
                this.planetManager.checkAndShowUnlockOptions();
                
                // Update warp menu button visibility
                if (this.gameState.unlockedPlanets.size > 1) {
                    this.planetManager.createWarpMenu();
                }

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

    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `game-toast game-toast-${type}`;
        toast.textContent = message;
        
        // Add to document
        document.body.appendChild(toast);
        
        // Trigger animation
        const showTimeout = setTimeout(() => toast.classList.add('show'), 10);
        
        // Remove after 3 seconds
        const removeTimeout = setTimeout(() => {
            if (toast.parentElement) { // Only remove if still in DOM
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentElement) {
                        toast.remove();
                    }
                }, 300);
            }
        }, 3000);
        
        // Store timeouts for potential cleanup
        toast._timeouts = [showTimeout, removeTimeout];
    }

    showDevMenu() {
        // Check if dev menu already exists
        if (document.getElementById('dev-menu')) return;

        const menu = document.createElement('div');
        menu.id = 'dev-menu';
        menu.className = 'dev-menu';
        menu.innerHTML = `
            <div class="dev-menu-container">
                <div class="dev-menu-header">
                    <h2>🛠️ Developer Menu</h2>
                    <button id="dev-menu-close" class="dev-menu-close">×</button>
                </div>
                <div class="dev-menu-content">
                    <div class="dev-section">
                        <h3>Currency</h3>
                        <button class="dev-button" id="dev-add-money-1k">Add 1K Money</button>
                        <button class="dev-button" id="dev-add-money-1m">Add 1M Money</button>
                        <button class="dev-button" id="dev-add-money-1b">Add 1B Money</button>
                        <button class="dev-button" id="dev-max-money">Max Money</button>
                    </div>
                    <div class="dev-section">
                        <h3>Upgrades & Boosters</h3>
                        <button class="dev-button" id="dev-unlock-all-upgrades">Unlock All Upgrades</button>
                        <button class="dev-button" id="dev-max-click">Max Click Value</button>
                        <button class="dev-button" id="dev-max-auto">Max Auto Clickers</button>
                    </div>
                    <div class="dev-section">
                        <h3>Planets</h3>
                        <button class="dev-button" id="dev-unlock-all-planets">Unlock All Planets</button>
                    </div>
                    <div class="dev-section">
                        <h3>Achievements</h3>
                        <button class="dev-button" id="dev-unlock-all-achievements">Unlock All Achievements</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(menu);
        
        // Add event listeners
        document.getElementById('dev-menu-close').addEventListener('click', () => this.hideDevMenu());
        document.getElementById('dev-add-money-1k').addEventListener('click', () => {
            this.gameState.addMoney(1000);
            this.showToast('Added 1K money', 'success');
        });
        document.getElementById('dev-add-money-1m').addEventListener('click', () => {
            this.gameState.addMoney(1000000);
            this.showToast('Added 1M money', 'success');
        });
        document.getElementById('dev-add-money-1b').addEventListener('click', () => {
            this.gameState.addMoney(1000000000);
            this.showToast('Added 1B money', 'success');
        });
        document.getElementById('dev-max-money').addEventListener('click', () => {
            this.gameState.addMoney(999999999999);
            this.showToast('Added max money', 'success');
        });
        document.getElementById('dev-unlock-all-upgrades').addEventListener('click', () => {
            this.unlockAllUpgrades();
            this.showToast('Unlocked all upgrades', 'success');
        });
        document.getElementById('dev-max-click').addEventListener('click', () => {
            const state = this.gameState.getCurrentPlanetState();
            state.currencyPerClick = 1000000;
            this.showToast('Maxed click value', 'success');
        });
        document.getElementById('dev-max-auto').addEventListener('click', () => {
            const state = this.gameState.getCurrentPlanetState();
            state.currencyPerSecond = 1000000;
            this.showToast('Maxed auto income', 'success');
        });
        document.getElementById('dev-unlock-all-planets').addEventListener('click', () => {
            this.unlockAllPlanets();
            this.showToast('Unlocked all planets', 'success');
        });
        document.getElementById('dev-unlock-all-achievements').addEventListener('click', () => {
            this.unlockAllAchievements();
            this.showToast('Unlocked all achievements', 'success');
        });
    }

    hideDevMenu() {
        const menu = document.getElementById('dev-menu');
        if (menu) {
            menu.remove();
        }
    }

    unlockAllUpgrades() {
        // Get all upgrades for current planet
        const upgrades = this.planetManager.getPlanetUpgrades(this.gameState.currentPlanet);
        upgrades.forEach(upgrade => {
            if (!this.gameState.hasUpgrade(upgrade.id)) {
                this.gameState.purchaseUpgrade(upgrade.id);
                this.upgradeManager.applyUpgradeEffect(upgrade);
            }
        });
        this.upgradeManager.renderUpgrades();
    }

    unlockAllPlanets() {
        const planetOrder = ['earth', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
        planetOrder.forEach(planetId => {
            if (!this.gameState.unlockedPlanets.has(planetId)) {
                this.gameState.unlockedPlanets.add(planetId);
                this.gameState.initializePlanetState(planetId);
            }
        });
        this.planetManager.createWarpMenu();
    }

    unlockAllAchievements() {
        this.achievementManager.achievements.forEach(achievement => {
            if (!this.achievementManager.isUnlocked(achievement.id)) {
                this.achievementManager.unlockAchievement(achievement.id);
            }
        });
        this.updateAchievementProgress();
    }
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});
