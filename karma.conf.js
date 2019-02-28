const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  // prep your webpack config for karma
  delete webpackConfig.entry;
  webpackConfig.devtool = 'inline-source-map';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha'
    ],


    // list of files / patterns to load in the browser
    files: [
      'karma.loader.js'
    ],

    plugins: [
      'karma-chrome-launcher', 'karma-chai', 'karma-mocha',
      'karma-sourcemap-loader', 'karma-webpack',
      'karma-mocha-reporter'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'karma.loader.js': ['webpack', 'sourcemap']
    },


    // kind of a copy of your webpack config
    webpack: webpackConfig,

    webpackServer: {
      noInfo: true, // don't spam the console when running in karma
      progress: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'mocha'
    ],


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Chrome'
    ],

    singleRun: true
  });
};
