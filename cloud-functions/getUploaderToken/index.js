const functions = require("@google-cloud/functions-framework");
const { google } = require("googleapis");
const { v4 } = require("uuid");

functions.http("getUploaderToken", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  const iamcredentials = google.iamcredentials("v1");
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const authClient = await auth.getClient();
  google.options({ auth: authClient });

  const response =
    await iamcredentials.projects.serviceAccounts.generateAccessToken({
      name: "projects/-/serviceAccounts/uploader@antirubberserver.iam.gserviceaccount.com",
      requestBody: {
        scope: ["https://www.googleapis.com/auth/cloud-platform"],
      },
    });

  res.send({ uuid: v4(), ...response.data });
});
