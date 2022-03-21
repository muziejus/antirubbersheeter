import Component from "@glimmer/component";
import Queue from "ember-file-upload/queue";

interface QueueTableComponentArgs {
  queue: Queue;
  typedPlaces: string;
}

export default class QueueTableComponent extends Component<QueueTableComponentArgs> {
  get image() {
    return (
      this.args.queue?.files?.filter(file => /image/.test(file.type))[0] ||
      false
    );
  }

  get csv() {
    return (
      this.args.queue?.files?.filter(file => /csv/.test(file.type))[0] || false
    );
  }
}