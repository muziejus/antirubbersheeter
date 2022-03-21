import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import State from "antirubbersheeter/services/state";

export default class MapComponent extends Component {
  @service declare state: State;
}
