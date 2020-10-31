const path = require("path");

/* Plugins */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const distDir = path.resolve(__dirname, "dist");
const backgroundDir = path.resolve(__dirname, "src", "background");
const popupDir = path.resolve(__dirname, "src", "popup");

module.exports = {
  devtool: "cheap-source-map",
  entry: {
    background: path.resolve(backgroundDir, "index.ts"),
    popup: path.resolve(popupDir, "index.ts"),
  },
  output: {
    path: distDir,
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "manifest.json"),
          to: path.join(distDir, "manifest.json"),
          toType: "file",
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: "body",
      filename: "popup.html",
      title: "100fastfingers",
      chunks: ["popup"],
      template: path.resolve(popupDir, "index.html"),
    }),
  ],
};
