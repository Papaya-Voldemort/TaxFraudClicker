import { jailUpgradesData, jailAutoClickersData } from '../data/jailData.js';
import { marsJailUpgradesData, marsJailAutoClickersData } from '../data/marsData.js';

export class JailManager {
    constructor(gameState, ui) {
        this.gameState = gameState;
        this.ui = ui;
        this.isInJail = false;
        this.timesJailed = 0;
        this.freedom = 0;
        this.freedomPerClick = 1;
        this.freedomPerSecond = 0;
        this.freedomNeeded = 500; // Much higher base requirement
        this.jailUpgrades = jailUpgradesData;
        this.jailAutoClickers = jailAutoClickersData;
        this.marsJailUpgrades = marsJailUpgradesData;
        this.marsJailAutoClickers = marsJailAutoClickersData;
        this.purchasedJailUpgrades = new Set();
        this.jailAutoClickerCounts = new Map();
        this.lastCheckTime = Date.now();
        this.releaseNotificationShowing = false;
    }

    checkIRSDetection() {
        if (this.isInJail) return;
        
        // Only check on Earth - Mars has different detection
        if (this.gameState.currentPlanet === 'mars') {
            this.checkMarsAuthorityDetection();
            return;
        }
        
        const currentTime = Date.now();
        if (currentTime - this.lastCheckTime < 1000) return; // Check once per second
        this.lastCheckTime = currentTime;

        const money = this.gameState.money;
        
        // Calculate detection chance based on money (0.001% per $1000, 100x rarer)
        // Starts at 0.001% at $1000, increases slowly
        let detectionChance = (money / 100) * 0.00001;
        
        // Add bonus risk for very high amounts (gets slightly more common)
        if (money > 100000) {
            detectionChance += (money / 100000) * 0.00002;
        }
        
        // Cap at 0.1% per check (still very rare)
        detectionChance = Math.min(detectionChance, 0.001);
        
        if (Math.random() < detectionChance) {
            this.sendToJail();
        }
    }

    checkMarsAuthorityDetection() {
        const currentTime = Date.now();
        if (currentTime - this.lastCheckTime < 1000) return;
        this.lastCheckTime = currentTime;

        const credits = this.gameState.marsCredits;
        
        // Mars has stricter enforcement - frontier law
        let detectionChance = (credits / 50) * 0.00002; // Twice as likely
        
        if (credits > 50000) {
            detectionChance += (credits / 50000) * 0.00004;
        }
        
        detectionChance = Math.min(detectionChance, 0.002); // 2x cap
        
        if (Math.random() < detectionChance) {
            this.sendToJail();
        }
    }

    sendToJail() {
        if (this.isInJail) return;
        
        this.isInJail = true;
        const onMars = this.gameState.currentPlanet === 'mars';
        
        // Track jail counts separately per planet
        if (onMars) {
            this.gameState.marsTimesJailed++;
        } else {
            this.timesJailed++;
            this.gameState.timesJailed = this.timesJailed;
        }
        
        // Get the appropriate jail count for this planet
        const currentJailCount = onMars ? this.gameState.marsTimesJailed : this.timesJailed;
        
        // Unlock first bust achievement (only for Earth)
        if (!onMars && this.timesJailed === 1 && window.game && window.game.achievementManager) {
            window.game.achievementManager.manualUnlock('first_bust');
        }
        
        // Confiscate all money/credits
        let confiscated;
        if (onMars) {
            confiscated = this.gameState.marsCredits;
            this.gameState.marsCredits = 0;
        } else {
            confiscated = this.gameState.money;
            this.gameState.money = 0;
        }
        
        // Calculate freedom needed (increases each time, starts at 500)
        // Use planet-specific jail count for fair progression
        this.freedomNeeded = 500 * Math.pow(2, currentJailCount - 1);
        
        // Reset jail progress
        this.freedom = 0;
        this.freedomPerClick = 1;
        this.freedomPerSecond = 0;
        this.purchasedJailUpgrades.clear();
        this.jailAutoClickerCounts.clear();
        
        // Show bust notification
        this.showBustNotification(confiscated, onMars);
        
        // Transition to jail UI
        setTimeout(() => {
            this.showJailUI(onMars);
        }, 2000);
    }

    showBustNotification(confiscatedAmount, onMars) {
        const notification = document.createElement('div');
        notification.className = onMars ? 'mars-bust-notification' : 'irs-bust-notification';
        
        if (onMars) {
            notification.innerHTML = `
                <div class="bust-header">🚨 COLONY SECURITY RAID! 🚨</div>
                <div class="bust-body">
                    <div class="bust-icon">👮‍♀️🚀</div>
                    <div class="bust-info">
                        <div class="bust-message">Caught violating Mars commerce laws!</div>
                        <div class="bust-confiscated">Confiscated: 🔴 ${this.ui.formatNumber(confiscatedAmount)} credits</div>
                        <div class="bust-sentence">Detention: ${Math.ceil(this.freedomNeeded)} freedom points to earn</div>
                    </div>
                </div>
            `;
        } else {
            notification.innerHTML = `
                <div class="bust-header">🚨 IRS RAID! 🚨</div>
                <div class="bust-body">
                    <div class="bust-icon">👮‍♂️</div>
                    <div class="bust-info">
                        <div class="bust-message">You've been caught!</div>
                        <div class="bust-confiscated">Confiscated: $${this.ui.formatNumber(confiscatedAmount)}</div>
                        <div class="bust-sentence">Sentence: ${Math.ceil(this.freedomNeeded)} freedom points to earn</div>
                    </div>
                </div>
            `;
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    showJailUI(onMars = false) {
        const mainGame = document.getElementById('main-game');
        const jailGame = document.getElementById('jail-game');
        
        // Update jail header for Mars
        if (onMars) {
            const jailHeader = jailGame.querySelector('.jail-header h1');
            const jailDisclaimer = jailGame.querySelector('.jail-disclaimer');
            jailHeader.innerHTML = '⛓️ MARS COLONY DETENTION ⛓️';
            jailDisclaimer.textContent = '🚨 Violating Mars commerce regulations! 🚨';
        } else {
            const jailHeader = jailGame.querySelector('.jail-header h1');
            const jailDisclaimer = jailGame.querySelector('.jail-disclaimer');
            jailHeader.innerHTML = '⛓️ FEDERAL PRISON ⛓️';
            jailDisclaimer.textContent = '🚨 You\'ve been caught by the IRS! 🚨';
        }
        
        mainGame.classList.add('transitioning-out');
        
        setTimeout(() => {
            mainGame.style.display = 'none';
            jailGame.style.display = 'block';
            
            // Initialize jail UI
            this.renderJailUpgrades(onMars);
            this.renderJailAutoClickers(onMars);
            this.updateJailUI();
            
            setTimeout(() => {
                jailGame.classList.add('transitioning-in');
            }, 50);
        }, 600);
    }

    hideJailUI() {
        const mainGame = document.getElementById('main-game');
        const jailGame = document.getElementById('jail-game');
        
        jailGame.classList.remove('transitioning-in');
        jailGame.classList.add('transitioning-out');
        
        setTimeout(() => {
            jailGame.style.display = 'none';
            jailGame.classList.remove('transitioning-out');
            mainGame.style.display = 'block';
            
            setTimeout(() => {
                mainGame.classList.remove('transitioning-out');
                mainGame.classList.add('transitioning-in');
            }, 50);
        }, 600);
    }

    handleJailClick() {
        this.freedom += this.freedomPerClick;
        this.updateJailUI();
        this.checkJailRelease();
    }

    generateJailPassiveIncome(deltaTime) {
        if (!this.isInJail) return;
        
        if (this.freedomPerSecond > 0) {
            this.freedom += this.freedomPerSecond * deltaTime;
            this.updateJailUI();
            this.checkJailRelease();
        }
    }

    checkJailRelease() {
        if (this.freedom >= this.freedomNeeded) {
            this.releaseFromJail();
        }
    }

    releaseFromJail() {
        if (this.releaseNotificationShowing) return; // Prevent multiple notifications
        
        this.isInJail = false;
        this.releaseNotificationShowing = true;
        
        // Show release notification
        this.showReleaseNotification();
        
        // Transition back to main game
        setTimeout(() => {
            this.hideJailUI();
            this.releaseNotificationShowing = false;
        }, 2000);
    }

    showReleaseNotification() {
        // Remove any existing release notifications
        const existing = document.querySelectorAll('.jail-release-notification');
        existing.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = 'jail-release-notification';
        notification.innerHTML = `
            <div class="release-header">🎉 RELEASED! 🎉</div>
            <div class="release-body">
                <div class="release-icon">🆓</div>
                <div class="release-info">
                    <div class="release-message">You're free to commit more tax fraud!</div>
                    <div class="release-warning">Be more careful this time...</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    updateJailUI() {
        document.getElementById('jail-freedom-display').textContent = this.ui.formatNumber(Math.floor(this.freedom));
        document.getElementById('jail-freedom-needed').textContent = this.ui.formatNumber(Math.ceil(this.freedomNeeded));
        document.getElementById('jail-per-click-display').textContent = this.ui.formatNumber(this.freedomPerClick);
        document.getElementById('jail-per-second-display').textContent = this.ui.formatNumber(this.freedomPerSecond);
        
        // Show appropriate jail count based on current planet
        const onMars = this.gameState.currentPlanet === 'mars';
        const jailCount = onMars ? this.gameState.marsTimesJailed : this.timesJailed;
        document.getElementById('jail-times-jailed').textContent = jailCount;
        
        // Update progress bar
        const percentage = Math.min((this.freedom / this.freedomNeeded) * 100, 100);
        document.getElementById('jail-progress-bar').style.width = percentage + '%';
    }

    renderJailUpgrades(onMars = false) {
        const container = document.getElementById('jail-upgrades-container');
        container.innerHTML = '';
        
        const upgradesToShow = onMars ? this.marsJailUpgrades : this.jailUpgrades;
        
        upgradesToShow.forEach(upgrade => {
            const card = this.createJailUpgradeCard(upgrade);
            container.appendChild(card);
        });
    }

    createJailUpgradeCard(upgrade) {
        const card = document.createElement('div');
        const isPurchased = this.purchasedJailUpgrades.has(upgrade.id);
        
        card.className = 'jail-upgrade-card';
        card.innerHTML = `
            <div class="jail-upgrade-header">
                <span class="jail-upgrade-icon">${upgrade.icon}</span>
                <span class="jail-upgrade-name">${upgrade.name}</span>
            </div>
            <div class="jail-upgrade-description">${upgrade.description}</div>
            <div class="jail-upgrade-stats">
                <span class="jail-upgrade-cost">🆓 ${this.ui.formatNumber(upgrade.cost)}</span>
                <button class="jail-upgrade-button" data-upgrade-id="${upgrade.id}" ${isPurchased ? 'disabled' : ''}>
                    ${isPurchased ? 'Purchased' : 'Use'}
                </button>
            </div>
        `;
        
        return card;
    }

    purchaseJailUpgrade(upgradeId) {
        const upgrade = this.jailUpgrades.find(u => u.id === upgradeId);
        if (!upgrade || this.purchasedJailUpgrades.has(upgradeId)) return;
        
        if (this.freedom >= upgrade.cost) {
            this.freedom -= upgrade.cost;
            this.purchasedJailUpgrades.add(upgradeId);
            this.freedomPerClick += upgrade.effect.value;
            this.renderJailUpgrades();
            this.updateJailUI();
        }
    }

    renderJailAutoClickers(onMars = false) {
        const container = document.getElementById('jail-auto-clickers-container');
        container.innerHTML = '';
        
        const autoClickersToShow = onMars ? this.marsJailAutoClickers : this.jailAutoClickers;
        
        autoClickersToShow.forEach(autoClicker => {
            const card = this.createJailAutoClickerCard(autoClicker);
            container.appendChild(card);
        });
    }

    createJailAutoClickerCard(autoClicker) {
        const card = document.createElement('div');
        const count = this.jailAutoClickerCounts.get(autoClicker.id) || 0;
        const cost = Math.floor(autoClicker.baseCost * Math.pow(1.15, count));
        
        card.className = 'jail-auto-clicker-card';
        card.innerHTML = `
            <div class="jail-auto-clicker-header">
                <span class="jail-auto-clicker-icon">${autoClicker.icon}</span>
                <span class="jail-auto-clicker-name">${autoClicker.name}</span>
            </div>
            <div class="jail-auto-clicker-count">Owned: <span id="jail-count-${autoClicker.id}">${count}</span></div>
            <div class="jail-auto-clicker-description">${autoClicker.description}</div>
            <div class="jail-auto-clicker-stats">
                <span class="jail-auto-clicker-cost">🆓 <span id="jail-cost-${autoClicker.id}">${this.ui.formatNumber(cost)}</span></span>
                <button class="jail-auto-clicker-button" data-auto-clicker-id="${autoClicker.id}">
                    Hire (+${this.ui.formatNumber(autoClicker.freedomPerSecond)}/s)
                </button>
            </div>
        `;
        
        return card;
    }

    purchaseJailAutoClicker(autoClickerId) {
        const autoClicker = this.jailAutoClickers.find(ac => ac.id === autoClickerId);
        if (!autoClicker) return;
        
        const count = this.jailAutoClickerCounts.get(autoClickerId) || 0;
        const cost = Math.floor(autoClicker.baseCost * Math.pow(1.15, count));
        
        if (this.freedom >= cost) {
            this.freedom -= cost;
            this.jailAutoClickerCounts.set(autoClickerId, count + 1);
            this.freedomPerSecond += autoClicker.freedomPerSecond;
            this.renderJailAutoClickers();
            this.updateJailUI();
        }
    }

    toJSON() {
        return {
            timesJailed: this.timesJailed,
            isInJail: this.isInJail,
            freedom: this.freedom,
            freedomPerClick: this.freedomPerClick,
            freedomPerSecond: this.freedomPerSecond,
            freedomNeeded: this.freedomNeeded,
            purchasedJailUpgrades: Array.from(this.purchasedJailUpgrades),
            jailAutoClickerCounts: Array.from(this.jailAutoClickerCounts.entries()),
            releaseNotificationShowing: false
        };
    }

    fromJSON(data) {
        this.timesJailed = data.timesJailed || 0;
        this.isInJail = data.isInJail || false;
        this.freedom = data.freedom || 0;
        this.freedomPerClick = data.freedomPerClick || 1;
        this.freedomPerSecond = data.freedomPerSecond || 0;
        this.freedomNeeded = data.freedomNeeded || 500;
        this.purchasedJailUpgrades = new Set(data.purchasedJailUpgrades || []);
        this.jailAutoClickerCounts = new Map(data.jailAutoClickerCounts || []);
        this.releaseNotificationShowing = false;
        
        if (this.isInJail) {
            setTimeout(() => this.showJailUI(), 100);
        }
    }
}
