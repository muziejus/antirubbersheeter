import Component from "@glimmer/component";
import { service } from "@ember/service";
import StateService from "antirubbersheeter/services/state";

interface MapPlacesManagerComponentArgs {}

export default class MapPlacesManagerComponent extends Component<MapPlacesManagerComponentArgs> {
  @service declare state: StateService;
}
