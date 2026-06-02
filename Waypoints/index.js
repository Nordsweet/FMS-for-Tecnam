(function () {
  const packageFiles = [
    "./Waypoints/Poland.js"
  ];

  window.NORDSWEET_WAYPOINT_PACKAGE_FILES = packageFiles.slice();

  packageFiles.forEach((src) => {
    document.write('<script src="' + src + '"></script>');
  });
})();
