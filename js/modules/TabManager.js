export class TabManager {
    constructor() {
        this.currentTab = 'upgrades';
        this.tabButtons = null;
        this.tabPanels = null;
    }

    init() {
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabPanels = document.querySelectorAll('.tab-panel');

        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        if (this.currentTab === tabName) return;

        // Remove active class from all buttons and panels
        this.tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        this.tabPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Add active class to selected button and panel
        const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
        const selectedPanel = document.getElementById(`tab-${tabName}`);

        if (selectedButton && selectedPanel) {
            selectedButton.classList.add('active');
            selectedPanel.classList.add('active');
            this.currentTab = tabName;
        }
    }

    getCurrentTab() {
        return this.currentTab;
    }
}
