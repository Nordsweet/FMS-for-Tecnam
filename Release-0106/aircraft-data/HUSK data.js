window.NORDSWEET_AIRCRAFT_DATA.register({
  checklists: [],
  dataFileBaseName: "HUSK data",
  displayName: "Aviat A-1A Husky",
  icaoType: "HUSK",
  metadata: {
    defaultPropellerDiameterIn: 72
  },
  order: 6,
  fuelTankCapacityLiters: 197,
  performance: window.HUSK_PERFORMANCE || null,
  performanceStatus: window.HUSK_PERFORMANCE ? "partial" : "pending",
  powerplant: "reciprocating",
  source: window.HUSK_PERFORMANCE
    ? "A-1A Husky take-off, climb, landing, and cruise setting partially loaded"
    : "Performance tables not loaded yet",
  type: "A-1A Husky",
  weightBalance: {
    armsM: {
      baggage: 3.048,
      coPilot: 2.5146,
      firstPassenger: 2.5146,
      fuel: 2.1336,
      pilot: 1.8415,
      secondPassenger: 2.5146
    },
    defaults: {
      emptyArmM: "1.917471",
      emptyWeightKg: "620.22"
    },
    envelope: {
      maxMomentKgm: 1760,
      maxWeightKg: 900,
      minMomentKgm: 1040,
      minWeightKg: 560,
      points: [
        { momentKgm: 1085.877, weightKg: 589.67 },
        { momentKgm: 1622.249, weightKg: 857.29 },
        { momentKgm: 1703.906, weightKg: 857.29 },
        { momentKgm: 1171.999, weightKg: 589.67 }
      ]
    },
    fuelArmM: 2.1336,
    fuelDensityKgPerL: 0.77,
    mtowKg: 857.29,
    source: "A-1A Husky W&B data converted from lb/in to kg/m and kgm.",
    sourceUnits: {
      baggageArmIn: 120,
      emptyMomentKgm: 1189.254154,
      emptyWeightKg: 620.22,
      envelope: "Forward limit: 1300-1890 lb straight line 72.5-74.5 in; aft limit: 78.25 in.",
      fuelArmIn: 84,
      mtowLb: 1890,
      paxArmIn: 99,
      pilotArmIn: 72.5
    }
  }
});
