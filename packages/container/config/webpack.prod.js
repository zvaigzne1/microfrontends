const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

// In future we will know this domain value, env.variable is going to contain string 
// that shows exactly where production application is actually hosted
// will be defined when we build our application throught CI/CD pipeline
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js"
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                // We make asumption that this specific remoteEntry file will be in folder "marketing"
                // We must make sure that remoteEntry files won't overwrite each other
                marketing: `marketing@${domain}/marketing/remoteEntry.js`
            },
            shared: packageJson.dependencies,
        })
    ]
};

module.exports = merge(commonConfig, prodConfig);