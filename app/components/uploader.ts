import Component from "@glimmer/component";
import { action } from "@ember/object";
import UploadFile from "ember-file-upload/upload-file";

interface UploaderComponentArgs {}

export default class UploaderComponent extends Component<UploaderComponentArgs> {
  allowedTypes = ["text/csv", "image/gif", "image/jpeg", "image/png"];

  uploadUrl = "http://localhost:8080/upload";

  @action
  validateFile(file: UploadFile) {
    return this.allowedTypes.includes(file.type);
  }

  @action
  async uploadFile(file: UploadFile) {
    try {
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
