const functions = require("@google-cloud/functions-framework");
const { google } = require("googleapis");

functions.http("getUploaderToken", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");

  if (req.method === "OPTIONS") {
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

  console.log("response below");
  console.log(response.data);

  res.send(response.data);
});
