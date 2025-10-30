export class UI {
    constructor() {
        this.moneyDisplay = document.getElementById('money-display');
        this.perClickDisplay = document.getElementById('per-click-display');
        this.perSecondDisplay = document.getElementById('per-second-display');
        this.particlesContainer = document.getElementById('click-particles');
        this.setupClickEffects();
    }

    setupClickEffects() {
        // Add subtle background animation on page
        this.startAmbientEffects();
    }

    startAmbientEffects() {
        // Randomly create subtle ambient effects
        setInterval(() => {
            if (Math.random() > 0.7) {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                this.createAmbientParticle(x, y);
            }
        }, 2000);
    }

    createAmbientParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 215, 0, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '500';
        particle.style.animation = 'ambient-float 3s ease-out forwards';
        particle.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.4)';
        
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 3000);
    }

    updateAll(gameState) {
        this.updateMoney(gameState.money);
        this.updatePerClick(gameState.moneyPerClick);
        this.updatePerSecond(gameState.moneyPerSecond);
    }

    updateMoney(amount) {
        this.moneyDisplay.textContent = this.formatNumber(amount);
    }

    updatePerClick(amount) {
        this.perClickDisplay.textContent = this.formatNumber(amount);
    }

    updatePerSecond(amount) {
        this.perSecondDisplay.textContent = this.formatNumber(amount);
    }

    formatNumber(num) {
        if (num < 1000) return Math.floor(num).toString();
        if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
        if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
        if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
        return (num / 1000000000000).toFixed(1) + 'T';
    }

    showClickParticle(x, y, amount) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = '+' + this.formatNumber(amount);
        
        // Position relative to viewport, not offset
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'fixed';
        
        this.particlesContainer.appendChild(particle);

        // Create secondary particles for extra visual flair
        this.createSecondaryParticles(x, y, amount);

        setTimeout(() => {
            particle.remove();
        }, 1200);
    }

    createSecondaryParticles(x, y, amount) {
        // Create 2-3 small trailing particles
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const secondary = document.createElement('div');
                secondary.style.position = 'fixed';
                secondary.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
                secondary.style.top = (y + Math.random() * 30) + 'px';
                secondary.style.fontSize = (0.6 + Math.random() * 0.4) + 'em';
                secondary.style.color = 'rgba(255, 215, 0, 0.7)';
                secondary.style.fontWeight = 'bold';
                secondary.style.pointerEvents = 'none';
                secondary.style.zIndex = '999';
                secondary.style.textShadow = '0 0 8px rgba(255, 215, 0, 0.6)';
                secondary.style.animation = 'float-up 1.2s ease-out forwards';
                secondary.textContent = '✦';
                
                document.getElementById('click-particles').appendChild(secondary);
                
                setTimeout(() => secondary.remove(), 1200);
            }, i * 50);
        }
    }

    updateButtonState(button, canAfford) {
        button.disabled = !canAfford;
    }

    updateCardAffordability(card, canAfford) {
        if (canAfford) {
            card.classList.add('affordable');
            card.classList.remove('locked');
            this.addPulseGlow(card);
        } else {
            card.classList.remove('affordable');
            card.classList.add('locked');
            this.removePulseGlow(card);
        }
    }

    addPulseGlow(element) {
        if (!element.dataset.pulsing) {
            element.dataset.pulsing = 'true';
        }
    }

    removePulseGlow(element) {
        delete element.dataset.pulsing;
    }
}
