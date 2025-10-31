export class GameState {
    constructor() {
        // Global state
        this.currentPlanet = 'earth';
        this.unlockedPlanets = new Set(['earth']); // Earth is always unlocked
        this.unlockedAchievements = new Set();
        
        // Planet-specific states stored in a map
        this.planetStates = {};
        
        // Initialize Earth
        this.initializePlanetState('earth');
        
        // Legacy compatibility - keep old Mars unlock flag
        this.marsUnlocked = false;
    }
    
    initializePlanetState(planetId) {
        if (this.planetStates[planetId]) return; // Already initialized
        
        this.planetStates[planetId] = {
            currency: 0,
            currencyPerClick: 1,
            currencyPerSecond: 0,
            totalClicks: 0,
            totalCurrencyEarned: 0,
            purchasedUpgrades: new Set(),
            autoClickers: new Map(),
            purchasedAutoClickerUpgrades: new Set(),
            autoClickerMultiplier: 1,
            timesJailed: 0
        };
    }
    
    getCurrentPlanetState() {
        if (!this.planetStates[this.currentPlanet]) {
            this.initializePlanetState(this.currentPlanet);
        }
        return this.planetStates[this.currentPlanet];
    }
    
    getPlanetState(planetId) {
        if (!this.planetStates[planetId]) {
            this.initializePlanetState(planetId);
        }
        return this.planetStates[planetId];
    }
    
    // Convenience getters for backward compatibility
    get money() { return this.getCurrentPlanetState().currency; }
    set money(val) { this.getCurrentPlanetState().currency = val; }
    
    get moneyPerClick() { return this.getCurrentPlanetState().currencyPerClick; }
    set moneyPerClick(val) { this.getCurrentPlanetState().currencyPerClick = val; }
    
    get moneyPerSecond() { return this.getCurrentPlanetState().currencyPerSecond; }
    set moneyPerSecond(val) { this.getCurrentPlanetState().currencyPerSecond = val; }
    
    get totalClicks() { return this.getCurrentPlanetState().totalClicks; }
    set totalClicks(val) { this.getCurrentPlanetState().totalClicks = val; }
    
    get totalMoneyEarned() { return this.getCurrentPlanetState().totalCurrencyEarned; }
    set totalMoneyEarned(val) { this.getCurrentPlanetState().totalCurrencyEarned = val; }
    
    get purchasedUpgrades() { return this.getCurrentPlanetState().purchasedUpgrades; }
    get autoClickers() { return this.getCurrentPlanetState().autoClickers; }
    get purchasedAutoClickerUpgrades() { return this.getCurrentPlanetState().purchasedAutoClickerUpgrades; }
    
    get autoClickerMultiplier() { return this.getCurrentPlanetState().autoClickerMultiplier; }
    set autoClickerMultiplier(val) { this.getCurrentPlanetState().autoClickerMultiplier = val; }
    
    get timesJailed() { 
        const state = this.getCurrentPlanetState();
        return state ? state.timesJailed : 0;
    }
    set timesJailed(val) { 
        const state = this.getCurrentPlanetState();
        if (state) state.timesJailed = val;
    }
    
    // Mars-specific getters for backward compatibility
    get marsCredits() { return this.getPlanetState('mars').currency; }
    set marsCredits(val) { this.getPlanetState('mars').currency = val; }
    
    get marsCreditsPerClick() { return this.getPlanetState('mars').currencyPerClick; }
    set marsCreditsPerClick(val) { this.getPlanetState('mars').currencyPerClick = val; }
    
    get marsCreditsPerSecond() { return this.getPlanetState('mars').currencyPerSecond; }
    set marsCreditsPerSecond(val) { this.getPlanetState('mars').currencyPerSecond = val; }
    
    get marsTotalClicks() { return this.getPlanetState('mars').totalClicks; }
    set marsTotalClicks(val) { this.getPlanetState('mars').totalClicks = val; }
    
    get marsTotalCreditsEarned() { return this.getPlanetState('mars').totalCurrencyEarned; }
    set marsTotalCreditsEarned(val) { this.getPlanetState('mars').totalCurrencyEarned = val; }
    
    get marsPurchasedUpgrades() { return this.getPlanetState('mars').purchasedUpgrades; }
    get marsAutoClickers() { return this.getPlanetState('mars').autoClickers; }
    get marsPurchasedAutoClickerUpgrades() { return this.getPlanetState('mars').purchasedAutoClickerUpgrades; }
    
    get marsAutoClickerMultiplier() { return this.getPlanetState('mars').autoClickerMultiplier; }
    set marsAutoClickerMultiplier(val) { this.getPlanetState('mars').autoClickerMultiplier = val; }
    
    get marsTimesJailed() { return this.getPlanetState('mars').timesJailed; }
    set marsTimesJailed(val) { this.getPlanetState('mars').timesJailed = val; }
    
    // Generic planet methods
    getPlanetCurrency(planetId) {
        return this.getPlanetState(planetId).currency;
    }
    
    setPlanetCurrency(planetId, amount) {
        this.getPlanetState(planetId).currency = amount;
    }

    addMoney(amount) {
        const state = this.getCurrentPlanetState();
        state.currency += amount;
        state.totalCurrencyEarned += amount;
    }

    spendMoney(amount) {
        const state = this.getCurrentPlanetState();
        if (state.currency >= amount) {
            state.currency -= amount;
            return true;
        }
        return false;
    }

    canAfford(amount) {
        return this.getCurrentPlanetState().currency >= amount;
    }

    increaseMoneyPerClick(amount) {
        this.getCurrentPlanetState().currencyPerClick += amount;
    }

    increaseMoneyPerSecond(amount) {
        const state = this.getCurrentPlanetState();
        state.currencyPerSecond += amount * state.autoClickerMultiplier;
    }

    multiplyAutoClickerEfficiency(multiplier) {
        const state = this.getCurrentPlanetState();
        const oldMultiplier = state.autoClickerMultiplier;
        state.autoClickerMultiplier *= multiplier;
        const ratio = state.autoClickerMultiplier / oldMultiplier;
        state.currencyPerSecond *= ratio;
    }

    purchaseAutoClickerUpgrade(upgradeId) {
        this.getCurrentPlanetState().purchasedAutoClickerUpgrades.add(upgradeId);
    }

    hasAutoClickerUpgrade(upgradeId) {
        return this.getCurrentPlanetState().purchasedAutoClickerUpgrades.has(upgradeId);
    }

    purchaseUpgrade(upgradeId) {
        this.getCurrentPlanetState().purchasedUpgrades.add(upgradeId);
    }

    hasUpgrade(upgradeId) {
        return this.getCurrentPlanetState().purchasedUpgrades.has(upgradeId);
    }

    addAutoClicker(autoClickerId) {
        const state = this.getCurrentPlanetState();
        const current = state.autoClickers.get(autoClickerId) || 0;
        state.autoClickers.set(autoClickerId, current + 1);
    }

    getAutoClickerCount(autoClickerId) {
        return this.getCurrentPlanetState().autoClickers.get(autoClickerId) || 0;
    }

    incrementClicks() {
        this.getCurrentPlanetState().totalClicks++;
    }

    toJSON() {
        const planetStatesJSON = {};
        for (const [planetId, state] of Object.entries(this.planetStates)) {
            planetStatesJSON[planetId] = {
                currency: state.currency,
                currencyPerClick: state.currencyPerClick,
                currencyPerSecond: state.currencyPerSecond,
                totalClicks: state.totalClicks,
                totalCurrencyEarned: state.totalCurrencyEarned,
                purchasedUpgrades: Array.from(state.purchasedUpgrades),
                autoClickers: Array.from(state.autoClickers.entries()),
                purchasedAutoClickerUpgrades: Array.from(state.purchasedAutoClickerUpgrades),
                autoClickerMultiplier: state.autoClickerMultiplier,
                timesJailed: state.timesJailed
            };
        }
        
        return {
            currentPlanet: this.currentPlanet,
            unlockedPlanets: Array.from(this.unlockedPlanets),
            unlockedAchievements: Array.from(this.unlockedAchievements),
            planetStates: planetStatesJSON,
            // Legacy compatibility
            marsUnlocked: this.unlockedPlanets.has('mars')
        };
    }

    fromJSON(data) {
        this.currentPlanet = data.currentPlanet || 'earth';
        this.unlockedPlanets = new Set(data.unlockedPlanets || ['earth']);
        this.unlockedAchievements = new Set(data.unlockedAchievements || []);
        
        // Load planet states
        this.planetStates = {};
        if (data.planetStates) {
            for (const [planetId, stateData] of Object.entries(data.planetStates)) {
                this.planetStates[planetId] = {
                    currency: stateData.currency || 0,
                    currencyPerClick: stateData.currencyPerClick || 1,
                    currencyPerSecond: stateData.currencyPerSecond || 0,
                    totalClicks: stateData.totalClicks || 0,
                    totalCurrencyEarned: stateData.totalCurrencyEarned || 0,
                    purchasedUpgrades: new Set(stateData.purchasedUpgrades || []),
                    autoClickers: new Map(stateData.autoClickers || []),
                    purchasedAutoClickerUpgrades: new Set(stateData.purchasedAutoClickerUpgrades || []),
                    autoClickerMultiplier: stateData.autoClickerMultiplier || 1,
                    timesJailed: stateData.timesJailed || 0
                };
            }
        }
        
        // Legacy support - convert old save format
        if (data.money !== undefined && !this.planetStates['earth']) {
            this.initializePlanetState('earth');
            const earthState = this.planetStates['earth'];
            earthState.currency = data.money || 0;
            earthState.currencyPerClick = data.moneyPerClick || 1;
            earthState.currencyPerSecond = data.moneyPerSecond || 0;
            earthState.totalClicks = data.totalClicks || 0;
            earthState.totalCurrencyEarned = data.totalMoneyEarned || 0;
            earthState.purchasedUpgrades = new Set(data.purchasedUpgrades || []);
            earthState.autoClickers = new Map(data.autoClickers || []);
            earthState.purchasedAutoClickerUpgrades = new Set(data.purchasedAutoClickerUpgrades || []);
            earthState.autoClickerMultiplier = data.autoClickerMultiplier || 1;
            earthState.timesJailed = data.timesJailed || 0;
        }
        
        if (data.marsCredits !== undefined && !this.planetStates['mars']) {
            this.initializePlanetState('mars');
            const marsState = this.planetStates['mars'];
            marsState.currency = data.marsCredits || 0;
            marsState.currencyPerClick = data.marsCreditsPerClick || 1;
            marsState.currencyPerSecond = data.marsCreditsPerSecond || 0;
            marsState.totalClicks = data.marsTotalClicks || 0;
            marsState.totalCurrencyEarned = data.marsTotalCreditsEarned || 0;
            marsState.purchasedUpgrades = new Set(data.marsPurchasedUpgrades || []);
            marsState.autoClickers = new Map(data.marsAutoClickers || []);
            marsState.purchasedAutoClickerUpgrades = new Set(data.marsPurchasedAutoClickerUpgrades || []);
            marsState.autoClickerMultiplier = data.marsAutoClickerMultiplier || 1;
            marsState.timesJailed = data.marsTimesJailed || 0;
            
            if (data.marsUnlocked) {
                this.unlockedPlanets.add('mars');
            }
        }
        
        // Ensure Earth is always initialized
        if (!this.planetStates['earth']) {
            this.initializePlanetState('earth');
        }
        
        // Legacy marsUnlocked flag
        this.marsUnlocked = this.unlockedPlanets.has('mars');
    }
}
