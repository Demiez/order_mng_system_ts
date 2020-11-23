module.exports = function (config) {
  config.set({
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress'],
    tsconfigFile: 'tsconfig.json',
    testRunner: 'mocha',
    mochaOptions: {
      spec: ['test/**/*.spec.ts'],
      require: ['ts-node/register', 'source-map-support/register'],
      ui: 'bdd',
      timeout: 35000,
    },
    coverageAnalysis: 'perTest',
    mutate: ['src/**/*.ts'],
    symlinkNodeModules: false,
  });
};
