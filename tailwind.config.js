"use strict";
const path = require("path");

const appEntry = path.join(__dirname, "app");
const relevantFilesGlob = "**/*.{html,js,ts,hbs,gjs,gts}";

module.exports = {
  content: [path.join(appEntry, relevantFilesGlob)],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#f9f9f9",
      "light-gray": "#efefef",
      tan: "#d2d2c0",
      gray: "#555555",
      blue: "#41516c",
      "dark-blue": "#093552",
    },
    extend: {},
    fontFamily: {
      title: ["Herr Von Muellerhoff", "cursive"],
      serif: ["Hina Mincho", "ui-serif", "Times New Roman", "serif"],
    },
  },
  plugins: [],
};
