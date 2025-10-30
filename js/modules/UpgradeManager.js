import { upgradesData } from '../data/upgrades.js';

export class UpgradeManager {
    constructor(gameState, ui) {
        this.gameState = gameState;
        this.ui = ui;
        this.upgrades = upgradesData;
        this.upgradeElements = new Map();
    }

    renderUpgrades() {
        const container = document.getElementById('upgrades-container');
        container.innerHTML = '';

        this.upgrades.forEach(upgrade => {
            const card = this.createUpgradeCard(upgrade);
            container.appendChild(card);
            this.upgradeElements.set(upgrade.id, card);
        });
    }

    createUpgradeCard(upgrade) {
        const card = document.createElement('div');
        card.className = 'upgrade-card';
        
        const isPurchased = this.gameState.hasUpgrade(upgrade.id);
        
        card.innerHTML = `
            <div class="upgrade-header">
                <span class="upgrade-icon">${upgrade.icon}</span>
                <span class="upgrade-name">${upgrade.name}</span>
            </div>
            <div class="upgrade-description">${upgrade.description}</div>
            <div class="upgrade-stats">
                <span class="upgrade-cost">💰 ${this.ui.formatNumber(upgrade.cost)}</span>
                <button class="upgrade-button" data-upgrade-id="${upgrade.id}" ${isPurchased ? 'disabled' : ''}>
                    ${isPurchased ? 'Purchased' : 'Buy'}
                </button>
            </div>
        `;

        return card;
    }

    purchaseUpgrade(upgradeId) {
        const upgrade = this.upgrades.find(u => u.id === upgradeId);
        if (!upgrade) return;

        // Check if already purchased
        if (this.gameState.hasUpgrade(upgradeId)) {
            return;
        }

        // Check if can afford
        if (!this.gameState.canAfford(upgrade.cost)) {
            return;
        }

        // Purchase upgrade
        if (this.gameState.spendMoney(upgrade.cost)) {
            this.gameState.purchaseUpgrade(upgradeId);
            this.applyUpgradeEffect(upgrade);
            this.updateUpgradeCard(upgradeId);
        }
    }

    applyUpgradeEffect(upgrade) {
        if (upgrade.effect.type === 'clickMultiplier') {
            this.gameState.increaseMoneyPerClick(upgrade.effect.value);
        } else if (upgrade.effect.type === 'clickBonus') {
            this.gameState.increaseMoneyPerClick(upgrade.effect.value);
        }
    }

    updateUpgradeCard(upgradeId) {
        const card = this.upgradeElements.get(upgradeId);
        if (!card) return;

        const button = card.querySelector('.upgrade-button');
        button.textContent = 'Purchased';
        button.disabled = true;
    }

    updateUpgradeButtons() {
        this.upgrades.forEach(upgrade => {
            const card = this.upgradeElements.get(upgrade.id);
            if (!card) return;

            const isPurchased = this.gameState.hasUpgrade(upgrade.id);
            const canAfford = this.gameState.canAfford(upgrade.cost);
            
            const button = card.querySelector('.upgrade-button');
            
            if (!isPurchased) {
                this.ui.updateButtonState(button, canAfford);
                this.ui.updateCardAffordability(card, canAfford);
            }
        });
    }
}
