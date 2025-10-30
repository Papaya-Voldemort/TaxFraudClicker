export const jailUpgradesData = [
    {
        id: 'jail_upgrade_1',
        name: 'Good Behavior',
        icon: '😇',
        description: 'Pretend to be a model prisoner. +3 freedom per click.',
        cost: 25,
        effect: {
            type: 'clickBonus',
            value: 3
        }
    },
    {
        id: 'jail_upgrade_2',
        name: 'Charm the Guards',
        icon: '🤝',
        description: 'Make friends with the guards. +8 freedom per click.',
        cost: 100,
        effect: {
            type: 'clickBonus',
            value: 8
        }
    },
    {
        id: 'jail_upgrade_3',
        name: 'Legal Loopholes',
        icon: '📚',
        description: 'Study law in the library. +20 freedom per click.',
        cost: 300,
        effect: {
            type: 'clickBonus',
            value: 20
        }
    },
    {
        id: 'jail_upgrade_4',
        name: 'Court Appeal',
        icon: '⚖️',
        description: 'File appeals to reduce sentence. +50 freedom per click.',
        cost: 800,
        effect: {
            type: 'clickBonus',
            value: 50
        }
    }
];

export const jailAutoClickersData = [
    {
        id: 'jail_auto_1',
        name: 'Cellmate Helper',
        icon: '👤',
        description: 'Your cellmate helps reduce your sentence.',
        baseCost: 20,
        freedomPerSecond: 1
    },
    {
        id: 'jail_auto_2',
        name: 'Prison Lawyer',
        icon: '👨‍⚖️',
        description: 'Pro bono lawyer working on your case.',
        baseCost: 150,
        freedomPerSecond: 6
    },
    {
        id: 'jail_auto_3',
        name: 'Bribed Judge',
        icon: '👨‍⚖️💰',
        description: 'Money talks, even in prison.',
        baseCost: 1000,
        freedomPerSecond: 30
    }
];
