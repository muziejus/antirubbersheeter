// import Ember from "ember";

// declare global {
//   type Array<T> = Ember.ArrayPrototypeExtensions<T>;
//   // interface Function extends Ember.FunctionPrototypeExtensions {}
// }

// export {};
//
interface BundleData {
  mapUuid: string;
  csvUuid?: string;
  places: Record<string, string | number>[];
}

type Place = Record<string, string | number>;
