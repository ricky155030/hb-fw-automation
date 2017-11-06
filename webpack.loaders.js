var path = require('path')

module.exports = {
  rules: [
    {
      test: /\.js?$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, 'app/js')
    },
    { 
      test: /\.css$/, 
      loaders: [
        'style-loader',
        'css-loader'
      ],
      include: [
        path.resolve(__dirname, './node_modules'),
        path.resolve(__dirname, './app/css'),
      ]
    },
    { 
      test: /\.css$/, 
      loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      ],
      include: path.resolve(__dirname, './app/js')
    }
  ]
}
