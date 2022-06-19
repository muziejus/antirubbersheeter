import Component from "@glimmer/component";
import { service } from "@ember/service";
import StateService from "antirubbersheeter/services/state";

export default class DownloaderComponent extends Component {
  @service declare state: StateService;
}
