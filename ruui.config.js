const env = () => process.env.ENV || 'development',
  isProduction = env() === 'production';

module.exports = {
  env,
  publicPath: isProduction ? '/' : 'https://heyday1515.github.io/To-do-app/',
};
