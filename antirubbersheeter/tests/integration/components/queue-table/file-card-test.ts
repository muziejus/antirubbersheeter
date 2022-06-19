import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | queue-table/file-card", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set("type", "image");
    this.set("file", false);

    await render(
      hbs`<QueueTable::FileCard @file={{this.file}} @type={{this.type}}/>`
    );

    assert.dom().containsText("No map uploaded.");
  });
});
