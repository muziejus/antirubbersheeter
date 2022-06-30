/* eslint-env node */
"use strict";
require("dotenv").config();

const projectId = "antirubberserver";
const bucket = "antirubbersheeter-ember-application";

module.exports = function (deployTarget) {
  let ENV = {
    build: {},
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === "development") {
    ENV.build.environment = "development";
    // configure other plugins for development deploy target here
  }

  if (deployTarget === "staging") {
    ENV.build.environment = "production";
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === "production") {
    ENV.build.environment = "production";

    ENV.prependToFingerprint = `https://storage.googleapis.com/${bucket}/`;

    ENV.build.outputPath = "dist/";

    ENV["revision-data"] = {
      type: "file-hash",
    };

    ENV["display-revisions"] = {
      amount: 10,
      revisions: function (context) {
        return context.revisions;
      },
    };

    ENV["gcs-index"] = {
      projectId,
      bucket,
      keyFilename: "./ember-uploader-keyfile.json",
      allowOverwrite: true,
    };

    ENV["gcloud-storage"] = {
      credentials: {
        private_key: process.env.GCLOUD_EMBER_UPLOADER_KEY,
        client_email: process.env.GCLOUD_EMBER_UPLOADER_EMAIL,
      },
      projectId,
      bucket,
      filePattern: `**/*.{js,svg,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2}`,
    };
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
