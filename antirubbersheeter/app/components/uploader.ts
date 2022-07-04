import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { UploadFile, Queue } from "ember-file-upload";
import { service } from "@ember/service";
import State from "antirubbersheeter/services/state";

export default class UploaderComponent extends Component {
  @service declare state: State;

  get uploadButtonDisabled() {
    return !(this.mapUploaded && (this.csvUploaded || this.inputtedPlaceNames));
  }

  @tracked inputtedPlaceNames = "";

  @tracked errorMessage = "";

  @tracked showError = false;

  @tracked mapUploaded = false;

  @tracked csvUploaded = false;

  allowedTypes = ["text/csv", "image/tiff", "image/jpeg", "image/png"];

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
    } catch (error) {
      console.log(error);
      // file.state = "aborted";
    }
  }

  @action
  async uploadFiles(queue: Queue) {
    const tokenResponse = await fetch(this.state.tokenFunction, {
      method: "POST",
    });

    const { uuid, accessToken } = await tokenResponse.json();
    this.state.packageUuid = uuid;

    try {
      for (const file of queue.files) {
        const response = await file.uploadBinary(
          `${this.state.uploadsBucket}/${this.state.packageUuid}/${file.name}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              ContentLength: file.size.toString(),
            },
            method: "PUT",
          }
        );

        if (response.status === 200) {
          console.log("status 200");
        }
      }
      // const { data } = response.body;
      // if (data.csv?.name) {
      //   this.state.csvUuid = data.uuid;
      //   this.state.placesData = data.dataInfo;
      // }
      // if (data.map?.name) {
      //   this.state.mapUuid = data.uuid;
      //   this.state.width = data.tileInfo.width;
      //   this.state.height = data.tileInfo.height;
      //   this.state.maxZoom = data.map.maxZoom;
      // }
      // }
      // this.state.inputtedPlaceNames = this.inputtedPlaceNames;
      // this.state.step = "place";
      // return this.state.step;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @action
  flushQueue(queue: Queue): void {
    queue.files.forEach(file => queue.remove(file));
  }
}
