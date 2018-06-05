const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.scss$/,
    include: path.resolve(__dirname, "../"),
    loaders: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
      require.resolve('sass-loader'),
    ]
  });
  defaultConfig.resolve.extensions.push(".scss");

  return defaultConfig;
};
