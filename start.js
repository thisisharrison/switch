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

function createDevServer() {
    const config = {
        mode: "development",
        entry: ["webpack-dev-server/client?https://0.0.0.0:7228", "webpack/hot/dev-server", `${env.src}/index.tsx`],
        output: {
            filename: "static/js/[name].js",
            publicPath: "/",
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
                    use: [
                        "style-loader",
                        "css-loader",
                    ],
                }
            ],
        },
        plugins: [
            new HTMLPlugin({template: `${env.src}/index.html`}),
            new webpack.HotModuleReplacementPlugin(),
        ],
    };
    return new DevServer(webpack(config), {
        historyApiFallback: true,
        hot: true,
        compress: true,
        overlay: {warnings: true, errors: true},
        stats: {colors: true},
    });
}

function start() {
    const server = createDevServer();
    server.listen(7228, "0.0.0.0", error => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.info("Starting dev server on http://localhost:7228 ...\n");
        return null;
    });

    ["SIGINT", "SIGTERM"].forEach(signal => {
        process.on(signal, () => {
            server.close();
            process.exit();
        });
    });
}

start();
