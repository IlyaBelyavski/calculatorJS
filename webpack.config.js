const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        entry: "./src/script.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: isProduction ? "bundle.[contenthash].js" : "bundle.js",
            clean: true,
        },
        mode: isProduction ? "production" : "development",
        devtool: isProduction ? false : "source-map",
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: isProduction
                    ? {
                        collapseWhitespace: true,
                        removeComments: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    }
                    : false,
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? "[name].[contenthash].css" : "[name].css",
            }),
        ],
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, "dist"),
            },
            compress: true,
            port: 9000,
            open: true,
        },
    };
};
