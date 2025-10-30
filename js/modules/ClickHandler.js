export class ClickHandler {
    constructor(gameState, ui) {
        this.gameState = gameState;
        this.ui = ui;
    }

    handleClick(event) {
        const amount = this.gameState.moneyPerClick;
        this.gameState.addMoney(amount);
        this.gameState.incrementClicks();

        // Create ripple effect
        this.createRipple(event);

        // Show particle effect
        this.ui.showClickParticle(event.clientX, event.clientY, amount);

        // Add visual feedback to button
        this.addClickFeedback(event.target.closest('.main-clicker'));

        // Update display
        this.ui.updateMoney(this.gameState.money);
    }

    createRipple(event) {
        const button = event.target.closest('.main-clicker');
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'rgba(255, 215, 0, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple-expand 0.6s ease-out';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.zIndex = '10';

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    addClickFeedback(button) {
        button.style.filter = 'brightness(1.2)';
        setTimeout(() => {
            button.style.filter = 'brightness(1)';
        }, 100);
    }
}
