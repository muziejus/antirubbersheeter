module.exports = function (api) {
  // const { NODE_ENV } = process.env;
  api.cache(() => "production");
  // api.cache(() => NODE_ENV);
  // api.env();

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
            esmodules: false,
          },
          useBuiltIns: "entry",
          corejs: 3,
          modules: "commonjs",
        },
      ],
      "@babel/preset-typescript",
    ],
    plugins: [
      "@babel/plugin-transform-modules-commonjs",
      "@babel/plugin-transform-runtime",
    ],
  };
};
