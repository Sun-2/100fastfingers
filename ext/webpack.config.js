const path = require("path");

/* Plugins */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");

const distDir = path.resolve(__dirname, "dist");
const backgroundDir = path.resolve(__dirname, "src", "background");
const popupDir = path.resolve(__dirname, "src", "popup");
const contentDir = path.resolve(__dirname, "src", "content");

const env = process.env.NODE_ENV || "development";

const cleanWebpackPlugin =
  env === "production"
    ? new CleanWebpackPlugin()
    : () => {
        this.apply = () => {};
      };

module.exports = {
  mode: env,
  devtool: "cheap-source-map",
  entry: {
    background: path.resolve(backgroundDir, "index.ts"),
    popup: path.resolve(popupDir, "index.tsx"),
    content: path.resolve(contentDir, "index.ts"),
  },
  output: {
    path: distDir,
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          projectReferences: true
        },
      },
      {
        test: /\.(gif|png|jpg|jpeg|webm)$/,
        loader: "file-loader"
      }
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
    new HtmlWebpackPlugin({
      inject: "body",
      filename: "popup.html",
      title: "100fastfingers",
      chunks: ["popup"],
      template: path.resolve(popupDir, "index.html"),
    }),
    new DefinePlugin({
      NODE_ENV: JSON.stringify(env),
    }),
    cleanWebpackPlugin,
  ],
};
