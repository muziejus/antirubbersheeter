import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import State from "antirubbersheeter/services/state";
import L from "leaflet";
import type { LeafletEvent, Map, LatLngBounds, LatLng } from "leaflet";
import { v4 as randomUUID } from "uuid";

interface AntirubbersheeterLeafletEvent extends LeafletEvent {
  target: Map;
  latlng: LatLng;
}

interface BundlerResponse {
  zipfileUri: string;
}

export default class MapComponent extends Component {
  @service declare state: State;

  @tracked declare mapBounds: LatLngBounds;

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
    return `${this.state.serverUrl}/uploads/${this.state.mapUuid}/tiles/{z}/{y}/{x}.png`;
  }

  get maxZoom() {
    return this.state.maxZoom;
  }

  get jsonedPlaces() {
    return JSON.stringify(this.state.places, null, 2);
  }

  crs = L.CRS.Simple;

  @action handleClick(event: AntirubbersheeterLeafletEvent) {
    console.log(event.target.getZoom());
    console.log(event.latlng.lat, event.latlng.lng);
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

    this.mapBounds = L.latLngBounds(southwestCorner, northeastCorner);

    target.setView(this.mapBounds.getCenter(), 1);
    target.setMaxBounds(this.mapBounds);

    this.setPlaces(this.mapBounds.getCenter(), target);
    target.fitBounds(this.mapBounds);
  }

  setPlaces(center: LatLng, map: Map) {
    const randomize = (coordinate: number) =>
      coordinate + 2 * (Math.random() - 0.5);

    if (this.state.inputtedPlaceNames) {
      this.state.places = this.state.inputtedPlaceNames.split(",").map(name => {
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
        const antirubbersheeterLat = randomize(center.lat);
        const antirubbersheeterLng = randomize(center.lng);
        const antirubbersheeterId = randomUUID();

        const placeData: PlaceData = {
          antirubbersheeterId,
          antirubbersheeterLat,
          antirubbersheeterLng,
          ...place,
        };

        return placeData;
      });
    }

    // For some reason, calling fitBounds here and above lets the popups line up
    // with the markers.
    map.fitBounds(this.mapBounds);
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

  @action
  async moveToDownload() {
    const northWest = this.mapBounds.getNorthWest();
    const southEast = this.mapBounds.getSouthEast();
    const body: BundleData = {
      popupField: this.state.placesDataNameColumn,
      bounds: {
        northWest: {
          lat: northWest.lat,
          lng: northWest.lng,
        },
        southEast: {
          lat: southEast.lat,
          lng: southEast.lng,
        },
      },
      maxZoom: this.maxZoom,
      mapUuid: this.state.mapUuid,
      csvUuid: this.state.csvUuid,
      places: this.state.places as PlaceData[],
    };

    const response = await fetch(`${this.state.serverUrl}/create-bundle`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const { zipfileUri } = (await response.json()) as BundlerResponse;

    this.state.zipfileUri = zipfileUri;

    this.state.step = "download";
  }
}
