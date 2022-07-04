const { PubSub } = require("@google-cloud/pubsub");
const functions = require("@google-cloud/functions-framework");

functions.http("publishUpload", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  const pubSubClient = new PubSub();
  const dataBuffer = Buffer.from(JSON.stringify({ uuid: req.body.uuid }));

  try {
    const messageId = await pubSubClient
      .topic("upload")
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
});
