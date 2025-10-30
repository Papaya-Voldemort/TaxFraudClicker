// Mars Upgrades - Different currency and theme
export const marsUpgradesData = [
    {
        id: 'mars_upgrade_1',
        name: 'Red Dust Mining',
        icon: '⛏️',
        description: 'Extract valuable minerals from Martian soil. +5 credits per click.',
        cost: 100,
        effect: {
            type: 'clickBonus',
            value: 5
        }
    },
    {
        id: 'mars_upgrade_2',
        name: 'Ice Harvesting',
        icon: '❄️',
        description: 'Convert polar ice to water and fuel. +15 credits per click.',
        cost: 500,
        effect: {
            type: 'clickBonus',
            value: 15
        },
        requiresPrevious: 'mars_upgrade_1'
    },
    {
        id: 'mars_upgrade_3',
        name: 'Oxygen Farm',
        icon: '🌱',
        description: 'Produce breathable atmosphere. +40 credits per click.',
        cost: 2000,
        effect: {
            type: 'clickBonus',
            value: 40
        },
        requiresPrevious: 'mars_upgrade_2'
    },
    {
        id: 'mars_upgrade_4',
        name: 'Solar Array Network',
        icon: '☀️',
        description: 'Massive renewable energy grid. +100 credits per click.',
        cost: 8000,
        effect: {
            type: 'clickBonus',
            value: 100
        },
        requiresPrevious: 'mars_upgrade_3'
    },
    {
        id: 'mars_upgrade_5',
        name: 'Underground Habitat',
        icon: '🏘️',
        description: 'Protected living quarters. +250 credits per click.',
        cost: 30000,
        effect: {
            type: 'clickBonus',
            value: 250
        },
        requiresPrevious: 'mars_upgrade_4'
    },
    {
        id: 'mars_upgrade_6',
        name: 'Magnetic Shield Generator',
        icon: '🛡️',
        description: 'Protect from cosmic radiation. +600 credits per click.',
        cost: 100000,
        effect: {
            type: 'clickBonus',
            value: 600
        },
        requiresPrevious: 'mars_upgrade_5'
    },
    {
        id: 'mars_upgrade_7',
        name: 'Phobos Mining Station',
        icon: '🌑',
        description: 'Extract resources from Mars\' moon. +1,500 credits per click.',
        cost: 400000,
        effect: {
            type: 'clickBonus',
            value: 1500
        },
        requiresPrevious: 'mars_upgrade_6'
    },
    {
        id: 'mars_upgrade_8',
        name: 'Terraform Processor',
        icon: '🌡️',
        description: 'Begin atmospheric transformation. +4,000 credits per click.',
        cost: 1500000,
        effect: {
            type: 'clickBonus',
            value: 4000
        },
        requiresPrevious: 'mars_upgrade_7'
    },
    {
        id: 'mars_upgrade_9',
        name: 'Martian Spaceport',
        icon: '🚀',
        description: 'Hub for interplanetary trade. +10,000 credits per click.',
        cost: 6000000,
        effect: {
            type: 'clickBonus',
            value: 10000
        },
        requiresPrevious: 'mars_upgrade_8'
    },
    {
        id: 'mars_upgrade_10',
        name: 'Colony Network',
        icon: '🏙️',
        description: 'Multiple interconnected settlements. +25,000 credits per click.',
        cost: 25000000,
        effect: {
            type: 'clickBonus',
            value: 25000
        },
        requiresPrevious: 'mars_upgrade_9'
    },
    {
        id: 'mars_upgrade_11',
        name: 'Valles Marineris City',
        icon: '🌆',
        description: 'Metropolis in the great canyon. +60,000 credits per click.',
        cost: 100000000,
        effect: {
            type: 'clickBonus',
            value: 60000
        },
        requiresPrevious: 'mars_upgrade_10'
    },
    {
        id: 'mars_upgrade_12',
        name: 'Olympus Mons Peak Station',
        icon: '⛰️',
        description: 'Base on the solar system\'s tallest mountain. +150,000 credits per click.',
        cost: 400000000,
        effect: {
            type: 'clickBonus',
            value: 150000
        },
        requiresPrevious: 'mars_upgrade_11'
    },
    {
        id: 'mars_upgrade_13',
        name: 'Artificial Magnetosphere',
        icon: '🧲',
        description: 'Full planetary protection. +400,000 credits per click.',
        cost: 1500000000,
        effect: {
            type: 'clickBonus',
            value: 400000
        },
        requiresPrevious: 'mars_upgrade_12'
    },
    {
        id: 'mars_upgrade_14',
        name: 'New Martian Government',
        icon: '🏛️',
        description: 'Independent planetary authority. +1,000,000 credits per click.',
        cost: 6000000000,
        effect: {
            type: 'clickBonus',
            value: 1000000
        },
        requiresPrevious: 'mars_upgrade_13'
    },
    {
        id: 'mars_upgrade_15',
        name: 'Red Planet Empire',
        icon: '👑',
        description: 'Supreme ruler of Mars. +2,500,000 credits per click.',
        cost: 25000000000,
        effect: {
            type: 'clickBonus',
            value: 2500000
        },
        requiresPrevious: 'mars_upgrade_14'
    }
];

// Mars Auto-Clickers
export const marsAutoClickersData = [
    {
        id: 'mars_auto_1',
        name: 'Mining Rover',
        icon: '🤖',
        description: 'Autonomous mineral collector.',
        baseCost: 50,
        creditsPerSecond: 0.5
    },
    {
        id: 'mars_auto_2',
        name: 'Drone Swarm',
        icon: '🛸',
        description: 'Fleet of survey drones.',
        baseCost: 400,
        creditsPerSecond: 3
    },
    {
        id: 'mars_auto_3',
        name: 'Automated Refinery',
        icon: '🏭',
        description: 'Processes raw materials continuously.',
        baseCost: 3000,
        creditsPerSecond: 20
    },
    {
        id: 'mars_auto_4',
        name: 'Bio-Dome Complex',
        icon: '🏟️',
        description: 'Self-sustaining food production.',
        baseCost: 25000,
        creditsPerSecond: 140
    },
    {
        id: 'mars_auto_5',
        name: 'Nuclear Reactor',
        icon: '☢️',
        description: 'Massive power generation.',
        baseCost: 200000,
        creditsPerSecond: 900
    },
    {
        id: 'mars_auto_6',
        name: 'Tunnel Boring Machine',
        icon: '⚙️',
        description: 'Creates underground infrastructure.',
        baseCost: 1600000,
        creditsPerSecond: 6000
    },
    {
        id: 'mars_auto_7',
        name: 'Atmospheric Processor',
        icon: '💨',
        description: 'Terraforming automation.',
        baseCost: 13000000,
        creditsPerSecond: 40000
    },
    {
        id: 'mars_auto_8',
        name: 'Deimos Mining Colony',
        icon: '🌒',
        description: 'Extract from the smaller moon.',
        baseCost: 100000000,
        creditsPerSecond: 260000
    },
    {
        id: 'mars_auto_9',
        name: 'Asteroid Belt Outpost',
        icon: '☄️',
        description: 'Mines the asteroid belt.',
        baseCost: 800000000,
        creditsPerSecond: 1700000
    },
    {
        id: 'mars_auto_10',
        name: 'Interplanetary Shipping Co.',
        icon: '🚢',
        description: 'Trades between planets.',
        baseCost: 6500000000,
        creditsPerSecond: 11000000
    },
    {
        id: 'mars_auto_11',
        name: 'Fusion Power Grid',
        icon: '⚡',
        description: 'Clean unlimited energy.',
        baseCost: 50000000000,
        creditsPerSecond: 75000000
    },
    {
        id: 'mars_auto_12',
        name: 'Planetary AI Network',
        icon: '🧠',
        description: 'Autonomous colony management.',
        baseCost: 400000000000,
        creditsPerSecond: 500000000
    }
];

// Mars AC Upgrades
export const marsACUpgradesData = [
    {
        id: 'mars_ac_upgrade_1',
        name: 'Enhanced Servos',
        icon: '🔧',
        description: 'Better mechanical parts. Doubles Mars auto-efficiency.',
        cost: 2000,
        effect: {
            type: 'globalMultiplier',
            value: 2
        }
    },
    {
        id: 'mars_ac_upgrade_2',
        name: 'Martian Alloy',
        icon: '🛠️',
        description: 'Stronger construction materials. Doubles Mars auto-efficiency.',
        cost: 20000,
        effect: {
            type: 'globalMultiplier',
            value: 2
        }
    },
    {
        id: 'mars_ac_upgrade_3',
        name: 'Low-G Optimization',
        icon: '🌍',
        description: 'Adapt to Mars gravity. Doubles Mars auto-efficiency.',
        cost: 200000,
        effect: {
            type: 'globalMultiplier',
            value: 2
        }
    },
    {
        id: 'mars_ac_upgrade_4',
        name: 'Dust-Proof Systems',
        icon: '💨',
        description: 'Protect from sandstorms. Doubles Mars auto-efficiency.',
        cost: 2000000,
        effect: {
            type: 'globalMultiplier',
            value: 2
        }
    },
    {
        id: 'mars_ac_upgrade_5',
        name: 'Quantum Communications',
        icon: '📡',
        description: 'Instant data transfer. Doubles Mars auto-efficiency.',
        cost: 20000000,
        effect: {
            type: 'globalMultiplier',
            value: 2
        }
    },
    {
        id: 'mars_ac_upgrade_6',
        name: 'Nanobot Swarms',
        icon: '🦠',
        description: 'Self-repairing machinery. Doubles Mars auto-efficiency.',
        cost: 200000000,
        effect: {
            type: 'globalMultiplier',
            value: 2
        }
    },
    {
        id: 'mars_ac_upgrade_7',
        name: 'Planetary AI Core',
        icon: '💻',
        description: 'Centralized intelligence. Doubles Mars auto-efficiency.',
        cost: 2000000000,
        effect: {
            type: 'globalMultiplier',
            value: 2
        }
    },
    {
        id: 'mars_ac_upgrade_8',
        name: 'Terraforming Accelerator',
        icon: '🌋',
        description: 'Speed up planet transformation. Doubles Mars auto-efficiency.',
        cost: 20000000000,
        effect: {
            type: 'globalMultiplier',
            value: 2
        }
    }
];

// Mars Jail Data
export const marsJailUpgradesData = [
    {
        id: 'mars_jail_upgrade_1',
        name: 'Radiation Suit',
        icon: '🧑‍🚀',
        description: 'Better protection means better work. +2 freedom per click.',
        cost: 50,
        effect: {
            type: 'clickBonus',
            value: 2
        }
    },
    {
        id: 'mars_jail_upgrade_2',
        name: 'Oxygen Recycler',
        icon: '💨',
        description: 'Breathe easier, work harder. +5 freedom per click.',
        cost: 200,
        effect: {
            type: 'clickBonus',
            value: 5
        }
    },
    {
        id: 'mars_jail_upgrade_3',
        name: 'Tunnel Access',
        icon: '🚇',
        description: 'Secret passages. +12 freedom per click.',
        cost: 800,
        effect: {
            type: 'clickBonus',
            value: 12
        }
    },
    {
        id: 'mars_jail_upgrade_4',
        name: 'Rover Parts',
        icon: '🛞',
        description: 'Build an escape vehicle. +30 freedom per click.',
        cost: 3000,
        effect: {
            type: 'clickBonus',
            value: 30
        }
    },
    {
        id: 'mars_jail_upgrade_5',
        name: 'Colony Sympathizers',
        icon: '👥',
        description: 'Allies on the outside. +75 freedom per click.',
        cost: 12000,
        effect: {
            type: 'clickBonus',
            value: 75
        }
    }
];

export const marsJailAutoClickersData = [
    {
        id: 'mars_jail_auto_1',
        name: 'Mining Buddy',
        icon: '⛏️',
        description: 'Fellow prisoner who helps.',
        baseCost: 100,
        freedomPerSecond: 1
    },
    {
        id: 'mars_jail_auto_2',
        name: 'Smuggled Drone',
        icon: '🛸',
        description: 'Small automated helper.',
        baseCost: 800,
        freedomPerSecond: 7
    },
    {
        id: 'mars_jail_auto_3',
        name: 'Guard Rotation Hack',
        icon: '⏰',
        description: 'Creates opportunities.',
        baseCost: 6000,
        freedomPerSecond: 50
    },
    {
        id: 'mars_jail_auto_4',
        name: 'Underground Network',
        icon: '🕸️',
        description: 'Organized escape plan.',
        baseCost: 50000,
        freedomPerSecond: 400
    }
];
