import functions from "@google-cloud/functions-framework";

// Register a CloudEvent callback with the Functions Framework that will
// be triggered by Cloud Storage.
export const tileUpload = functions.cloudEvent("tileUpload", (cloudEvent) => {
  console.log(`Event ID: ${cloudEvent.id}`);
  console.log(`Event Type: ${cloudEvent.type}`);

  const file = cloudEvent.data;
  const pathArray = file.name.split("/");
  const fileName = pathArray[pathArray.length - 1];
});
// [END functions_cloudevent_storage]
