Package.describe({
  summary: "Dependency tracker to allow reactive callbacks",
  version: '1.1.3'
});

Package.onUse(function (api) {
  api.use('ecmascript');
  api.export('Tracker');
  api.export('Deps');
  api.addFiles('tracker.js');
  api.addFiles('deprecated.js');
});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('test-helpers');
  api.use('tracker');
  api.addFiles('tracker_tests.js', 'client');
});
