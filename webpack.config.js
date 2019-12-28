const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/bootstrap.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Tetris"
    })
  ],
  devServer: {
    contentBase: "./dist"
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      enums: path.resolve(__dirname, "src/enums/"),
      types: path.resolve(__dirname, "src/types/"),
      datas: path.resolve(__dirname, "src/datas/")
    }
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
