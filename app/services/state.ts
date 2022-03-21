import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class StateService extends Service {
  @tracked
  step: "upload" | "place" | "download" = "upload";

  uploadUrl = "http://localhost:8080/upload";

  @tracked placeUuid = "";

  @tracked mapUuid = "";

  @tracked typedPlaces = "";

  @tracked placeData = [{}];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    state: StateService;
  }
}
