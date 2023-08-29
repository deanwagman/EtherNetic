const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: [
    './src/client.js',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', // Add HMR client
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Add HMR plugin
    new webpack.NoEmitOnErrorsPlugin(), // Useful for keeping the console clean from error noise
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/stylesheets/reset.css', to: 'reset.css' }],
    }),
  ],

  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
