module.exports = {
  test: /\.js$/,
  exclude: /node_modules[/\\](?!react-native-vector-icons|react-native-safe-area-view|react-native-multi-slider|react-native-calendars|react-native-collapsible)/,
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
};
