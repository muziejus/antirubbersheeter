import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | section", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set("open", true);
    this.set("title", "title");

    await render(hbs`<Section @title={{this.title}}/>`);

    assert.dom().containsText("title");

    // Template block usage:
    await render(hbs`
      <Section @open={{this.open}}>
        template block text
      </Section>
    `);

    assert.dom().containsText("template block text");
  });
});
