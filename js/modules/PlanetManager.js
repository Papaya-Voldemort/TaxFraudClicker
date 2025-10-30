import { planetsData, planetOrder } from '../data/planetsData.js';
import { upgrades } from '../data/upgrades.js';
import { marsUpgradesData } from '../data/marsData.js';
import { 
    mercuryUpgradesData, venusUpgradesData, jupiterUpgradesData,
    saturnUpgradesData, uranusUpgradesData, neptuneUpgradesData, plutoUpgradesData 
} from '../data/planetUpgrades.js';
import { autoClickersData } from '../data/autoClickers.js';
import { marsAutoClickersData } from '../data/marsData.js';
import {
    mercuryAutoClickersData, venusAutoClickersData, jupiterAutoClickersData,
    saturnAutoClickersData, uranusAutoClickersData, neptuneAutoClickersData, plutoAutoClickersData
} from '../data/planetAutoClickers.js';
import { autoClickerUpgradesData } from '../data/autoClickerUpgrades.js';
import { marsACUpgradesData } from '../data/marsData.js';
import {
    mercuryACUpgradesData, venusACUpgradesData, jupiterACUpgradesData,
    saturnACUpgradesData, uranusACUpgradesData, neptuneACUpgradesData, plutoACUpgradesData
} from '../data/planetACUpgrades.js';

export class PlanetManager {
    constructor(gameState, ui, upgradeManager, autoClickerManager, acUpgradeManager) {
        this.gameState = gameState;
        this.ui = ui;
        this.upgradeManager = upgradeManager;
        this.autoClickerManager = autoClickerManager;
        this.acUpgradeManager = acUpgradeManager;
        
        // Map planet IDs to their data
        this.planetsData = planetsData;
        this.planetOrder = planetOrder;
        
        // Map planet IDs to their upgrades/auto-clickers
        this.planetUpgrades = {
            earth: upgrades,
            mercury: mercuryUpgradesData,
            venus: venusUpgradesData,
            mars: marsUpgradesData,
            jupiter: jupiterUpgradesData,
            saturn: saturnUpgradesData,
            uranus: uranusUpgradesData,
            neptune: neptuneUpgradesData,
            pluto: plutoUpgradesData
        };
        
        this.planetAutoClickers = {
            earth: autoClickersData,
            mercury: mercuryAutoClickersData,
            venus: venusAutoClickersData,
            mars: marsAutoClickersData,
            jupiter: jupiterAutoClickersData,
            saturn: saturnAutoClickersData,
            uranus: uranusAutoClickersData,
            neptune: neptuneAutoClickersData,
            pluto: plutoAutoClickersData
        };
        
        this.planetACUpgrades = {
            earth: autoClickerUpgradesData,
            mercury: mercuryACUpgradesData,
            venus: venusACUpgradesData,
            mars: marsACUpgradesData,
            jupiter: jupiterACUpgradesData,
            saturn: saturnACUpgradesData,
            uranus: uranusACUpgradesData,
            neptune: neptuneACUpgradesData,
            pluto: plutoACUpgradesData
        };
    }

    getPlanetData(planetId) {
        return this.planetsData[planetId];
    }

    getCurrentPlanetData() {
        return this.planetsData[this.gameState.currentPlanet];
    }

    getPlanetUpgrades(planetId) {
        return this.planetUpgrades[planetId] || [];
    }

    getPlanetAutoClickers(planetId) {
        return this.planetAutoClickers[planetId] || [];
    }

    getPlanetACUpgrades(planetId) {
        return this.planetACUpgrades[planetId] || [];
    }

    canUnlockPlanet(planetId) {
        const planet = this.planetsData[planetId];
        if (!planet) return false;
        if (this.gameState.unlockedPlanets.has(planetId)) return true;
        
        // Check if requirement planet is unlocked
        if (planet.unlockRequirement && !this.gameState.unlockedPlanets.has(planet.unlockRequirement)) {
            return false;
        }
        
        // Check cost (must be paid from the requirement planet or Earth)
        const fromPlanet = planet.unlockRequirement || 'earth';
        const currency = this.gameState.getPlanetCurrency(fromPlanet);
        
        return currency >= planet.unlockCost;
    }

    unlockPlanet(planetId) {
        const planet = this.planetsData[planetId];
        if (!planet || this.gameState.unlockedPlanets.has(planetId)) return false;
        
        // Get the planet we're paying from
        const fromPlanet = planet.unlockRequirement || 'earth';
        const currency = this.gameState.getPlanetCurrency(fromPlanet);
        
        if (currency < planet.unlockCost) return false;
        
        // Deduct cost from the source planet
        this.gameState.setPlanetCurrency(fromPlanet, currency - planet.unlockCost);
        
        // Unlock the planet
        this.gameState.unlockedPlanets.add(planetId);
        
        // Initialize planet state if not already done
        if (!this.gameState.planetStates[planetId]) {
            this.gameState.initializePlanetState(planetId);
        }
        
        // Show unlock notification
        this.showPlanetUnlockedNotification(planet);
        
        return true;
    }

    switchToPlanet(planetId) {
        if (!this.gameState.unlockedPlanets.has(planetId)) {
            return false;
        }
        
        this.gameState.currentPlanet = planetId;
        
        // Update UI theme
        this.updateTheme(planetId);
        
        // Update header text
        this.updateHeader(planetId);
        
        // Re-render all content for the new planet
        this.upgradeManager.renderUpgrades();
        this.autoClickerManager.renderAutoClickers();
        this.acUpgradeManager.renderUpgrades();
        
        // Update all stats
        this.ui.updateAll(this.gameState);
        
        return true;
    }

    updateTheme(planetId) {
        const planet = this.planetsData[planetId];
        if (!planet) return;
        
        const root = document.documentElement;
        const theme = planet.theme;
        
        root.style.setProperty('--primary-color', theme.primaryColor);
        root.style.setProperty('--secondary-color', theme.secondaryColor);
        root.style.setProperty('--accent-color', theme.accentColor);
        root.style.setProperty('--bg-color', theme.bgColor);
        root.style.setProperty('--card-bg', theme.cardBg);
    }

    updateHeader(planetId) {
        const planet = this.planetsData[planetId];
        if (!planet) return;
        
        const header = document.querySelector('.game-header h1');
        const disclaimer = document.querySelector('.disclaimer');
        
        if (header && disclaimer) {
            header.innerHTML = planet.headerTitle;
            disclaimer.textContent = planet.headerDisclaimer;
        }
        
        // Update stat labels
        const moneyLabel = document.querySelector('#money-display').parentElement.querySelector('h2');
        const perClickLabel = document.querySelector('#per-click-display').parentElement.querySelector('h2');
        const perSecondLabel = document.querySelector('#per-second-display').parentElement.querySelector('h2');
        
        if (moneyLabel) moneyLabel.innerHTML = `${planet.currency.icon} ${planet.currency.name}`;
        if (perClickLabel) perClickLabel.innerHTML = `📈 ${planet.currency.perClickLabel}`;
        if (perSecondLabel) perSecondLabel.innerHTML = `⏱️ ${planet.currency.perSecondLabel}`;
        
        // Update clicker button
        const clickerText = document.getElementById('main-clicker')?.querySelector('.clicker-text');
        const clickerIcon = document.getElementById('main-clicker')?.querySelector('.clicker-icon');
        
        if (clickerText) clickerText.textContent = planet.clickerText;
        if (clickerIcon) clickerIcon.textContent = planet.clickerIcon;
    }

    showPlanetUnlockedNotification(planet) {
        const notification = document.createElement('div');
        notification.className = 'planet-unlock-notification';
        notification.innerHTML = `
            <div class="unlock-header">🎉 PLANET UNLOCKED! 🎉</div>
            <div class="unlock-body">
                <div class="unlock-icon">${planet.icon}</div>
                <div class="unlock-info">
                    <div class="unlock-name">${planet.name}</div>
                    <div class="unlock-description">${planet.description}</div>
                    <div class="unlock-hint">Use the warp menu to travel!</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 600);
        }, 5000);
    }

    checkAndShowUnlockOptions() {
        // Check each locked planet to see if we should show unlock options
        for (const planetId of this.planetOrder) {
            if (this.gameState.unlockedPlanets.has(planetId)) continue;
            
            const planet = this.planetsData[planetId];
            const fromPlanet = planet.unlockRequirement || 'earth';
            
            // Only show if we're on the source planet
            if (this.gameState.currentPlanet !== fromPlanet) continue;
            
            const currency = this.gameState.getPlanetCurrency(fromPlanet);
            
            // Show option when player has 30% of cost
            if (currency >= planet.unlockCost * 0.3) {
                this.showUnlockOption(planetId, fromPlanet);
            }
        }
    }

    showUnlockOption(planetId, fromPlanet) {
        const buttonId = `unlock-${planetId}-button`;
        let unlockButton = document.getElementById(buttonId);
        
        if (!unlockButton) {
            const planet = this.planetsData[planetId];
            unlockButton = document.createElement('button');
            unlockButton.id = buttonId;
            unlockButton.className = 'planet-unlock-button';
            
            const canAfford = this.canUnlockPlanet(planetId);
            unlockButton.innerHTML = `
                <span class="unlock-planet-icon">${planet.icon}</span>
                <span class="unlock-planet-text">Unlock ${planet.name}!</span>
                <span class="unlock-planet-cost">${this.planetsData[fromPlanet].currency.icon} ${this.ui.formatNumber(planet.unlockCost)}</span>
            `;
            unlockButton.disabled = !canAfford;
            
            const clickerSection = document.querySelector('.clicker-section');
            if (clickerSection) {
                clickerSection.appendChild(unlockButton);
            }
            
            unlockButton.addEventListener('click', () => {
                if (this.unlockPlanet(planetId)) {
                    unlockButton.remove();
                }
            });
        } else {
            const canAfford = this.canUnlockPlanet(planetId);
            unlockButton.disabled = !canAfford;
            if (canAfford) {
                unlockButton.classList.add('can-afford');
            } else {
                unlockButton.classList.remove('can-afford');
            }
        }
    }

    createWarpMenu() {
        // Create warp menu button if it doesn't exist
        let warpButton = document.getElementById('warp-menu-button');
        if (!warpButton && this.gameState.unlockedPlanets.size > 1) {
            warpButton = document.createElement('button');
            warpButton.id = 'warp-menu-button';
            warpButton.className = 'warp-menu-button';
            warpButton.innerHTML = `
                <span class="warp-icon">🌌</span>
                <span class="warp-text">Warp Menu</span>
            `;
            
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                statsSection.parentElement.insertBefore(warpButton, statsSection);
            }
            
            warpButton.addEventListener('click', () => {
                this.showWarpMenu();
            });
        }
    }

    showWarpMenu() {
        // Create warp menu overlay
        const overlay = document.createElement('div');
        overlay.id = 'warp-menu-overlay';
        overlay.className = 'warp-menu-overlay';
        
        let planetsHTML = '';
        for (const planetId of this.planetOrder) {
            if (!this.gameState.unlockedPlanets.has(planetId)) continue;
            
            const planet = this.planetsData[planetId];
            const isCurrent = planetId === this.gameState.currentPlanet;
            
            planetsHTML += `
                <button class="warp-planet-button ${isCurrent ? 'current' : ''}" data-planet="${planetId}">
                    <div class="warp-planet-icon">${planet.icon}</div>
                    <div class="warp-planet-name">${planet.name}</div>
                    <div class="warp-planet-currency">${planet.currency.icon} ${this.ui.formatNumber(this.gameState.getPlanetCurrency(planetId))}</div>
                    ${isCurrent ? '<div class="current-indicator">Current</div>' : ''}
                </button>
            `;
        }
        
        overlay.innerHTML = `
            <div class="warp-menu-container">
                <div class="warp-menu-header">
                    <h2>🌌 Planetary Warp Menu 🌌</h2>
                    <button id="warp-menu-close" class="warp-menu-close">×</button>
                </div>
                <div class="warp-menu-content">
                    ${planetsHTML}
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Close button
        document.getElementById('warp-menu-close').addEventListener('click', () => {
            overlay.remove();
        });
        
        // Planet buttons
        overlay.querySelectorAll('.warp-planet-button').forEach(button => {
            button.addEventListener('click', () => {
                const planetId = button.dataset.planet;
                if (planetId !== this.gameState.currentPlanet) {
                    this.switchToPlanet(planetId);
                    overlay.remove();
                }
            });
        });
        
        // Click outside to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }
}
