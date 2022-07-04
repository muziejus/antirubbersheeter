import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class StateService extends Service {
  @tracked
  step: "upload" | "place" | "download" = "upload";

  @tracked packageUuid = "";

  @tracked width = 0;

  @tracked height = 0;

  @tracked maxZoom = 0;

  @tracked mapUuid = "";

  @tracked inputtedPlaceNames = "";

  @tracked csvUuid = "";

  @tracked placesData: Record<string, string | number>[] = [];

  @tracked placesDataNameColumn = "name";

  @tracked places: Place[] = [];

  @tracked zipfileUri = "";

  uploadsBucket = "https://antirubberserver-uploads.storage.googleapis.com";

  tokenFunction =
    "https://us-east4-antirubberserver.cloudfunctions.net/getUploaderToken";
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    state: StateService;
  }
}
