module.exports = {
  context: __dirname,
  entry: "./frontend/genius.jsx",
  output: {
    path: "./app/assets/javascripts",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  node: {
    fs: "empty"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devtool: 'source-maps'
};
