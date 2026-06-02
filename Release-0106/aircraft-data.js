(function () {
  const root = window.NORDSWEET_AIRCRAFT_DATA || {};
  const profiles = root.profiles && typeof root.profiles === "object" ? root.profiles : {};
  const loadedFiles = root.loadedFiles && typeof root.loadedFiles === "object" ? root.loadedFiles : {};

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function normalizeType(value) {
    return clean(value).toUpperCase();
  }

  function normalizeRegistration(value) {
    return clean(value).toUpperCase().replace(/\s+/g, "");
  }

  function normalizePowerplant(value) {
    const normalized = clean(value).toLowerCase().replace(/[^a-z]+/g, "");
    if (normalized === "turbine") {
      return "turbine";
    }
    if (normalized === "jet") {
      return "jet";
    }
    return "reciprocating";
  }

  function getProfileKey(type, registration) {
    const normalizedType = normalizeType(type);
    const normalizedRegistration = normalizeRegistration(registration);
    return normalizedRegistration ? normalizedType + "|" + normalizedRegistration : normalizedType;
  }

  function register(profile) {
    if (!profile || !profile.type) {
      return null;
    }

    const normalizedType = normalizeType(profile.type);
    const normalizedRegistration = normalizeRegistration(profile.registration);
    const key = getProfileKey(normalizedType, normalizedRegistration);
    profiles[key] = {
      checklists: Array.isArray(profile.checklists) ? profile.checklists : [],
      dataFileBaseName: clean(profile.dataFileBaseName),
      displayName: clean(profile.displayName || normalizedType),
      displayType: clean(profile.type || normalizedType),
      fuelCapacityLiters: Number.isFinite(Number(profile.fuelCapacityLiters)) ? Number(profile.fuelCapacityLiters) : null,
      fuelTankCapacityLiters: Number.isFinite(Number(profile.fuelTankCapacityLiters)) ? Number(profile.fuelTankCapacityLiters) : null,
      icaoType: clean(profile.icaoType || normalizedType).toUpperCase(),
      isRegistrationSpecific: Boolean(normalizedRegistration),
      limitations: profile.limitations || null,
      metadata: profile.metadata || null,
      order: Number.isFinite(Number(profile.order)) ? Number(profile.order) : 999,
      performance: profile.performance || null,
      performanceStatus: clean(profile.performanceStatus || (profile.performance ? "available" : "pending")),
      powerplant: normalizePowerplant(profile.powerplant),
      registration: normalizedRegistration,
      source: clean(profile.source),
      type: normalizedType,
      usableFuelCapacityLiters: Number.isFinite(Number(profile.usableFuelCapacityLiters)) ? Number(profile.usableFuelCapacityLiters) : null,
      weightBalance: profile.weightBalance || null
    };
    return profiles[key];
  }

  function getProfile(type, registration) {
    const exact = profiles[getProfileKey(type, registration)];
    if (exact) {
      return exact;
    }
    return profiles[getProfileKey(type, "")] || null;
  }

  function getDefaultProfiles() {
    return Object.keys(profiles)
      .map((key) => profiles[key])
      .filter((profile) => profile && !profile.isRegistrationSpecific)
      .sort((left, right) => (left.order - right.order) || left.type.localeCompare(right.type));
  }

  window.NORDSWEET_AIRCRAFT_DATA = {
    getDefaultProfiles,
    getProfile,
    getProfileKey,
    loadedFiles,
    normalizePowerplant,
    normalizeRegistration,
    normalizeType,
    profiles,
    register
  };
})();
