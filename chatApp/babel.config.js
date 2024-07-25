module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@models': './src/models',
          '@contexts': './src/contexts',
          '@containers': './src/containers',
          '@constants': './src/constants',
          '@assets': './src/assets',
          '@notifications': './src/notifications',
        },
      },
    ],
  ],
};
