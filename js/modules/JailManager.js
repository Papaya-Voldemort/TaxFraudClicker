import { jailUpgradesData, jailAutoClickersData } from '../data/jailData.js';

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
        this.purchasedJailUpgrades = new Set();
        this.jailAutoClickerCounts = new Map();
        this.lastCheckTime = Date.now();
        this.releaseNotificationShowing = false;
    }

    checkIRSDetection() {
        if (this.isInJail) return;
        
        const currentTime = Date.now();
        if (currentTime - this.lastCheckTime < 1000) return; // Check once per second
        this.lastCheckTime = currentTime;

        const money = this.gameState.money;
        
        // Calculate detection chance based on money (0.001% per $1000, 100x rarer)
        // Starts at 0.001% at $1000, increases slowly
        let detectionChance = (money / 1000) * 0.00001;
        
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

    sendToJail() {
        if (this.isInJail) return;
        
        this.isInJail = true;
        this.timesJailed++;
        this.gameState.timesJailed = this.timesJailed;
        
        // Unlock first bust achievement
        if (this.timesJailed === 1 && window.game && window.game.achievementManager) {
            window.game.achievementManager.manualUnlock('first_bust');
        }
        
        // Confiscate all money
        const confiscatedMoney = this.gameState.money;
        this.gameState.money = 0;
        
        // Calculate freedom needed (increases each time, starts at 500)
        this.freedomNeeded = 500 * Math.pow(2, this.timesJailed - 1);
        
        // Reset jail progress
        this.freedom = 0;
        this.freedomPerClick = 1;
        this.freedomPerSecond = 0;
        this.purchasedJailUpgrades.clear();
        this.jailAutoClickerCounts.clear();
        
        // Show IRS bust notification
        this.showBustNotification(confiscatedMoney);
        
        // Transition to jail UI
        setTimeout(() => {
            this.showJailUI();
        }, 2000);
    }

    showBustNotification(confiscatedMoney) {
        const notification = document.createElement('div');
        notification.className = 'irs-bust-notification';
        notification.innerHTML = `
            <div class="bust-header">🚨 IRS RAID! 🚨</div>
            <div class="bust-body">
                <div class="bust-icon">👮‍♂️</div>
                <div class="bust-info">
                    <div class="bust-message">You've been caught!</div>
                    <div class="bust-confiscated">Confiscated: $${this.ui.formatNumber(confiscatedMoney)}</div>
                    <div class="bust-sentence">Sentence: ${Math.ceil(this.freedomNeeded)} freedom points to earn</div>
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

    showJailUI() {
        const mainGame = document.getElementById('main-game');
        const jailGame = document.getElementById('jail-game');
        
        mainGame.classList.add('transitioning-out');
        
        setTimeout(() => {
            mainGame.style.display = 'none';
            jailGame.style.display = 'block';
            
            // Initialize jail UI
            this.renderJailUpgrades();
            this.renderJailAutoClickers();
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
        document.getElementById('jail-times-jailed').textContent = this.timesJailed;
        
        // Update progress bar
        const percentage = Math.min((this.freedom / this.freedomNeeded) * 100, 100);
        document.getElementById('jail-progress-bar').style.width = percentage + '%';
    }

    renderJailUpgrades() {
        const container = document.getElementById('jail-upgrades-container');
        container.innerHTML = '';
        
        this.jailUpgrades.forEach(upgrade => {
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

    renderJailAutoClickers() {
        const container = document.getElementById('jail-auto-clickers-container');
        container.innerHTML = '';
        
        this.jailAutoClickers.forEach(autoClicker => {
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
