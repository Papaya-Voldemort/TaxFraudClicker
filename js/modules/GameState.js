export class GameState {
    constructor() {
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
    }

    addMoney(amount) {
        this.money += amount;
        this.totalMoneyEarned += amount;
    }

    spendMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            return true;
        }
        return false;
    }

    canAfford(amount) {
        return this.money >= amount;
    }

    increaseMoneyPerClick(amount) {
        this.moneyPerClick += amount;
    }

    increaseMoneyPerSecond(amount) {
        this.moneyPerSecond += amount * this.autoClickerMultiplier;
    }

    multiplyAutoClickerEfficiency(multiplier) {
        // Recalculate moneyPerSecond based on new multiplier
        const oldMultiplier = this.autoClickerMultiplier;
        this.autoClickerMultiplier *= multiplier;
        const ratio = this.autoClickerMultiplier / oldMultiplier;
        this.moneyPerSecond *= ratio;
    }

    purchaseAutoClickerUpgrade(upgradeId) {
        this.purchasedAutoClickerUpgrades.add(upgradeId);
    }

    hasAutoClickerUpgrade(upgradeId) {
        return this.purchasedAutoClickerUpgrades.has(upgradeId);
    }

    purchaseUpgrade(upgradeId) {
        this.purchasedUpgrades.add(upgradeId);
    }

    hasUpgrade(upgradeId) {
        return this.purchasedUpgrades.has(upgradeId);
    }

    addAutoClicker(autoClickerId) {
        const current = this.autoClickers.get(autoClickerId) || 0;
        this.autoClickers.set(autoClickerId, current + 1);
    }

    getAutoClickerCount(autoClickerId) {
        return this.autoClickers.get(autoClickerId) || 0;
    }

    incrementClicks() {
        this.totalClicks++;
    }

    toJSON() {
        return {
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
            timesJailed: this.timesJailed
        };
    }

    fromJSON(data) {
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
    }
}
