import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ActionBoxComponent extends Component {
  @tracked openUploader = true;
  @tracked openMap = false;
  @tracked openDownloader = false;

  @action toggle(value: boolean) {
    return !value;
  }
}
