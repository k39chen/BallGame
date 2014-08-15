/**
 * @class Ball
 * @param id {String} The ball id.
 * @param options {Object} The ball settings.
 */
function Ball(id, options) {
	this.settings = $.extend({
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
		.attr("id",this.settings.id)
		.addClass("ball");

	// bind some events onto the ball entity
	// ...

	// add this to the game
	ball.appendTo(Game.context);
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

};
/**
 * Retrieves the instance of this ball.
 *
 * @method get
 */
Ball.prototype.get = function() {
	return $("#"+settings.id);
};
