module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
          configs: './src/configs',
          constants: './src/constants',
          hooks: './src/hooks',
          routes: './src/routes',
          styles: './src/styles',
          screens: './src/screens',
          utils: './src/utils',
          contexts: './src/contexts',
          types: './src/types',
          assets: './src/assets',
          'components/core': './src/components/core',
          app: './src/app',
          api: './src/api',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
