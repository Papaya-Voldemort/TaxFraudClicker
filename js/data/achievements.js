export const achievementsData = [
    {
        id: 'first_click',
        name: 'Tax Evasion Beginner',
        description: 'Hide your first dollar from the IRS',
        icon: '👶',
        requirement: { type: 'clicks', value: 1 },
        rarity: 'common'
    },
    {
        id: 'click_10',
        name: 'Getting Started',
        description: 'Click 10 times',
        icon: '🖱️',
        requirement: { type: 'clicks', value: 10 },
        rarity: 'common'
    },
    {
        id: 'click_100',
        name: 'Dedicated Fraudster',
        description: 'Click 100 times',
        icon: '💪',
        requirement: { type: 'clicks', value: 100 },
        rarity: 'uncommon'
    },
    {
        id: 'click_1000',
        name: 'Click Master',
        description: 'Click 1,000 times',
        icon: '🏆',
        requirement: { type: 'clicks', value: 1000 },
        rarity: 'rare'
    },
    {
        id: 'click_10000',
        name: 'Carpal Tunnel Syndrome',
        description: 'Click 10,000 times - See a doctor!',
        icon: '🤕',
        requirement: { type: 'clicks', value: 10000 },
        rarity: 'epic'
    },
    {
        id: 'money_100',
        name: 'Petty Cash',
        description: 'Accumulate $100 in hidden money',
        icon: '💵',
        requirement: { type: 'money', value: 100 },
        rarity: 'common'
    },
    {
        id: 'money_1000',
        name: 'Grand Theft',
        description: 'Accumulate $1,000 in hidden money',
        icon: '💰',
        requirement: { type: 'money', value: 1000 },
        rarity: 'uncommon'
    },
    {
        id: 'money_10000',
        name: 'Money Launderer',
        description: 'Accumulate $10,000 in hidden money',
        icon: '🧺',
        requirement: { type: 'money', value: 10000 },
        rarity: 'rare'
    },
    {
        id: 'money_100000',
        name: 'White Collar Criminal',
        description: 'Accumulate $100,000 in hidden money',
        icon: '👔',
        requirement: { type: 'money', value: 100000 },
        rarity: 'epic'
    },
    {
        id: 'money_1000000',
        name: 'Million Dollar Fraudster',
        description: 'Accumulate $1,000,000 in hidden money',
        icon: '🎩',
        requirement: { type: 'money', value: 1000000 },
        rarity: 'legendary'
    },
    {
        id: 'first_upgrade',
        name: 'Strategic Investment',
        description: 'Purchase your first upgrade',
        icon: '📊',
        requirement: { type: 'upgrades', value: 1 },
        rarity: 'common'
    },
    {
        id: 'all_upgrades',
        name: 'Full Portfolio',
        description: 'Purchase all upgrades',
        icon: '📈',
        requirement: { type: 'upgrades', value: 8 },
        rarity: 'epic'
    },
    {
        id: 'first_auto',
        name: 'Delegator',
        description: 'Hire your first assistant',
        icon: '🤝',
        requirement: { type: 'autoClickers', value: 1 },
        rarity: 'common'
    },
    {
        id: 'auto_10',
        name: 'Small Business Owner',
        description: 'Own 10 total assistants',
        icon: '🏢',
        requirement: { type: 'totalAutoClickers', value: 10 },
        rarity: 'uncommon'
    },
    {
        id: 'auto_50',
        name: 'Corporate Empire',
        description: 'Own 50 total assistants',
        icon: '🏛️',
        requirement: { type: 'totalAutoClickers', value: 50 },
        rarity: 'rare'
    },
    {
        id: 'auto_100',
        name: 'Offshore Dynasty',
        description: 'Own 100 total assistants',
        icon: '🌍',
        requirement: { type: 'totalAutoClickers', value: 100 },
        rarity: 'epic'
    },
    {
        id: 'passive_100',
        name: 'Passive Income',
        description: 'Generate $100/second',
        icon: '⏱️',
        requirement: { type: 'moneyPerSecond', value: 100 },
        rarity: 'uncommon'
    },
    {
        id: 'passive_1000',
        name: 'Money Machine',
        description: 'Generate $1,000/second',
        icon: '🎰',
        requirement: { type: 'moneyPerSecond', value: 1000 },
        rarity: 'rare'
    },
    {
        id: 'passive_10000',
        name: 'Automated Empire',
        description: 'Generate $10,000/second',
        icon: '🏭',
        requirement: { type: 'moneyPerSecond', value: 10000 },
        rarity: 'epic'
    },
    {
        id: 'click_power_100',
        name: 'Powerful Clicks',
        description: 'Get 100 money per click',
        icon: '⚡',
        requirement: { type: 'moneyPerClick', value: 100 },
        rarity: 'rare'
    },
    {
        id: 'total_earned_1m',
        name: 'Lifetime Millionaire',
        description: 'Earn $1,000,000 total (lifetime)',
        icon: '💎',
        requirement: { type: 'totalMoneyEarned', value: 1000000 },
        rarity: 'legendary'
    },
    {
        id: 'total_earned_10m',
        name: 'Tax Haven Tycoon',
        description: 'Earn $10,000,000 total (lifetime)',
        icon: '👑',
        requirement: { type: 'totalMoneyEarned', value: 10000000 },
        rarity: 'legendary'
    },
    {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Click 10 times in 1 second',
        icon: '⚡💨',
        requirement: { type: 'clickSpeed', value: 10 },
        rarity: 'rare'
    },
    {
        id: 'shadow_government',
        name: 'Shadow Government',
        description: 'Own at least one Shadow Government',
        icon: '👁️',
        requirement: { type: 'specificAuto', autoId: 'auto_10', value: 1 },
        rarity: 'epic'
    },
    {
        id: 'intern_army',
        name: 'Intern Army',
        description: 'Own 20 Unpaid Interns',
        icon: '👨‍💼👨‍💼',
        requirement: { type: 'specificAuto', autoId: 'auto_1', value: 20 },
        rarity: 'uncommon'
    },
    {
        id: 'reset_game',
        name: 'Fresh Start',
        description: 'Reset your game (you brave soul)',
        icon: '🔄',
        requirement: { type: 'manual', value: 1 },
        rarity: 'rare'
    },
    {
        id: 'first_bust',
        name: 'Caught Red-Handed',
        description: 'Get caught by the IRS for the first time',
        icon: '👮',
        requirement: { type: 'manual', value: 1 },
        rarity: 'uncommon'
    },
    {
        id: 'repeat_offender',
        name: 'Repeat Offender',
        description: 'Get caught by the IRS 5 times',
        icon: '🔁',
        requirement: { type: 'timesJailed', value: 5 },
        rarity: 'rare'
    },
    {
        id: 'career_criminal',
        name: 'Career Criminal',
        description: 'Get caught by the IRS 10 times',
        icon: '🎭',
        requirement: { type: 'timesJailed', value: 10 },
        rarity: 'epic'
    },
    {
        id: 'secret_achievement',
        name: '???',
        description: 'A mysterious achievement...',
        icon: '❓',
        requirement: { type: 'secret', value: 1 },
        rarity: 'legendary',
        hidden: true
    },
    {
        id: 'secret_billionaire',
        name: '???',
        description: 'A secret waiting to be discovered...',
        icon: '💳',
        requirement: { type: 'totalMoneyEarned', value: 5000000 },
        rarity: 'legendary',
        hidden: true
    },
    {
        id: 'secret_click_addict',
        name: '???',
        description: 'A secret waiting to be discovered...',
        icon: '🖱️',
        requirement: { type: 'clicks', value: 50000 },
        rarity: 'legendary',
        hidden: true
    },
    {
        id: 'secret_empire',
        name: '???',
        description: 'A secret waiting to be discovered...',
        icon: '🏰',
        requirement: { type: 'totalAutoClickers', value: 200 },
        rarity: 'legendary',
        hidden: true
    },
    {
        id: 'secret_passive',
        name: '???',
        description: 'A secret waiting to be discovered...',
        icon: '💤',
        requirement: { type: 'moneyPerSecond', value: 100000 },
        rarity: 'legendary',
        hidden: true
    },
    {
        id: 'secret_all_upgrades_and_autos',
        name: '???',
        description: 'A secret waiting to be discovered...',
        icon: '🎯',
        requirement: { type: 'allUpgradesAndAutos', value: 1 },
        rarity: 'legendary',
        hidden: true
    }
];

export const rarityColors = {
    common: '#9e9e9e',
    uncommon: '#4caf50',
    rare: '#2196f3',
    epic: '#9c27b0',
    legendary: '#ff9800'
};

export const rarityGlow = {
    common: 'rgba(158, 158, 158, 0.3)',
    uncommon: 'rgba(76, 175, 80, 0.4)',
    rare: 'rgba(33, 150, 243, 0.5)',
    epic: 'rgba(156, 39, 176, 0.6)',
    legendary: 'rgba(255, 152, 0, 0.8)'
};
