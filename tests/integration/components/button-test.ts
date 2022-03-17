import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | button", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Button />`);

    assert.dom().containsText("");

    // Template block usage:
    await render(hbs`
      <Button>
        template block text
      </Button>
    `);

    assert.dom().containsText("template block text");
  });
});
