const webpack = require("webpack");
const DevServer = require("webpack-dev-server");
const HTMLPlugin = require("html-webpack-plugin");
const path = require("path");

const env = {
    src: resolve("src"),
    tsConfig: resolve("tsconfig.json"),
    stylelintConfig: resolve("stylelint.json"),
    tslintConfig: resolve("tslint.json"),
};

function resolve(relativePath) {
    return path.resolve(__dirname, `./${relativePath}`);
}

module.exports = {
    mode: "production",
    entry: [`${env.src}/index.tsx`],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: [env.src, "node_modules"],
    },
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks: {
            automaticNameDelimiter: "-",
            maxAsyncRequests: 10,
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                include: env.src,
                loader: "ts-loader",
                options: {
                    configFile: env.tsConfig,
                    transpileOnly: true,
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [new HTMLPlugin({template: `${env.src}/index.html`}), new webpack.HotModuleReplacementPlugin()],
};
