// Jail mechanics for all planets

// Mercury Jail - Solar Detention
export const mercuryJailUpgradesData = [
    { id: 'mercury_jail_1', name: 'Reflective Coating', icon: '🪞', description: 'Deflect heat. +2 freedom per click.', cost: 40, effect: { type: 'clickBonus', value: 2 } },
    { id: 'mercury_jail_2', name: 'Solar Shield', icon: '🛡️', description: 'Better protection. +5 freedom per click.', cost: 160, effect: { type: 'clickBonus', value: 5 } },
    { id: 'mercury_jail_3', name: 'Crater Escape Route', icon: '⛏️', description: 'Dig through rock. +12 freedom per click.', cost: 640, effect: { type: 'clickBonus', value: 12 } },
    { id: 'mercury_jail_4', name: 'Polar Ice Tools', icon: '🧊', description: 'Use ice for escape. +30 freedom per click.', cost: 2500, effect: { type: 'clickBonus', value: 30 } },
    { id: 'mercury_jail_5', name: 'Solar Flare Distraction', icon: '☀️', description: 'Use the sun. +75 freedom per click.', cost: 10000, effect: { type: 'clickBonus', value: 75 } }
];

export const mercuryJailAutoClickersData = [
    { id: 'mercury_jail_auto_1', name: 'Heat Bot Helper', icon: '🤖', description: 'Automated assistance.', baseCost: 80, freedomPerSecond: 0.8 },
    { id: 'mercury_jail_auto_2', name: 'Solar Panel Hack', icon: '☀️', description: 'Power your escape.', baseCost: 640, freedomPerSecond: 5.5 },
    { id: 'mercury_jail_auto_3', name: 'Crater Network', icon: '🕸️', description: 'Underground passages.', baseCost: 5000, freedomPerSecond: 40 },
    { id: 'mercury_jail_auto_4', name: 'Temperature Controller', icon: '🌡️', description: 'Master the environment.', baseCost: 40000, freedomPerSecond: 320 }
];

// Venus Jail - Pressure Chamber
export const venusJailUpgradesData = [
    { id: 'venus_jail_1', name: 'Reinforced Suit', icon: '🧑‍🚀', description: 'Survive crushing force. +3 freedom per click.', cost: 60, effect: { type: 'clickBonus', value: 3 } },
    { id: 'venus_jail_2', name: 'Acid Neutralizer', icon: '🧪', description: 'Counter the clouds. +8 freedom per click.', cost: 240, effect: { type: 'clickBonus', value: 8 } },
    { id: 'venus_jail_3', name: 'Cloud Platform Access', icon: '☁️', description: 'Reach higher levels. +18 freedom per click.', cost: 960, effect: { type: 'clickBonus', value: 18 } },
    { id: 'venus_jail_4', name: 'Pressure Relief Valve', icon: '💨', description: 'Reduce the crush. +45 freedom per click.', cost: 3800, effect: { type: 'clickBonus', value: 45 } },
    { id: 'venus_jail_5', name: 'Volcanic Eruption Plan', icon: '🌋', description: 'Chaos = escape. +112 freedom per click.', cost: 15000, effect: { type: 'clickBonus', value: 112 } }
];

export const venusJailAutoClickersData = [
    { id: 'venus_jail_auto_1', name: 'Pressure Bot', icon: '🤖', description: 'Withstand the crush.', baseCost: 120, freedomPerSecond: 1.2 },
    { id: 'venus_jail_auto_2', name: 'Acid Scrubber', icon: '🧼', description: 'Clean your path.', baseCost: 960, freedomPerSecond: 8 },
    { id: 'venus_jail_auto_3', name: 'Cloud Lifter', icon: '☁️', description: 'Float to freedom.', baseCost: 7500, freedomPerSecond: 60 },
    { id: 'venus_jail_auto_4', name: 'Diamond Drill', icon: '💎', description: 'Cut through anything.', baseCost: 60000, freedomPerSecond: 480 }
];

// Jupiter Jail - Storm Prison
export const jupiterJailUpgradesData = [
    { id: 'jupiter_jail_1', name: 'Wind Resistant Gear', icon: '💨', description: 'Fight the gale. +5 freedom per click.', cost: 100, effect: { type: 'clickBonus', value: 5 } },
    { id: 'jupiter_jail_2', name: 'Lightning Rod', icon: '⚡', description: 'Channel the power. +12 freedom per click.', cost: 400, effect: { type: 'clickBonus', value: 12 } },
    { id: 'jupiter_jail_3', name: 'Storm Rider', icon: '🌀', description: 'Ride the winds. +28 freedom per click.', cost: 1600, effect: { type: 'clickBonus', value: 28 } },
    { id: 'jupiter_jail_4', name: 'Red Spot Navigator', icon: '🔴', description: 'Chart the storm. +70 freedom per click.', cost: 6400, effect: { type: 'clickBonus', value: 70 } },
    { id: 'jupiter_jail_5', name: 'Moon Escape Pod', icon: '🌙', description: 'Flee to a moon. +175 freedom per click.', cost: 25000, effect: { type: 'clickBonus', value: 175 } }
];

export const jupiterJailAutoClickersData = [
    { id: 'jupiter_jail_auto_1', name: 'Storm Tracker', icon: '🛰️', description: 'Monitor conditions.', baseCost: 200, freedomPerSecond: 2 },
    { id: 'jupiter_jail_auto_2', name: 'Wind Harvester', icon: '💨', description: 'Use storm power.', baseCost: 1600, freedomPerSecond: 14 },
    { id: 'jupiter_jail_auto_3', name: 'Europa Smuggler', icon: '🌊', description: 'Ocean moon contacts.', baseCost: 12500, freedomPerSecond: 100 },
    { id: 'jupiter_jail_auto_4', name: 'Io Volcano Diversion', icon: '🌋', description: 'Create chaos.', baseCost: 100000, freedomPerSecond: 800 }
];

// Saturn Jail - Ring Penitentiary
export const saturnJailUpgradesData = [
    { id: 'saturn_jail_1', name: 'Ring Hopper', icon: '💍', description: 'Jump between rings. +6 freedom per click.', cost: 150, effect: { type: 'clickBonus', value: 6 } },
    { id: 'saturn_jail_2', name: 'Ice Pick Tools', icon: '⛏️', description: 'Mine your way out. +15 freedom per click.', cost: 600, effect: { type: 'clickBonus', value: 15 } },
    { id: 'saturn_jail_3', name: 'Titan Methane Fuel', icon: '🏞️', description: 'Power boost. +35 freedom per click.', cost: 2400, effect: { type: 'clickBonus', value: 35 } },
    { id: 'saturn_jail_4', name: 'Enceladus Geyser Ride', icon: '💧', description: 'Surf to freedom. +87 freedom per click.', cost: 9500, effect: { type: 'clickBonus', value: 87 } },
    { id: 'saturn_jail_5', name: 'Ring Lord Favor', icon: '👑', description: 'Get help from above. +217 freedom per click.', cost: 38000, effect: { type: 'clickBonus', value: 217 } }
];

export const saturnJailAutoClickersData = [
    { id: 'saturn_jail_auto_1', name: 'Ring Sweeper Bot', icon: '🤖', description: 'Clean escape path.', baseCost: 300, freedomPerSecond: 3 },
    { id: 'saturn_jail_auto_2', name: 'Shepherd Moon Ally', icon: '🌙', description: 'Gravitational help.', baseCost: 2400, freedomPerSecond: 21 },
    { id: 'saturn_jail_auto_3', name: 'Cassini Hack', icon: '🛰️', description: 'Old probe tech.', baseCost: 19000, freedomPerSecond: 150 },
    { id: 'saturn_jail_auto_4', name: 'Hexagon Storm Escape', icon: '⬡', description: 'Mystery power.', baseCost: 150000, freedomPerSecond: 1200 }
];

// Uranus Jail - Frozen Detention
export const uranusJailUpgradesData = [
    { id: 'uranus_jail_1', name: 'Thermal Suit', icon: '🧥', description: 'Stay warm. +8 freedom per click.', cost: 200, effect: { type: 'clickBonus', value: 8 } },
    { id: 'uranus_jail_2', name: 'Tilt Compensator', icon: '🔄', description: 'Handle sideways world. +18 freedom per click.', cost: 800, effect: { type: 'clickBonus', value: 18 } },
    { id: 'uranus_jail_3', name: 'Miranda Climbing Gear', icon: '🏔️', description: 'Conquer cliffs. +42 freedom per click.', cost: 3200, effect: { type: 'clickBonus', value: 42 } },
    { id: 'uranus_jail_4', name: 'Methane Torch', icon: '🔥', description: 'Melt your way out. +105 freedom per click.', cost: 12800, effect: { type: 'clickBonus', value: 105 } },
    { id: 'uranus_jail_5', name: 'Ice Giant Rebellion', icon: '❄️', description: 'Mass breakout. +262 freedom per click.', cost: 51000, effect: { type: 'clickBonus', value: 262 } }
];

export const uranusJailAutoClickersData = [
    { id: 'uranus_jail_auto_1', name: 'Ice Breaker Bot', icon: '🤖', description: 'Crack the frost.', baseCost: 400, freedomPerSecond: 4 },
    { id: 'uranus_jail_auto_2', name: 'Titania Tunneler', icon: '⛏️', description: 'Underground network.', baseCost: 3200, freedomPerSecond: 28 },
    { id: 'uranus_jail_auto_3', name: 'Umbriel Shadow Walker', icon: '🌑', description: 'Hide in darkness.', baseCost: 25000, freedomPerSecond: 200 },
    { id: 'uranus_jail_auto_4', name: 'Rotation Exploiter', icon: '🔄', description: 'Use unique spin.', baseCost: 200000, freedomPerSecond: 1600 }
];

// Neptune Jail - Deep Sea Prison
export const neptuneJailUpgradesData = [
    { id: 'neptune_jail_1', name: 'Deep Dive Suit', icon: '🤿', description: 'Withstand pressure. +10 freedom per click.', cost: 250, effect: { type: 'clickBonus', value: 10 } },
    { id: 'neptune_jail_2', name: 'Windsurfing', icon: '💨', description: '2,100 km/h escape. +22 freedom per click.', cost: 1000, effect: { type: 'clickBonus', value: 22 } },
    { id: 'neptune_jail_3', name: 'Triton Geyser Boost', icon: '💧', description: 'Nitrogen power. +52 freedom per click.', cost: 4000, effect: { type: 'clickBonus', value: 52 } },
    { id: 'neptune_jail_4', name: 'Dark Spot Camouflage', icon: '🌀', description: 'Hide in storm. +130 freedom per click.', cost: 16000, effect: { type: 'clickBonus', value: 130 } },
    { id: 'neptune_jail_5', name: 'Ocean God Blessing', icon: '🔱', description: 'Divine intervention. +325 freedom per click.', cost: 64000, effect: { type: 'clickBonus', value: 325 } }
];

export const neptuneJailAutoClickersData = [
    { id: 'neptune_jail_auto_1', name: 'Wave Rider Bot', icon: '🌊', description: 'Surf to freedom.', baseCost: 500, freedomPerSecond: 5 },
    { id: 'neptune_jail_auto_2', name: 'Wind Speed Exploiter', icon: '💨', description: 'Fastest escape.', baseCost: 4000, freedomPerSecond: 35 },
    { id: 'neptune_jail_auto_3', name: 'Triton Retrograde', icon: '🔄', description: 'Backward orbit trick.', baseCost: 32000, freedomPerSecond: 250 },
    { id: 'neptune_jail_auto_4', name: 'Deep Diamond Bribe', icon: '💎', description: 'Buy your way out.', baseCost: 256000, freedomPerSecond: 2000 }
];

// Pluto Jail - Exile Station
export const plutoJailUpgradesData = [
    { id: 'pluto_jail_1', name: 'Never Forget Protocol', icon: '✊', description: 'Rebellion spirit. +12 freedom per click.', cost: 300, effect: { type: 'clickBonus', value: 12 } },
    { id: 'pluto_jail_2', name: 'Charon Ferry', icon: '🌙', description: 'Moon transport. +28 freedom per click.', cost: 1200, effect: { type: 'clickBonus', value: 28 } },
    { id: 'pluto_jail_3', name: 'Heart of Ice Tunnel', icon: '❤️', description: 'Through the plains. +65 freedom per click.', cost: 4800, effect: { type: 'clickBonus', value: 65 } },
    { id: 'pluto_jail_4', name: 'Kuiper Belt Escape', icon: '🚪', description: 'Lost in objects. +162 freedom per click.', cost: 19200, effect: { type: 'clickBonus', value: 162 } },
    { id: 'pluto_jail_5', name: 'Dark Matter Cloak', icon: '🌌', description: 'Become invisible. +405 freedom per click.', cost: 76800, effect: { type: 'clickBonus', value: 405 } }
];

export const plutoJailAutoClickersData = [
    { id: 'pluto_jail_auto_1', name: 'Dwarf Planet Pride', icon: '✊', description: 'Underdog power.', baseCost: 600, freedomPerSecond: 6 },
    { id: 'pluto_jail_auto_2', name: 'Five Moon Network', icon: '🔭', description: 'All moons help.', baseCost: 4800, freedomPerSecond: 42 },
    { id: 'pluto_jail_auto_3', name: 'Mystery Vault Access', icon: '🗝️', description: 'Ancient secrets.', baseCost: 38000, freedomPerSecond: 300 },
    { id: 'pluto_jail_auto_4', name: 'Ninth Planet Resurrection', icon: '9️⃣', description: 'Ultimate freedom.', baseCost: 304000, freedomPerSecond: 2400 }
];
