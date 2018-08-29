const path = require('path');
const tsconfig = require('tsconfig-paths-webpack-plugin');

console.log("hello..")

module.exports = {
    mode: 'none',
    entry: '../src/app.tsx',
    output: {
        path: path.resolve('../../wwwroot/'),
        filename: 'application.js'
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader'}
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
        modules: [
            "../compile/node_modules",
            "../compile/node_modules/@types",
            "../compile/node_modules/@types/react"
        ],

        //plugins: [
        //    new tsconfig({
        //        configFile: "./tsconfig.json",
        //        baseUrl: '../src/'
        //    })
        //]
    }
}