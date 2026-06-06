window.NORDSWEET_AIRCRAFT_DATA.register({
  checklists: [],
  dataFileBaseName: "FR172H data",
  displayName: "Reims-Cessna FR172H Reims Rocket",
  icaoType: "C172",
  order: 7,
  performance: window.FR172H_PERFORMANCE || null,
  performanceStatus: window.FR172H_PERFORMANCE ? "partial" : "pending",
  powerplant: "reciprocating",
  source: window.FR172H_PERFORMANCE ? "FR172H cruise performance tables loaded" : "Performance tables not loaded yet",
  type: "FR172H"
});
