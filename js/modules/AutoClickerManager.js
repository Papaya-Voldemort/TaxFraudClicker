import { autoClickersData } from '../data/autoClickers.js';

export class AutoClickerManager {
    constructor(gameState, ui) {
        this.gameState = gameState;
        this.ui = ui;
        this.autoClickers = autoClickersData;
        this.autoClickerElements = new Map();
    }

    renderAutoClickers() {
        const container = document.getElementById('auto-clickers-container');
        container.innerHTML = '';

        this.autoClickers.forEach(autoClicker => {
            const card = this.createAutoClickerCard(autoClicker);
            container.appendChild(card);
            this.autoClickerElements.set(autoClicker.id, card);
        });
    }

    createAutoClickerCard(autoClicker) {
        const card = document.createElement('div');
        card.className = 'auto-clicker-card';
        
        const count = this.gameState.getAutoClickerCount(autoClicker.id);
        const currentCost = this.calculateCost(autoClicker.baseCost, count);
        
        card.innerHTML = `
            <div class="auto-clicker-header">
                <span class="auto-clicker-icon">${autoClicker.icon}</span>
                <span class="auto-clicker-name">${autoClicker.name}</span>
            </div>
            <div class="auto-clicker-count">Owned: <span id="count-${autoClicker.id}">${count}</span></div>
            <div class="auto-clicker-description">${autoClicker.description}</div>
            <div class="auto-clicker-stats">
                <span class="auto-clicker-cost">💰 <span id="cost-${autoClicker.id}">${this.ui.formatNumber(currentCost)}</span></span>
                <button class="auto-clicker-button" data-auto-clicker-id="${autoClicker.id}">
                    Buy (+${this.ui.formatNumber(autoClicker.moneyPerSecond)}/s)
                </button>
            </div>
        `;

        return card;
    }

    calculateCost(baseCost, count) {
        return Math.floor(baseCost * Math.pow(1.15, count));
    }

    purchaseAutoClicker(autoClickerId) {
        const autoClicker = this.autoClickers.find(ac => ac.id === autoClickerId);
        if (!autoClicker) return;

        const count = this.gameState.getAutoClickerCount(autoClickerId);
        const cost = this.calculateCost(autoClicker.baseCost, count);

        // Check if can afford
        if (!this.gameState.canAfford(cost)) {
            return;
        }

        // Purchase auto-clicker
        if (this.gameState.spendMoney(cost)) {
            this.gameState.addAutoClicker(autoClickerId);
            this.gameState.increaseMoneyPerSecond(autoClicker.moneyPerSecond);
            this.updateAutoClickerCard(autoClickerId);
        }
    }

    updateAutoClickerCard(autoClickerId) {
        const autoClicker = this.autoClickers.find(ac => ac.id === autoClickerId);
        if (!autoClicker) return;

        const count = this.gameState.getAutoClickerCount(autoClickerId);
        const currentCost = this.calculateCost(autoClicker.baseCost, count);

        const countElement = document.getElementById(`count-${autoClickerId}`);
        const costElement = document.getElementById(`cost-${autoClickerId}`);

        if (countElement) countElement.textContent = count;
        if (costElement) costElement.textContent = this.ui.formatNumber(currentCost);
    }

    updateAutoClickerButtons() {
        this.autoClickers.forEach(autoClicker => {
            const card = this.autoClickerElements.get(autoClicker.id);
            if (!card) return;

            const count = this.gameState.getAutoClickerCount(autoClicker.id);
            const cost = this.calculateCost(autoClicker.baseCost, count);
            const canAfford = this.gameState.canAfford(cost);
            
            const button = card.querySelector('.auto-clicker-button');
            this.ui.updateButtonState(button, canAfford);
            this.ui.updateCardAffordability(card, canAfford);
        });
    }

    generatePassiveIncome(deltaTime) {
        if (this.gameState.moneyPerSecond > 0) {
            const income = this.gameState.moneyPerSecond * deltaTime;
            this.gameState.addMoney(income);
        }
    }
}
