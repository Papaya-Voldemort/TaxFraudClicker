export class GameState {
    constructor() {
        // Earth resources
        this.money = 0;
        this.moneyPerClick = 1;
        this.moneyPerSecond = 0;
        this.totalClicks = 0;
        this.totalMoneyEarned = 0;
        this.purchasedUpgrades = new Set();
        this.autoClickers = new Map(); // Map of autoClickerId -> count
        this.purchasedAutoClickerUpgrades = new Set();
        this.autoClickerMultiplier = 1;
        this.unlockedAchievements = new Set();
        this.timesJailed = 0;
        
        // Mars resources
        this.marsUnlocked = false;
        this.currentPlanet = 'earth'; // 'earth' or 'mars'
        this.marsCredits = 0;
        this.marsCreditsPerClick = 1;
        this.marsCreditsPerSecond = 0;
        this.marsTotalClicks = 0;
        this.marsTotalCreditsEarned = 0;
        this.marsPurchasedUpgrades = new Set();
        this.marsAutoClickers = new Map();
        this.marsPurchasedAutoClickerUpgrades = new Set();
        this.marsAutoClickerMultiplier = 1;
        this.marsTimesJailed = 0;
    }

    addMoney(amount) {
        if (this.currentPlanet === 'earth') {
            this.money += amount;
            this.totalMoneyEarned += amount;
        } else {
            this.marsCredits += amount;
            this.marsTotalCreditsEarned += amount;
        }
    }

    spendMoney(amount) {
        if (this.currentPlanet === 'earth') {
            if (this.money >= amount) {
                this.money -= amount;
                return true;
            }
        } else {
            if (this.marsCredits >= amount) {
                this.marsCredits -= amount;
                return true;
            }
        }
        return false;
    }

    canAfford(amount) {
        if (this.currentPlanet === 'earth') {
            return this.money >= amount;
        } else {
            return this.marsCredits >= amount;
        }
    }

    increaseMoneyPerClick(amount) {
        if (this.currentPlanet === 'earth') {
            this.moneyPerClick += amount;
        } else {
            this.marsCreditsPerClick += amount;
        }
    }

    increaseMoneyPerSecond(amount) {
        if (this.currentPlanet === 'earth') {
            this.moneyPerSecond += amount * this.autoClickerMultiplier;
        } else {
            this.marsCreditsPerSecond += amount * this.marsAutoClickerMultiplier;
        }
    }

    multiplyAutoClickerEfficiency(multiplier) {
        if (this.currentPlanet === 'earth') {
            // Recalculate moneyPerSecond based on new multiplier
            const oldMultiplier = this.autoClickerMultiplier;
            this.autoClickerMultiplier *= multiplier;
            const ratio = this.autoClickerMultiplier / oldMultiplier;
            this.moneyPerSecond *= ratio;
        } else {
            // Recalculate marsCreditsPerSecond based on new multiplier
            const oldMultiplier = this.marsAutoClickerMultiplier;
            this.marsAutoClickerMultiplier *= multiplier;
            const ratio = this.marsAutoClickerMultiplier / oldMultiplier;
            this.marsCreditsPerSecond *= ratio;
        }
    }

    purchaseAutoClickerUpgrade(upgradeId) {
        if (this.currentPlanet === 'earth') {
            this.purchasedAutoClickerUpgrades.add(upgradeId);
        } else {
            this.marsPurchasedAutoClickerUpgrades.add(upgradeId);
        }
    }

    hasAutoClickerUpgrade(upgradeId) {
        if (this.currentPlanet === 'earth') {
            return this.purchasedAutoClickerUpgrades.has(upgradeId);
        } else {
            return this.marsPurchasedAutoClickerUpgrades.has(upgradeId);
        }
    }

    purchaseUpgrade(upgradeId) {
        if (this.currentPlanet === 'earth') {
            this.purchasedUpgrades.add(upgradeId);
        } else {
            this.marsPurchasedUpgrades.add(upgradeId);
        }
    }

    hasUpgrade(upgradeId) {
        if (this.currentPlanet === 'earth') {
            return this.purchasedUpgrades.has(upgradeId);
        } else {
            return this.marsPurchasedUpgrades.has(upgradeId);
        }
    }

    addAutoClicker(autoClickerId) {
        if (this.currentPlanet === 'earth') {
            const current = this.autoClickers.get(autoClickerId) || 0;
            this.autoClickers.set(autoClickerId, current + 1);
        } else {
            const current = this.marsAutoClickers.get(autoClickerId) || 0;
            this.marsAutoClickers.set(autoClickerId, current + 1);
        }
    }

    getAutoClickerCount(autoClickerId) {
        if (this.currentPlanet === 'earth') {
            return this.autoClickers.get(autoClickerId) || 0;
        } else {
            return this.marsAutoClickers.get(autoClickerId) || 0;
        }
    }

    incrementClicks() {
        if (this.currentPlanet === 'earth') {
            this.totalClicks++;
        } else {
            this.marsTotalClicks++;
        }
    }

    toJSON() {
        return {
            // Earth
            money: this.money,
            moneyPerClick: this.moneyPerClick,
            moneyPerSecond: this.moneyPerSecond,
            totalClicks: this.totalClicks,
            totalMoneyEarned: this.totalMoneyEarned,
            purchasedUpgrades: Array.from(this.purchasedUpgrades),
            autoClickers: Array.from(this.autoClickers.entries()),
            purchasedAutoClickerUpgrades: Array.from(this.purchasedAutoClickerUpgrades),
            autoClickerMultiplier: this.autoClickerMultiplier,
            unlockedAchievements: Array.from(this.unlockedAchievements),
            timesJailed: this.timesJailed,
            // Mars
            marsUnlocked: this.marsUnlocked,
            currentPlanet: this.currentPlanet,
            marsCredits: this.marsCredits,
            marsCreditsPerClick: this.marsCreditsPerClick,
            marsCreditsPerSecond: this.marsCreditsPerSecond,
            marsTotalClicks: this.marsTotalClicks,
            marsTotalCreditsEarned: this.marsTotalCreditsEarned,
            marsPurchasedUpgrades: Array.from(this.marsPurchasedUpgrades),
            marsAutoClickers: Array.from(this.marsAutoClickers.entries()),
            marsPurchasedAutoClickerUpgrades: Array.from(this.marsPurchasedAutoClickerUpgrades),
            marsAutoClickerMultiplier: this.marsAutoClickerMultiplier,
            marsTimesJailed: this.marsTimesJailed
        };
    }

    fromJSON(data) {
        // Earth
        this.money = data.money || 0;
        this.moneyPerClick = data.moneyPerClick || 1;
        this.moneyPerSecond = data.moneyPerSecond || 0;
        this.totalClicks = data.totalClicks || 0;
        this.totalMoneyEarned = data.totalMoneyEarned || 0;
        this.purchasedUpgrades = new Set(data.purchasedUpgrades || []);
        this.autoClickers = new Map(data.autoClickers || []);
        this.purchasedAutoClickerUpgrades = new Set(data.purchasedAutoClickerUpgrades || []);
        this.autoClickerMultiplier = data.autoClickerMultiplier || 1;
        this.unlockedAchievements = new Set(data.unlockedAchievements || []);
        this.timesJailed = data.timesJailed || 0;
        // Mars
        this.marsUnlocked = data.marsUnlocked || false;
        this.currentPlanet = data.currentPlanet || 'earth';
        this.marsCredits = data.marsCredits || 0;
        this.marsCreditsPerClick = data.marsCreditsPerClick || 1;
        this.marsCreditsPerSecond = data.marsCreditsPerSecond || 0;
        this.marsTotalClicks = data.marsTotalClicks || 0;
        this.marsTotalCreditsEarned = data.marsTotalCreditsEarned || 0;
        this.marsPurchasedUpgrades = new Set(data.marsPurchasedUpgrades || []);
        this.marsAutoClickers = new Map(data.marsAutoClickers || []);
        this.marsPurchasedAutoClickerUpgrades = new Set(data.marsPurchasedAutoClickerUpgrades || []);
        this.marsAutoClickerMultiplier = data.marsAutoClickerMultiplier || 1;
        this.marsTimesJailed = data.marsTimesJailed || 0;
    }
}
