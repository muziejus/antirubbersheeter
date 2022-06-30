import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { UploadFile, Queue } from "ember-file-upload";
import { inject as service } from "@ember/service";
import State from "antirubbersheeter/services/state";

interface UploadResponse {
  status: number;
  headers: {};
  body: {
    status: boolean;
    message: string;
    data: {
      tileInfo: {
        format: string;
        width: number;
        height: number;
        channels: number;
        premultiplied: boolean;
        size: number;
      };
      csv?: {
        name: string;
      };
      dataInfo: {}[];
      map?: {
        name: string;
        maxZoom: number;
      };
      uuid: string;
    };
  };
}

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
    console.log("about to try to get a token.");

    const response = await fetch("/api");

    const { accessToken } = await response.json();

    try {
      console.log("trying.");
      for (const file of queue.files) {
        //   const authorization = uploaderToken;
        let fileName = "poopoopsnicker";
        let fileKey = "map";
        if (file.type === "text/csv") {
          fileKey = "csv";
          fileName += ".csv";
        } else if (file.type === "image/png") {
          fileName += ".png";
        } else if (file.type === "image/tiff") {
          fileName += ".tiff";
        } else {
          fileName += ".jpg";
        }
        console.log(`Going to upload ${fileName}`);
        const response = await file.uploadBinary(
          `${this.state.serverUrl}/${fileName}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              ContentLength: file.size,
            },
            method: "PUT",
            fileKey,
          }
        ); //as unknown as UploadResponse;
        console.log("body and header to follow");
        const body = await response.body;
        console.log(body);
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
