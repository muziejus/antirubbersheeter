import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import State from "antirubbersheeter/services/state";
import L from "leaflet";
import type { LeafletEvent, Map } from "leaflet";

interface AntirubbersheeterLeafletEvent extends LeafletEvent {
  target: Map;
}

export default class MapComponent extends Component {
  @service declare state: State;

  get tileUrl() {
    return `${this.state.uploadUrl}s/${this.state.mapUuid}/tiles/{z}/{y}/{x}.png`;
  }

  crs = L.CRS.Simple;

  get maxZoom() {
    return this.state.maxZoom;
  }

  @action handleLoad({ target }: AntirubbersheeterLeafletEvent) {
    const southwestCorner = target.unproject(
      [0, this.state.height],
      this.state.maxZoom
    );
    const northeastCorner = target.unproject(
      [this.state.width, 0],
      this.state.maxZoom
    );
    target.setView([southwestCorner.lat / 2, northeastCorner.lng], 1);
    const bounds = L.latLngBounds(southwestCorner, northeastCorner);
    target.setMaxBounds(bounds);
    target.fitBounds(bounds);
  }
}
