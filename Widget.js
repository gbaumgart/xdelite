/** @module delite/Widget */
define([
    "dcl/dcl",
	"delite/Widget",
    "./register"
], function (dcl,Widget,register) {
	/**
	 * Base class for all widgets, i.e. custom elements that appear visually.
	 *
	 * Provides stubs for widget lifecycle methods for subclasses to extend, like `render()`,
	 * `postRender()`, and `destroy()`, and also public API methods like `observe()`.
	 * @mixin module:delite/Widget
	 * @augments module:delite/CustomElement
	 * @augments module:decor/Invalidating
	 * @mixes module:delite/Bidi
	 */
	var Widget = dcl([Widget], /** @lends module:delite/Widget# */ {

	});

	return Widget;
});
