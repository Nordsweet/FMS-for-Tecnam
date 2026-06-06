window.NORDSWEET_AIRCRAFT_DATA.register({
  checklists: [],
  dataFileBaseName: "R172K data",
  displayName: "Cessna R172K",
  icaoType: "C172",
  order: 8,
  performance: window.R172K_PERFORMANCE || null,
  performanceStatus: window.R172K_PERFORMANCE ? "partial" : "pending",
  powerplant: "reciprocating",
  source: window.R172K_PERFORMANCE ? "R172K take-off, climb, cruise, landing and W&B data loaded" : "R172K W&B data loaded. Performance tables not loaded yet",
  type: "R172K",
  weightBalance: {
    armsM: {
      baggage: 2.413,
      coPilot: 0.9398,
      firstPassenger: 1.8542,
      fuel: 1.218163,
      pilot: 0.9398,
      secondPassenger: 1.8542
    },
    defaults: {
      coPilotWeightKg: "100",
      emptyArmM: "0.941",
      emptyWeightKg: "757",
      firstPassengerWeightKg: "70",
      fuelRequiredLiters: "27",
      pilotWeightKg: "70",
      secondPassengerWeightKg: "70",
      usableFuelLiters: "72"
    },
    envelope: {
      maxMomentKgm: 3540.191,
      maxWeightKg: 1156.661,
      minMomentKgm: 1032.304,
      minWeightKg: 725.748,
      points: [
        { momentKgm: 1032.304, weightKg: 725.748 },
        { momentKgm: 1527.717, weightKg: 884.505 },
        { momentKgm: 3070.124, weightKg: 1156.661 },
        { momentKgm: 3540.191, weightKg: 1156.661 },
        { momentKgm: 1382.55, weightKg: 725.748 }
      ]
    },
    fuelArmM: 1.218163,
    fuelDensityKgPerL: 0.721,
    mtowKg: 1156.661,
    source: "R172K W&B XLSX converted from kg, liters, inches, pounds and lb-in/1000 to kg, meters and kgm.",
    sourceUnits: {
      baggageArmIn: 95,
      emptyAircraftArmIn: 37.047244,
      emptyAircraftWeightKg: 757,
      defaultCoPilotWeightKg: 100,
      defaultFirstPassengerWeightKg: 70,
      defaultFuelLandingLiters: 45,
      defaultFuelRequiredLiters: 27,
      defaultFuelTakeoffLiters: 72,
      defaultPilotWeightKg: 70,
      defaultSecondPassengerWeightKg: 70,
      fuelArmIn: 47.959184,
      fuelDensityKgPerL: 0.721,
      frontSeatArmIn: 37,
      mtowLb: 2550,
      oilArmIn: 0,
      oilWeightKg: 8.5,
      rearSeatArmIn: 73,
      weightBalanceEnvelope: "CG inches / weight lb points: 56/1600, 68/1950, 104.5/2550, 120.5/2550, 75/1600"
    }
  }
});
