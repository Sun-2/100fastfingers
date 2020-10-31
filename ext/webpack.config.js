const path = require("path");

/* Plugins */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

const distDir = path.resolve(__dirname, "dist");
const backgroundDir = path.resolve(__dirname, "src", "background");
const popupDir = path.resolve(__dirname, "src", "popup");

module.exports = {
  watch: nodeEnv === "watch",
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
    new HtmlWebpackPlugin({
      inject: "body",
      filename: "popup.html",
      title: "100fastfingers",
      chunks: ["popup"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "manifest.json"),
          to: path.join(distDir, "manifest.json"),
          toType: "file",
        },
      ],
    }),
  ],
};
