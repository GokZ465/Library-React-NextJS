// next.config.js
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(__dirname, "src", "sw.js"),
              to: path.join(__dirname, "public", "service-worker.js"),
            },
          ],
        })
      );
    }
    return config;
  },
};
