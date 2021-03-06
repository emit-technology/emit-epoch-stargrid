const webpack = require('webpack');
const path = require("path");
module.exports = function override(config, env) {
    // config.output.path = path.join(__dirname,"docs");
    //do stuff with the webpack config...
    let loaders = config.resolve
    loaders.fallback = {
        "tls": false,
        "net": false,
        "zlib": require.resolve("browserify-zlib") ,
        "path": require.resolve("path-browserify"),
        "util": require.resolve("util/"),
        url: require.resolve('url'),
        fs: require.resolve('fs'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
    }
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        })
    )
    return config;
}
