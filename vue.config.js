module.exports = {
  //Basic path
  publicPath: "./",
  //File name hash
  filenameHashing: true,
  //Whether to use it when saving`eslint-loader`Inspection
  lintOnSave: true,
  //  Babel loader will skip node modules dependency by default.
  transpileDependencies: ["vuetify"],
  //  Build build for production environment or not source map？
  productionSourceMap: false,
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 1333,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
  },
  parallel: require("os").cpus().length > 1,
};
