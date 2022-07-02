import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class StateService extends Service {
  @tracked
  step: "upload" | "place" | "download" = "upload";

  /*
  @tracked width = 9118;

  @tracked height = 6428;

  @tracked maxZoom = 7;

  @tracked mapUuid = "020bc7c3-9b9a-4766-8f58-91aad87e888e";
*/

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

  serverUrl = "https://antirubberserver-uploads.storage.googleapis.com";

  tokenFunction =
    "https://us-central1-antirubberserver.cloudfunctions.net/getUploaderToken";
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    state: StateService;
  }
}
