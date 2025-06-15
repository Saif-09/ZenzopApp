module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Keep your existing plugin
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // Name of the module to import variables from
        path: '.env', // Path to your .env file
        blacklist: null, // Optional: Specify variables to exclude (null means none)
        whitelist: null, // Optional: Specify variables to include (null means all)
        safe: false, // Set to true to throw errors if variables are missing
        allowUndefined: true, // Allow undefined variables without throwing errors
      },
    ],
  ],
};
