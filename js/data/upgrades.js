export const upgradesData = [
    {
        id: 'upgrade_1',
        name: 'Creative Accounting',
        icon: '📊',
        description: 'Learn to "optimize" your financial reporting. +2 money per click.',
        cost: 50,
        effect: {
            type: 'clickBonus',
            value: 2
        }
    },
    {
        id: 'upgrade_2',
        name: 'Offshore Account',
        icon: '🏝️',
        description: 'Set up a totally legal offshore bank account. +5 money per click.',
        cost: 200,
        effect: {
            type: 'clickBonus',
            value: 5
        }
    },
    {
        id: 'upgrade_3',
        name: 'Shell Corporation',
        icon: '🐚',
        description: 'Create a legitimate business entity. +10 money per click.',
        cost: 500,
        effect: {
            type: 'clickBonus',
            value: 10
        }
    },
    {
        id: 'upgrade_4',
        name: 'Tax Loophole Discovery',
        icon: '🔍',
        description: 'Find perfectly legal tax optimization strategies. +25 money per click.',
        cost: 1500,
        effect: {
            type: 'clickBonus',
            value: 25
        }
    },
    {
        id: 'upgrade_5',
        name: 'Swiss Bank Connections',
        icon: '🏦',
        description: 'Establish international banking relationships. +50 money per click.',
        cost: 5000,
        effect: {
            type: 'clickBonus',
            value: 50
        }
    },
    {
        id: 'upgrade_6',
        name: 'Panama Papers Pro',
        icon: '📄',
        description: 'Master document organization techniques. +100 money per click.',
        cost: 15000,
        effect: {
            type: 'clickBonus',
            value: 100
        }
    },
    {
        id: 'upgrade_7',
        name: 'Cryptocurrency Mixer',
        icon: '₿',
        description: 'Enhance your digital asset privacy. +250 money per click.',
        cost: 50000,
        effect: {
            type: 'clickBonus',
            value: 250
        }
    },
    {
        id: 'upgrade_8',
        name: 'Tax Haven Empire',
        icon: '🏰',
        description: 'Build a global network of legal entities. +500 money per click.',
        cost: 150000,
        effect: {
            type: 'clickBonus',
            value: 500
        },
        requiresPrevious: 'upgrade_7'
    },
    {
        id: 'upgrade_9',
        name: 'Political Connections',
        icon: '🤝',
        description: 'Friends in high places. +1,000 money per click.',
        cost: 500000,
        effect: {
            type: 'clickBonus',
            value: 1000
        },
        requiresPrevious: 'upgrade_8'
    },
    {
        id: 'upgrade_10',
        name: 'Media Empire',
        icon: '📺',
        description: 'Control the narrative. +2,500 money per click.',
        cost: 1500000,
        effect: {
            type: 'clickBonus',
            value: 2500
        },
        requiresPrevious: 'upgrade_9'
    },
    {
        id: 'upgrade_11',
        name: 'Private Island',
        icon: '🏝️',
        description: 'Your own tax-free paradise. +5,000 money per click.',
        cost: 5000000,
        effect: {
            type: 'clickBonus',
            value: 5000
        },
        requiresPrevious: 'upgrade_10'
    },
    {
        id: 'upgrade_12',
        name: 'Space Mining Rights',
        icon: '🛸',
        description: 'Claim asteroids for resources. +10,000 money per click.',
        cost: 15000000,
        effect: {
            type: 'clickBonus',
            value: 10000
        },
        requiresPrevious: 'upgrade_11'
    },
    {
        id: 'upgrade_13',
        name: 'Lunar Base Deed',
        icon: '🌙',
        description: 'Own property on the Moon. +25,000 money per click.',
        cost: 50000000,
        effect: {
            type: 'clickBonus',
            value: 25000
        },
        requiresPrevious: 'upgrade_12'
    },
    {
        id: 'upgrade_14',
        name: 'Terraforming Patents',
        icon: '🌍',
        description: 'Hold rights to planet modification tech. +50,000 money per click.',
        cost: 150000000,
        effect: {
            type: 'clickBonus',
            value: 50000
        },
        requiresPrevious: 'upgrade_13'
    },
    {
        id: 'upgrade_15',
        name: 'Interstellar Trading License',
        icon: '🚀',
        description: 'Trade across star systems. +100,000 money per click.',
        cost: 500000000,
        effect: {
            type: 'clickBonus',
            value: 100000
        },
        requiresPrevious: 'upgrade_14'
    },
    {
        id: 'upgrade_16',
        name: 'Galactic Monopoly',
        icon: '🌌',
        description: 'Dominate the galaxy economy. +250,000 money per click.',
        cost: 2000000000,
        effect: {
            type: 'clickBonus',
            value: 250000
        },
        requiresPrevious: 'upgrade_15'
    }
];
