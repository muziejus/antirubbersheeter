"use strict";
const path = require("path");

const appEntry = path.join(__dirname, "app");
const relevantFilesGlob = "**/*.{html,js,ts,hbs,gjs,gts}";

module.exports = {
  content: [path.join(appEntry, relevantFilesGlob)],
  theme: {
    extend: {},
    fontFamily: {
      title: ["Herr Von Muellerhoff", "cursive"],
    },
  },
  plugins: [],
};
