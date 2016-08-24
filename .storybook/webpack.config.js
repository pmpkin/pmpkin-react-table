const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test:   /\.scss$/,
        loaders: ['style', 'raw', 'sass'],
        include: [path.resolve(__dirname, '../scss/'), path.resolve(__dirname, '../node_modules/bootstrap-sass/')]
      },
      {
        test: /\.svg$/,
        loader: 'babel!react-svg'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
