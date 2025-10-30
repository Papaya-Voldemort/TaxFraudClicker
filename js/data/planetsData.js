// All planets in the solar system with unique themes and mechanics
export const planetsData = {
    earth: {
        id: 'earth',
        name: 'Earth',
        icon: '🌍',
        theme: {
            primaryColor: '#2c5f2d',
            secondaryColor: '#97c97e',
            accentColor: '#ffd700',
            bgColor: '#1a1a2e',
            cardBg: '#16213e'
        },
        currency: {
            name: 'Hidden Money',
            icon: '💰',
            perClickLabel: 'Money per Click',
            perSecondLabel: 'Money per Second'
        },
        clickerText: 'Hide Money from IRS',
        clickerIcon: '🏛️',
        headerTitle: '🏦 Tax Fraud Clicker 🏦',
        headerDisclaimer: '⚠️ Educational Satire - Don\'t Actually Commit Tax Fraud! ⚠️',
        unlockCost: 0, // Always unlocked
        unlockRequirement: null,
        jailName: 'Federal Prison',
        jailIcon: '⛓️',
        progressionMechanic: 'standard', // Standard incremental clicking
        description: 'The home planet. Hide money from the IRS!'
    },
    
    mercury: {
        id: 'mercury',
        name: 'Mercury',
        icon: '☿️',
        theme: {
            primaryColor: '#5a4a3a',
            secondaryColor: '#8b7355',
            accentColor: '#ffa500',
            bgColor: '#1a1410',
            cardBg: '#2a1f18'
        },
        currency: {
            name: 'Solar Watts',
            icon: '⚡',
            perClickLabel: 'Watts per Click',
            perSecondLabel: 'Watts per Second'
        },
        clickerText: 'Harvest Solar Energy',
        clickerIcon: '☀️',
        headerTitle: '☿️ Mercury Solar Station ☿️',
        headerDisclaimer: '⚠️ Harness the Power of the Sun! ⚠️',
        unlockCost: 50000000, // 50 million Earth money
        unlockRequirement: 'earth',
        jailName: 'Solar Detention',
        jailIcon: '🔥',
        progressionMechanic: 'temperature', // Day/night cycle affects production
        description: 'Closest to the sun. Extreme temperatures create unique challenges!'
    },
    
    venus: {
        id: 'venus',
        name: 'Venus',
        icon: '♀️',
        theme: {
            primaryColor: '#8b6914',
            secondaryColor: '#daa520',
            accentColor: '#ff8c00',
            bgColor: '#1a1608',
            cardBg: '#2a2410'
        },
        currency: {
            name: 'Pressure Credits',
            icon: '💎',
            perClickLabel: 'Credits per Click',
            perSecondLabel: 'Credits per Second'
        },
        clickerText: 'Extract Atmospheric Diamonds',
        clickerIcon: '💠',
        headerTitle: '♀️ Venus Pressure Mining ♀️',
        headerDisclaimer: '⚠️ Mining in Extreme Conditions! ⚠️',
        unlockCost: 150000000, // 150 million
        unlockRequirement: 'mercury',
        jailName: 'Pressure Chamber',
        jailIcon: '🌪️',
        progressionMechanic: 'pressure', // Higher pressure = higher rewards but more risk
        description: 'Extreme pressure creates valuable materials!'
    },
    
    mars: {
        id: 'mars',
        name: 'Mars',
        icon: '♂️',
        theme: {
            primaryColor: '#8b3a3a',
            secondaryColor: '#c97e7e',
            accentColor: '#ff6b35',
            bgColor: '#2a1a1a',
            cardBg: '#3e1616'
        },
        currency: {
            name: 'Mars Credits',
            icon: '🔴',
            perClickLabel: 'Credits per Click',
            perSecondLabel: 'Credits per Second'
        },
        clickerText: 'Build Mars Empire',
        clickerIcon: '🪐',
        headerTitle: '🚀 Mars Colony Tycoon 🚀',
        headerDisclaimer: '⚠️ Educational Satire - Interplanetary Commerce! ⚠️',
        unlockCost: 500000000, // 500 million (reduced from 10 billion)
        unlockRequirement: 'venus',
        jailName: 'Mars Authority Detention',
        jailIcon: '🔴',
        progressionMechanic: 'colonization', // Build colonies to unlock bonuses
        description: 'Colonize the red planet and build an empire!'
    },
    
    jupiter: {
        id: 'jupiter',
        name: 'Jupiter',
        icon: '♃',
        theme: {
            primaryColor: '#6b4423',
            secondaryColor: '#a0826d',
            accentColor: '#ff4500',
            bgColor: '#1a1108',
            cardBg: '#2a1c10'
        },
        currency: {
            name: 'Storm Energy',
            icon: '🌀',
            perClickLabel: 'Energy per Click',
            perSecondLabel: 'Energy per Second'
        },
        clickerText: 'Harvest Storm Power',
        clickerIcon: '⚡',
        headerTitle: '♃ Jupiter Storm Harvester ♃',
        headerDisclaimer: '⚠️ Ride the Great Red Spot! ⚠️',
        unlockCost: 2000000000, // 2 billion
        unlockRequirement: 'mars',
        jailName: 'Storm Prison',
        jailIcon: '🌪️',
        progressionMechanic: 'storms', // Random storm events give massive bonuses
        description: 'Harvest energy from the largest storms in the solar system!'
    },
    
    saturn: {
        id: 'saturn',
        name: 'Saturn',
        icon: '♄',
        theme: {
            primaryColor: '#8b8970',
            secondaryColor: '#d4af37',
            accentColor: '#ffd700',
            bgColor: '#1a1916',
            cardBg: '#2a2620'
        },
        currency: {
            name: 'Ring Minerals',
            icon: '💍',
            perClickLabel: 'Minerals per Click',
            perSecondLabel: 'Minerals per Second'
        },
        clickerText: 'Mine the Rings',
        clickerIcon: '🪐',
        headerTitle: '♄ Saturn Ring Miner ♄',
        headerDisclaimer: '⚠️ Billions of Rocks to Mine! ⚠️',
        unlockCost: 8000000000, // 8 billion
        unlockRequirement: 'jupiter',
        jailName: 'Ring Penitentiary',
        jailIcon: '⛓️',
        progressionMechanic: 'rings', // Mine different rings for different resources
        description: 'Mine precious minerals from Saturn\'s magnificent rings!'
    },
    
    uranus: {
        id: 'uranus',
        name: 'Uranus',
        icon: '♅',
        theme: {
            primaryColor: '#1e4d5c',
            secondaryColor: '#4682b4',
            accentColor: '#00ffff',
            bgColor: '#0a1418',
            cardBg: '#122028'
        },
        currency: {
            name: 'Ice Crystals',
            icon: '❄️',
            perClickLabel: 'Crystals per Click',
            perSecondLabel: 'Crystals per Second'
        },
        clickerText: 'Harvest Ice Giants',
        clickerIcon: '🧊',
        headerTitle: '♅ Uranus Ice Harvester ♅',
        headerDisclaimer: '⚠️ The Sideways Planet! ⚠️',
        unlockCost: 30000000000, // 30 billion
        unlockRequirement: 'saturn',
        jailName: 'Frozen Detention',
        jailIcon: '🥶',
        progressionMechanic: 'rotation', // Sideways rotation creates unique cycles
        description: 'Harvest rare ice crystals from the tilted ice giant!'
    },
    
    neptune: {
        id: 'neptune',
        name: 'Neptune',
        icon: '♆',
        theme: {
            primaryColor: '#1e3a8a',
            secondaryColor: '#3b82f6',
            accentColor: '#60a5fa',
            bgColor: '#0a1120',
            cardBg: '#0f1829'
        },
        currency: {
            name: 'Deep Gems',
            icon: '💠',
            perClickLabel: 'Gems per Click',
            perSecondLabel: 'Gems per Second'
        },
        clickerText: 'Deep Core Mining',
        clickerIcon: '💎',
        headerTitle: '♆ Neptune Deep Miner ♆',
        headerDisclaimer: '⚠️ Fastest Winds in the System! ⚠️',
        unlockCost: 100000000000, // 100 billion
        unlockRequirement: 'uranus',
        jailName: 'Deep Sea Prison',
        jailIcon: '🌊',
        progressionMechanic: 'depth', // Mine deeper for better rewards
        description: 'Brave the most extreme winds to find precious gems!'
    },
    
    pluto: {
        id: 'pluto',
        name: 'Pluto',
        icon: '♇',
        theme: {
            primaryColor: '#3a2a3a',
            secondaryColor: '#6a5a6a',
            accentColor: '#9370db',
            bgColor: '#0d0a0d',
            cardBg: '#1a141a'
        },
        currency: {
            name: 'Dark Matter',
            icon: '🌑',
            perClickLabel: 'Matter per Click',
            perSecondLabel: 'Matter per Second'
        },
        clickerText: 'Collect Dark Matter',
        clickerIcon: '🔮',
        headerTitle: '♇ Pluto Mystery Station ♇',
        headerDisclaimer: '⚠️ Never Forget - Pluto is a Planet! ⚠️',
        unlockCost: 500000000000, // 500 billion
        unlockRequirement: 'neptune',
        jailName: 'Exile Station',
        jailIcon: '🌌',
        progressionMechanic: 'mystery', // Random events and discoveries
        description: 'The forgotten planet holds the greatest mysteries!'
    }
};

// Get planets in order
export const planetOrder = ['earth', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
