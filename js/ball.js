/**
 * @class Ball
 * @param id {String} The ball id.
 * @param options {Object} The ball settings.
 */
function Ball(id, options) {
	this.id = id;
	this.settings = $.extend({
		css: {
			background: "pink"
		},
		radius: 16,

		pos: {x:0, y:0},
		vel: {x:0, y:0},
		acc: {x:0, y:0}
	}, options);

	// create the ball by default
	this.create();
}

/**
 * Creates the ball object.
 *
 * @method create
 */
Ball.prototype.create = function() {
	var ball = $("<div>")
		.attr("id",this.id)
		.addClass("ball entity")
		.css(this.settings.css);

	// add this to the game
	ball.appendTo(Game.context);

	// initial ball dimensions
	this.settings.radius = ball.width() / 2;
};
/**
 * Updates the ball object.
 *
 * @method update
 */
Ball.prototype.update = function() {
	// ...
};
/**
 * Renders the ball object.
 *
 * @method render
 */
Ball.prototype.render = function() {
	this.get().css({
		left: this.settings.pos.x - this.settings.radius,
		top: this.settings.pos.y - this.settings.radius
	});
};
/**
 * Retrieves the instance of this ball.
 *
 * @method get
 */
Ball.prototype.get = function() {
	return $("#"+this.id);
};
