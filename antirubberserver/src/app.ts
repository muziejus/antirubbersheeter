/* eslint-env node */
import express from "express";
import { google } from "googleapis";

const app = express();
const iamcredentials = google.iamcredentials("v1");

app.get("/", (_, res) => {
  res.send("dog it's root");
});

app.get("/api", async (_, res) => {
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
