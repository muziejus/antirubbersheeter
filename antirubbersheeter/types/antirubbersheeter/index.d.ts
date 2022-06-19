// import Ember from "ember";
// declare global {
//   type Array<T> = Ember.ArrayPrototypeExtensions<T>;
//   // interface Function extends Ember.FunctionPrototypeExtensions {}
// }

// export {};
//
interface BundleData {
  popupField: string;
  bounds: {
    northWest: {
      lat: number;
      lng: number;
    };
    southEast: {
      lat: number;
      lng: number;
    };
  };
  maxZoom: number;
  mapUuid: string;
  csvUuid?: string;
  places: PlaceData[];
}
type Place = Record<string, string | number>;
interface PlaceData extends Place {
  antirubbersheeterLat: number;
  antirubbersheeterLng: number;
  antirubbersheeterId: string;
}
