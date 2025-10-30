import { autoClickerUpgradesData } from '../data/autoClickerUpgrades.js';

export class AutoClickerUpgradeManager {
    constructor(gameState, ui) {
        this.gameState = gameState;
        this.ui = ui;
        this.upgrades = autoClickerUpgradesData;
        this.upgradeElements = new Map();
    }

    renderUpgrades() {
        const container = document.getElementById('ac-upgrades-container');
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
        
        const isPurchased = this.gameState.hasAutoClickerUpgrade(upgrade.id);
        
        card.innerHTML = `
            <div class="upgrade-header">
                <span class="upgrade-icon">${upgrade.icon}</span>
                <span class="upgrade-name">${upgrade.name}</span>
            </div>
            <div class="upgrade-description">${upgrade.description}</div>
            <div class="upgrade-stats">
                <span class="upgrade-cost">💰 ${this.ui.formatNumber(upgrade.cost)}</span>
                <button class="upgrade-button" data-ac-upgrade-id="${upgrade.id}" ${isPurchased ? 'disabled' : ''}>
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
        if (this.gameState.hasAutoClickerUpgrade(upgradeId)) {
            return;
        }

        // Check if can afford
        if (!this.gameState.canAfford(upgrade.cost)) {
            return;
        }

        // Purchase upgrade
        if (this.gameState.spendMoney(upgrade.cost)) {
            this.gameState.purchaseAutoClickerUpgrade(upgradeId);
            this.applyUpgradeEffect(upgrade);
            this.updateUpgradeCard(upgradeId);
        }
    }

    applyUpgradeEffect(upgrade) {
        if (upgrade.effect.type === 'globalMultiplier') {
            this.gameState.multiplyAutoClickerEfficiency(upgrade.effect.value);
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

            const isPurchased = this.gameState.hasAutoClickerUpgrade(upgrade.id);
            const canAfford = this.gameState.canAfford(upgrade.cost);
            
            const button = card.querySelector('.upgrade-button');
            
            if (!isPurchased) {
                this.ui.updateButtonState(button, canAfford);
                this.ui.updateCardAffordability(card, canAfford);
            }
        });
    }
}
