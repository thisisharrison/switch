const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.(ts|tsx)$/,
    //             loader: "awesome-typescript-loader",
    //         },
    //         {
    //             enforce: "pre",
    //             test: /\.js$/,
    //             loader: "source-map-loader",
    //         },
    //         {
    //             test: /\.css$/,
    //             loader: "css-loader",
    //         },
    //     ],
    // },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
        }),
    ],
};
