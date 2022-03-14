import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | header", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Header />`);

    this.element instanceof Element
      ? assert.dom(this.element).hasText("")
      : assert.ok(false, "`this.element` is not an instance of `Element`");

    // Template block usage:
    await render(hbs`
        <Header>
          template block text
        </Header>
      `);

    this.element instanceof Element
      ? assert.dom(this.element).hasText("template block text")
      : assert.ok(false, "`this.element` is not an instance of `Element`");
  });
});
