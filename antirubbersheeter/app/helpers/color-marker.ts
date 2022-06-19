import { helper } from "@ember/component/helper";
import L from "leaflet";

export function colorMarker([markerIndex]: [number]) {
  const index = markerIndex - Math.floor(markerIndex / 10) * 10;

  return L.icon({
    iconUrl: `/assets/leaflet-markers/marker-${index}.png`,
    iconSize: [26, 41],
    iconAnchor: [13, 40],
    popupAnchor: [0, -45],
  });
}

export default helper(colorMarker);
