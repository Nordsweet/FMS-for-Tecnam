window.NORDSWEET_AIRCRAFT_DATA.register({
  checklists: [],
  dataFileBaseName: "HUSK-data",
  displayName: "Aviat A-1A Husky",
  icaoType: "HUSK",
  metadata: {
    defaultPropellerDiameterIn: 72
  },
  order: 6,
  performance: window.HUSK_PERFORMANCE || null,
  performanceStatus: window.HUSK_PERFORMANCE ? "partial" : "pending",
  powerplant: "reciprocating",
  source: window.HUSK_PERFORMANCE
    ? "A-1A Husky take-off, climb, landing, and cruise setting partially loaded"
    : "Performance tables not loaded yet",
  type: "A-1A Husky"
});
