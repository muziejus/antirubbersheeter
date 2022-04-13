import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import State from "antirubbersheeter/services/state";
import L from "leaflet";
import type { LeafletEvent, Map } from "leaflet";
import { v4 as randomUUID } from "uuid";

interface AntirubbersheeterLeafletEvent extends LeafletEvent {
  target: Map;
}

export default class MapComponent extends Component {
  @service declare state: State;

  // @tracked columnValue = "";

  get keys() {
    if (this.state.placesData) {
      return Object.keys(this.state.placesData[0]);
    }

    return "";
  }

  get lastPlaceIndex() {
    return this.state.places.length - 1;
  }

  get tileUrl() {
    return `${this.state.uploadUrl}s/${this.state.mapUuid}/tiles/{z}/{y}/{x}.png`;
  }

  get maxZoom() {
    return this.state.maxZoom;
  }

  get jsonedPlaces() {
    return JSON.stringify(this.state.places, null, 2);
  }

  crs = L.CRS.Simple;

  @action handleLoad({ target }: AntirubbersheeterLeafletEvent) {
    const southwestCorner = target.unproject(
      [0, this.state.height],
      this.state.maxZoom
    );
    const northeastCorner = target.unproject(
      [this.state.width, 0],
      this.state.maxZoom
    );

    const center = L.latLng([southwestCorner.lat / 2, northeastCorner.lng / 2]);

    target.setView(center, 1);
    const bounds = L.latLngBounds(southwestCorner, northeastCorner);
    target.setMaxBounds(bounds);
    target.fitBounds(bounds);

    this.setPlaces(center);
  }

  setPlaces(center: L.LatLng) {
    const randomize = (coordinate: number) =>
      coordinate + 2 * (Math.random() - 0.5);

    if (this.state.typedPlaces) {
      this.state.places = this.state.typedPlaces.split(",").map(name => {
        return {
          antirubbersheeterId: randomUUID(),
          name: name.trim(),
          antirubbersheeterLat: randomize(center.lat),
          antirubbersheeterLng: randomize(center.lng),
        };
      });
    } else {
      this.state.placesDataNameColumn = this.keys[0];
      this.state.places = this.state.placesData.map(place => {
        place.antirubbersheeterLat = randomize(center.lat);
        place.antirubbersheeterLng = randomize(center.lng);
        place.antirubbersheeterId = randomUUID();

        return place;
      });
    }
  }

  @action setPlacesDataNameColumn(selection: string) {
    this.state.placesDataNameColumn = selection;
  }

  @action updateCoordinates(el: LeafletEvent) {
    const uuid = el.target.options.title;
    const newLatLng = el.target._latlng;

    const place = this.state.places.filter(
      place => place.antirubbersheeterId === uuid
    )[0];
    place.antirubbersheeterLat = newLatLng.lat;
    place.antirubbersheeterLng = newLatLng.lng;
  }
}
