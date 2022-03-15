import Component from "@glimmer/component";
import Queue from "ember-file-upload/queue";

interface QueueTableComponentArgs {
  queue: Queue;
}

export default class QueueTableComponent extends Component<QueueTableComponentArgs> {

  get fileNames() {
    return this.args.queue.files.map(f => f.name);
  }
}
