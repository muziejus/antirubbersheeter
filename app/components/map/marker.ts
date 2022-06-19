import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import StateService from "antirubbersheeter/services/state";
import type { LeafletEvent } from "leaflet";

interface MapMarkerComponentArgs {
  layers: any;
  place: PlaceData;
  index: number;
  lastPlaceIndex: number;
}

export default class MapMarkerComponent extends Component<MapMarkerComponentArgs> {
  @service declare state: StateService;

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
