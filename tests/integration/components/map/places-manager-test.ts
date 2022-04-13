import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | map/places-manager", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Map::PlacesManager />`);

    assert.dom().includesText("");

    // Template block usage:
    await render(hbs`
      <Map::PlacesManager>
        template block text
      </Map::PlacesManager>
    `);

    assert.dom().includesText("template block text");
  });
});
