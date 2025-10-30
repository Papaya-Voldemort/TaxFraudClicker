import { achievementsData, rarityColors, rarityGlow } from '../data/achievements.js';

export class AchievementManager {
    constructor(gameState, ui) {
        this.gameState = gameState;
        this.ui = ui;
        this.achievements = achievementsData;
        this.unlockedAchievements = new Set();
        this.achievementElements = new Map();
        this.clickTimestamps = [];
        this.notificationQueue = [];
        this.isShowingNotification = false;
    }

    init() {
        this.renderAchievements();
    }

    renderAchievements() {
        const container = document.getElementById('achievements-container');
        container.innerHTML = '';

        this.achievements.forEach(achievement => {
            if (achievement.hidden && !this.isUnlocked(achievement.id)) {
                return; // Don't show hidden achievements until unlocked
            }

            const card = this.createAchievementCard(achievement);
            container.appendChild(card);
            this.achievementElements.set(achievement.id, card);
        });

        // Update progress bars
        this.updateAllProgressBars();
    }

    updateAllProgressBars() {
        this.achievements.forEach(achievement => {
            if (!this.isUnlocked(achievement.id)) {
                const card = this.achievementElements.get(achievement.id);
                if (card) {
                    const progress = this.getAchievementProgress(achievement);
                    const progressFill = card.querySelector('.achievement-progress-fill');
                    const progressText = card.querySelector('.achievement-progress-text');
                    
                    if (progressFill) {
                        progressFill.style.width = progress.percentage + '%';
                    }
                    if (progressText) {
                        progressText.textContent = `${this.formatProgressNumber(progress.current)} / ${this.formatProgressNumber(progress.target)}`;
                    }
                }
            }
        });
    }

    formatProgressNumber(num) {
        if (num < 1000) return Math.floor(num).toString();
        if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
        if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
        return (num / 1000000000).toFixed(1) + 'B';
    }

    createAchievementCard(achievement) {
        const card = document.createElement('div');
        const isUnlocked = this.isUnlocked(achievement.id);
        
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'} rarity-${achievement.rarity}`;
        card.dataset.rarity = achievement.rarity;
        card.dataset.achievementId = achievement.id;
        
        // Calculate progress if not unlocked
        let progressHTML = '';
        if (!isUnlocked) {
            const progress = this.getAchievementProgress(achievement);
            progressHTML = `
                <div class="achievement-progress-container">
                    <div class="achievement-progress-bar">
                        <div class="achievement-progress-fill" style="width: ${progress.percentage}%"></div>
                    </div>
                    <div class="achievement-progress-text">${progress.current} / ${progress.target}</div>
                </div>
            `;
        }
        
        const displayName = isUnlocked || !achievement.hidden ? achievement.name : '???';
        const displayDescription = isUnlocked || !achievement.hidden ? achievement.description : 'Secret Achievement';
        const displayIcon = isUnlocked || !achievement.hidden ? achievement.icon : '🔒';
        
        card.innerHTML = `
            <div class="achievement-icon ${isUnlocked ? 'unlocked-icon' : ''}">${displayIcon}</div>
            <div class="achievement-info">
                <div class="achievement-name">${displayName}</div>
                <div class="achievement-description">${displayDescription}</div>
                <div class="achievement-rarity" style="color: ${rarityColors[achievement.rarity]}">${achievement.rarity.toUpperCase()}</div>
                ${progressHTML}
            </div>
            ${isUnlocked ? '<div class="achievement-checkmark">✓</div>' : ''}
        `;

        return card;
    }

    getAchievementProgress(achievement) {
        const req = achievement.requirement;
        let current = 0;
        let target = req.value;

        switch (req.type) {
            case 'clicks':
                current = this.gameState.totalClicks;
                break;
            case 'money':
                current = Math.floor(this.gameState.money);
                break;
            case 'upgrades':
                current = this.gameState.purchasedUpgrades.size;
                break;
            case 'autoClickers':
                current = this.gameState.autoClickers.size;
                break;
            case 'totalAutoClickers':
                this.gameState.autoClickers.forEach(count => current += count);
                break;
            case 'moneyPerSecond':
                current = Math.floor(this.gameState.moneyPerSecond);
                break;
            case 'moneyPerClick':
                current = this.gameState.moneyPerClick;
                break;
            case 'totalMoneyEarned':
                current = Math.floor(this.gameState.totalMoneyEarned);
                break;
            case 'clickSpeed':
                current = this.clickTimestamps.filter(time => Date.now() - time <= 1000).length;
                break;
            case 'specificAuto':
                current = this.gameState.getAutoClickerCount(req.autoId);
                break;
            case 'timesJailed':
                current = this.gameState.timesJailed;
                break;
            default:
                current = 0;
        }

        const percentage = Math.min((current / target) * 100, 100);
        return { current, target, percentage };
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.isUnlocked(achievement.id) && this.checkRequirement(achievement)) {
                this.unlockAchievement(achievement.id);
            }
        });
    }

    checkRequirement(achievement) {
        const req = achievement.requirement;

        switch (req.type) {
            case 'clicks':
                return this.gameState.totalClicks >= req.value;
            case 'money':
                return this.gameState.money >= req.value;
            case 'upgrades':
                return this.gameState.purchasedUpgrades.size >= req.value;
            case 'autoClickers':
                return this.gameState.autoClickers.size >= req.value;
            case 'totalAutoClickers':
                let total = 0;
                this.gameState.autoClickers.forEach(count => total += count);
                return total >= req.value;
            case 'moneyPerSecond':
                return this.gameState.moneyPerSecond >= req.value;
            case 'moneyPerClick':
                return this.gameState.moneyPerClick >= req.value;
            case 'totalMoneyEarned':
                return this.gameState.totalMoneyEarned >= req.value;
            case 'clickSpeed':
                return this.checkClickSpeed(req.value);
            case 'specificAuto':
                return this.gameState.getAutoClickerCount(req.autoId) >= req.value;
            case 'allUpgradesAndAutos':
                return this.gameState.purchasedUpgrades.size === 8 && this.gameState.autoClickers.size === 10;
            case 'timesJailed':
                // Use gameState.timesJailed which is synced from JailManager
                return this.gameState.timesJailed >= req.value;
            case 'manual':
            case 'secret':
                return false; // These must be unlocked manually
            default:
                return false;
        }
    }

    checkClickSpeed(requiredClicks) {
        const now = Date.now();
        this.clickTimestamps.push(now);
        
        // Keep only clicks from the last 1 second
        this.clickTimestamps = this.clickTimestamps.filter(time => now - time <= 1000);
        
        return this.clickTimestamps.length >= requiredClicks;
    }

    unlockAchievement(achievementId) {
        if (this.isUnlocked(achievementId)) return;

        this.unlockedAchievements.add(achievementId);
        this.gameState.unlockedAchievements.add(achievementId);

        const achievement = this.achievements.find(a => a.id === achievementId);
        
        // Update the card
        this.updateAchievementCard(achievementId);
        
        // Show notification
        this.queueNotification(achievement);
        
        // Crazy visual feedback!
        this.showUnlockEffect(achievement);
    }

    updateAchievementCard(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        const oldCard = this.achievementElements.get(achievementId);
        
        if (oldCard) {
            const newCard = this.createAchievementCard(achievement);
            oldCard.replaceWith(newCard);
            this.achievementElements.set(achievementId, newCard);
        } else {
            // Was hidden, now render it
            this.renderAchievements();
        }
    }

    updateProgressDisplay(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        const card = this.achievementElements.get(achievementId);
        
        if (card && !this.isUnlocked(achievementId)) {
            const progress = this.getAchievementProgress(achievement);
            const progressFill = card.querySelector('.achievement-progress-fill');
            const progressText = card.querySelector('.achievement-progress-text');
            
            if (progressFill) {
                progressFill.style.width = progress.percentage + '%';
            }
            if (progressText) {
                progressText.textContent = `${this.formatProgressNumber(progress.current)} / ${this.formatProgressNumber(progress.target)}`;
            }
        }
    }

    queueNotification(achievement) {
        this.notificationQueue.push(achievement);
        if (!this.isShowingNotification) {
            this.showNextNotification();
        }
    }

    showNextNotification() {
        if (this.notificationQueue.length === 0) {
            this.isShowingNotification = false;
            return;
        }

        this.isShowingNotification = true;
        const achievement = this.notificationQueue.shift();

        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.dataset.rarity = achievement.rarity;
        notification.innerHTML = `
            <div class="notification-header">🎉 ACHIEVEMENT UNLOCKED! 🎉</div>
            <div class="notification-body">
                <div class="notification-icon">${achievement.icon}</div>
                <div class="notification-info">
                    <div class="notification-name">${achievement.name}</div>
                    <div class="notification-description">${achievement.description}</div>
                    <div class="notification-rarity" style="color: ${rarityColors[achievement.rarity]}">${achievement.rarity.toUpperCase()}</div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
                this.showNextNotification();
            }, 500);
        }, 5000);
    }

    showUnlockEffect(achievement) {
        // Create screen flash
        this.createScreenFlash(achievement.rarity);
        
        // Create particle explosion
        this.createParticleExplosion(achievement);
        
        // Play sound effect (if we had audio)
        // this.playUnlockSound(achievement.rarity);
    }

    createScreenFlash(rarity) {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        flash.style.background = `radial-gradient(circle, ${rarityGlow[rarity]} 0%, transparent 70%)`;
        document.body.appendChild(flash);

        setTimeout(() => flash.remove(), 1000);
    }

    createParticleExplosion(achievement) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'achievement-particle';
                particle.textContent = achievement.icon;
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                
                const angle = (Math.PI * 2 * i) / 30;
                const velocity = 200 + Math.random() * 300;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                particle.style.setProperty('--vx', vx + 'px');
                particle.style.setProperty('--vy', vy + 'px');
                particle.style.color = rarityColors[achievement.rarity];
                
                document.body.appendChild(particle);

                setTimeout(() => particle.remove(), 2000);
            }, i * 20);
        }
    }

    manualUnlock(achievementId) {
        this.unlockAchievement(achievementId);
    }

    isUnlocked(achievementId) {
        return this.unlockedAchievements.has(achievementId);
    }

    getProgress() {
        return {
            unlocked: this.unlockedAchievements.size,
            total: this.achievements.filter(a => !a.hidden).length
        };
    }
}
