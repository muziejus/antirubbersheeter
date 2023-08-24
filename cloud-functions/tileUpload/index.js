import functions from "@google-cloud/functions-framework";

// Register a CloudEvent callback with the Functions Framework that will
// be triggered by Cloud Storage.
export const tileUpload = functions.cloudEvent("tileUpload", (cloudEvent) => {
  console.log(`Event ID: ${cloudEvent.id}`);
  console.log(`Event Type: ${cloudEvent.type}`);

  const file = cloudEvent.data;
  console.log(`Bucket: ${file.bucket}`);
  console.log(`File: ${file.name}`);
  console.log(`Metageneration: ${file.metageneration}`);
  console.log(`Created: ${file.timeCreated}`);
  console.log(`Updated: ${file.updated}`);
});
// [END functions_cloudevent_storage]
