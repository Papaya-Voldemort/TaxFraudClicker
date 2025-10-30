export class MarsManager {
    constructor(gameState, ui, upgradeManager, autoClickerManager, acUpgradeManager) {
        this.gameState = gameState;
        this.ui = ui;
        this.upgradeManager = upgradeManager;
        this.autoClickerManager = autoClickerManager;
        this.acUpgradeManager = acUpgradeManager;
        this.marsLaunchCost = 10000000000; // 10 billion to unlock Mars
    }

    canLaunchToMars() {
        return this.gameState.money >= this.marsLaunchCost && !this.gameState.marsUnlocked;
    }

    launchToMars() {
        if (!this.canLaunchToMars()) {
            return false;
        }

        // Spend money to unlock Mars
        if (this.gameState.spendMoney(this.marsLaunchCost)) {
            this.gameState.marsUnlocked = true;
            this.switchToPlanet('mars');
            this.showMarsUnlockedNotification();
            return true;
        }
        return false;
    }

    switchToPlanet(planet) {
        if (planet === 'mars' && !this.gameState.marsUnlocked) {
            return;
        }

        this.gameState.currentPlanet = planet;
        
        // Update UI theme
        this.updateTheme(planet);
        
        // Update header text
        this.updateHeader(planet);
        
        // Re-render all content
        this.upgradeManager.renderUpgrades();
        this.autoClickerManager.renderAutoClickers();
        this.acUpgradeManager.renderUpgrades();
        
        // Update all stats
        this.ui.updateAll(this.gameState);
        
        // Update planet toggle button
        this.updatePlanetToggle();
    }

    updateTheme(planet) {
        const root = document.documentElement;
        
        if (planet === 'mars') {
            // Mars theme - Red/Orange tones
            root.style.setProperty('--primary-color', '#8b3a3a');
            root.style.setProperty('--secondary-color', '#c97e7e');
            root.style.setProperty('--accent-color', '#ff6b35');
            root.style.setProperty('--bg-color', '#2a1a1a');
            root.style.setProperty('--card-bg', '#3e1616');
        } else {
            // Earth theme - Green tones (original)
            root.style.setProperty('--primary-color', '#2c5f2d');
            root.style.setProperty('--secondary-color', '#97c97e');
            root.style.setProperty('--accent-color', '#ffd700');
            root.style.setProperty('--bg-color', '#1a1a2e');
            root.style.setProperty('--card-bg', '#16213e');
        }
    }

    updateHeader(planet) {
        const header = document.querySelector('.game-header h1');
        const disclaimer = document.querySelector('.disclaimer');
        
        if (planet === 'mars') {
            header.innerHTML = '🚀 Mars Colony Tycoon 🚀';
            disclaimer.textContent = '⚠️ Educational Satire - Interplanetary Commerce! ⚠️';
            
            // Update stat labels
            document.querySelector('#money-display').parentElement.querySelector('h2').innerHTML = '🔴 Mars Credits';
            document.querySelector('#per-click-display').parentElement.querySelector('h2').innerHTML = '📈 Credits per Click';
            document.querySelector('#per-second-display').parentElement.querySelector('h2').innerHTML = '⏱️ Credits per Second';
            document.getElementById('main-clicker').querySelector('.clicker-text').textContent = 'Build Mars Empire';
            document.getElementById('main-clicker').querySelector('.clicker-icon').textContent = '🪐';
        } else {
            header.innerHTML = '🏦 Tax Fraud Clicker 🏦';
            disclaimer.textContent = '⚠️ Educational Satire - Don\'t Actually Commit Tax Fraud! ⚠️';
            
            // Update stat labels
            document.querySelector('#money-display').parentElement.querySelector('h2').innerHTML = '💰 Hidden Money';
            document.querySelector('#per-click-display').parentElement.querySelector('h2').innerHTML = '📈 Money per Click';
            document.querySelector('#per-second-display').parentElement.querySelector('h2').innerHTML = '⏱️ Money per Second';
            document.getElementById('main-clicker').querySelector('.clicker-text').textContent = 'Hide Money from IRS';
            document.getElementById('main-clicker').querySelector('.clicker-icon').textContent = '🏛️';
        }
    }

    updatePlanetToggle() {
        let toggleButton = document.getElementById('planet-toggle');
        
        if (!toggleButton && this.gameState.marsUnlocked) {
            // Create the toggle button if Mars is unlocked
            toggleButton = document.createElement('button');
            toggleButton.id = 'planet-toggle';
            toggleButton.className = 'planet-toggle-button';
            
            const statsSection = document.querySelector('.stats-section');
            statsSection.parentElement.insertBefore(toggleButton, statsSection);
        }
        
        if (toggleButton) {
            if (this.gameState.currentPlanet === 'earth') {
                toggleButton.innerHTML = `
                    <span class="planet-icon">🚀</span>
                    <span class="planet-text">Travel to Mars</span>
                `;
            } else {
                toggleButton.innerHTML = `
                    <span class="planet-icon">🌍</span>
                    <span class="planet-text">Return to Earth</span>
                `;
            }
        }
    }

    showMarsUnlockedNotification() {
        // Create a special notification for Mars unlock
        const notification = document.createElement('div');
        notification.className = 'mars-unlock-notification';
        notification.innerHTML = `
            <div class="unlock-header">🎉 MARS UNLOCKED! 🎉</div>
            <div class="unlock-body">
                <div class="unlock-icon">🚀🪐</div>
                <div class="unlock-info">
                    <div class="unlock-message">You've launched to Mars!</div>
                    <div class="unlock-description">A whole new world of opportunities awaits!</div>
                    <div class="unlock-hint">Use the planet toggle to switch between Earth and Mars</div>
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

    checkAndShowLaunchOption() {
        if (!this.gameState.marsUnlocked && this.gameState.money >= this.marsLaunchCost * 0.5) {
            // Show launch option when player has 50% of cost
            let launchButton = document.getElementById('mars-launch-button');
            
            if (!launchButton) {
                launchButton = document.createElement('button');
                launchButton.id = 'mars-launch-button';
                launchButton.className = 'mars-launch-button';
                
                const canAfford = this.gameState.money >= this.marsLaunchCost;
                launchButton.innerHTML = `
                    <span class="launch-icon">🚀</span>
                    <span class="launch-text">Launch to Mars!</span>
                    <span class="launch-cost">💰 ${this.ui.formatNumber(this.marsLaunchCost)}</span>
                `;
                launchButton.disabled = !canAfford;
                
                const clickerSection = document.querySelector('.clicker-section');
                clickerSection.appendChild(launchButton);
                
                launchButton.addEventListener('click', () => {
                    if (this.launchToMars()) {
                        launchButton.remove();
                    }
                });
            } else {
                const canAfford = this.gameState.money >= this.marsLaunchCost;
                launchButton.disabled = !canAfford;
                if (canAfford) {
                    launchButton.classList.add('can-afford');
                } else {
                    launchButton.classList.remove('can-afford');
                }
            }
        }
    }
}
