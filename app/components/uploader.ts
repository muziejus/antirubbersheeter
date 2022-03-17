import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import UploadFile from "ember-file-upload/upload-file";

interface UploaderComponentArgs {
  bingo: undefined;
}

export default class UploaderComponent extends Component<UploaderComponentArgs> {
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
  async uploadFile(file: UploadFile) {
    try {
      const { type } = file;
      type === "text/csv"
        ? (this.csvUploaded = true)
        : (this.mapUploaded = true);
      // let fileKey = "map";
      // if (file.type === "text/csv") {
      //   fileKey = "csv";
      // }
      console.log(file.queue?.files.map(f => f.name));
      // const response = await file.upload(this.uploadUrl, { fileKey });
      // console.log("got response", response);
      // return response;
    } catch (error) {
      console.log(error);
      // file.state = "aborted";
    }
  }
}
