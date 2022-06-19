import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | uploader/dropbox", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Uploader::Dropbox />`);

    assert.dom().containsText("");

    // Template block usage:
    await render(hbs`
      <Uploader::Dropbox>
        template block text
      </Uploader::Dropbox>
    `);

    assert.dom().containsText("template block text");
  });
});
