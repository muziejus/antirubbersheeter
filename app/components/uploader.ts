import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import UploadFile from "ember-file-upload/upload-file";
import Queue from "ember-file-upload/queue";

interface UploaderComponentArgs {
  bingo: undefined;
}

export default class UploaderComponent extends Component<UploaderComponentArgs> {
  get uploadButtonDisabled() {
    return !(this.mapUploaded && (this.csvUploaded || this.typedPlaces));
  }
  @tracked typedPlaces = "";

  @tracked errorMessage = "";

  @tracked showError = false;

  @tracked mapUploaded = false;

  @tracked csvUploaded = false;

  allowedTypes = ["text/csv", "image/tiff", "image/jpeg", "image/png"];

  uploadUrl = "http://localhost:8080/upload";

  @action
  validateFile({ type }: UploadFile) {
    let allowed = this.allowedTypes.includes(type);
    if (type === "text/csv" && this.csvUploaded) {
      this.errorMessage = "Error: Only add one .csv file, please.";
      this.showError = true;
      allowed = false;
    }
    if (allowed) {
      this.errorMessage = "Error: Only images and .csv files can be uploaded.";
      this.showError = false;
    } else {
      this.showError = true;
    }

    return allowed;
  }

  @action
  async addFile(file: UploadFile) {
    try {
      const { type } = file;
      type === "text/csv"
        ? (this.csvUploaded = true)
        : (this.mapUploaded = true);
      // let fileKey = "map";
      // if (file.type === "text/csv") {
      //   fileKey = "csv";
      // }
      // const response = await file.upload(this.uploadUrl, { fileKey });
      // console.log("got response", response);
      // return response;
    } catch (error) {
      console.log(error);
      // file.state = "aborted";
    }
  }

  @action
  async uploadFiles(queue: Queue) {
    return queue;
  }

  @action
  flushQueue(queue: Queue): void {
    console.log("fixina flush the q");
    queue.files.forEach(file => queue.remove(file));
    console.log(queue);
  }
}
