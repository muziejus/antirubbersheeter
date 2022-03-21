import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import State from "antirubbersheeter/services/state";

export default class MapComponent extends Component {
  @service declare state: State;

  get tileUrl() {
    return `${this.state.uploadUrl}s/${this.state.mapUuid}/tiles/{z}/{y}/{x}.png`;
  }

  lat = 0;

  lng = 0;

  zoom = 1;
}
