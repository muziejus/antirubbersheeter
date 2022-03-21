import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import UploadFile from "ember-file-upload/upload-file";
import Queue from "ember-file-upload/queue";
import { inject as service } from "@ember/service";
import State from "antirubbersheeter/services/state";

interface UploadResponse {
  status: number;
  headers: {};
  body: {
    status: boolean;
    message: string;
    data: {
      csv?: {
        name: string;
      };
      dataInfo: {}[];
      map?: {
        name: string;
      };
      uuid: string;
    };
  };
}

export default class UploaderComponent extends Component {
  @service declare state: State;

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
    } catch (error) {
      console.log(error);
      // file.state = "aborted";
    }
  }

  @action
  async uploadFiles(queue: Queue) {
    try {
      for (const file of queue.files) {
        let fileKey = "map";
        if (file.type === "text/csv") {
          fileKey = "csv";
        }
        const response = (await file.upload(this.uploadUrl, {
          fileKey,
        })) as UploadResponse;
        const { data } = response.body;
        if (data.csv?.name) {
          this.state.placeUuid = data.uuid;
          this.state.placeData = data.dataInfo;
        }
        if (data.map?.name) {
          this.state.mapUuid = data.uuid;
        }
      }

      this.state.typedPlaces = this.typedPlaces;
      this.state.step = "place";

      return this.state.step;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @action
  flushQueue(queue: Queue): void {
    queue.files.forEach(file => queue.remove(file));
    console.log(queue);
  }
}
