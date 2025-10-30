export class SaveManager {
    constructor(gameState, jailManager = null) {
        this.gameState = gameState;
        this.jailManager = jailManager;
        this.saveKey = 'taxFraudClickerSave';
    }

    save() {
        try {
            const saveData = {
                gameState: this.gameState.toJSON(),
                jailData: this.jailManager ? this.jailManager.toJSON() : null
            };
            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            console.log('Game saved successfully');
        } catch (error) {
            console.error('Failed to save game:', error);
        }
    }

    load() {
        try {
            const saveData = localStorage.getItem(this.saveKey);
            if (saveData) {
                const parsedData = JSON.parse(saveData);
                this.gameState.fromJSON(parsedData.gameState || parsedData); // Backward compatibility
                if (this.jailManager && parsedData.jailData) {
                    this.jailManager.fromJSON(parsedData.jailData);
                }
                console.log('Game loaded successfully');
                return true;
            }
        } catch (error) {
            console.error('Failed to load game:', error);
        }
        return false;
    }

    reset() {
        try {
            localStorage.removeItem(this.saveKey);
            console.log('Game reset successfully');
        } catch (error) {
            console.error('Failed to reset game:', error);
        }
    }

    hasSave() {
        return localStorage.getItem(this.saveKey) !== null;
    }
}
