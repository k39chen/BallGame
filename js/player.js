/**
 * @class Player
 * @param id {String} The player id.
 * @param options {Object} The player settings.
 */
function Player(id, options) {
	this.id = id;
	this.settings = $.extend({
		css: {
			background: "red"
		},
		radius: 32,

		pos: {x:0, y:0},
		vel: {x:0, y:0},
		acc: {x:0, y:0},

		xvel: 0.1,
		yvel: 0.1,
		xacc: 0.0001,
		yacc: 0.0001,

	}, options);

	// create the player by default
	this.create();
}
/**
 * Creates the player object.
 *
 * @method create
 */
Player.prototype.create = function() {
	var player = $("<div>")
		.attr("id",this.id)
		.addClass("player entity")
		.css(this.settings.css);

	// add this to the game
	player.appendTo(Game.context);

	// initial player dimensions
	this.settings.radius = player.width() / 2;
};
/**
 * Updates the player object.
 *
 * @method update
 */
Player.prototype.update = function() {
	// handle horizontal motion
	if (this.settings.acc.x > 0) {
		if (this.settings.vel.x >= 0) {
			this.settings.acc.x = 0;
			this.settings.vel.x = 0;
		}
	} else if (this.settings.acc.x < 0) {
		if (this.settings.vel.x <= 0) {
			this.settings.acc.x = 0;
			this.settings.vel.x = 0;
		}
	} else {
		// ...
	}
	// handle vertical motion (symmetrical to horizontal motion)
	if (this.settings.acc.y > 0) {
		if (this.settings.vel.y >= 0) {
			this.settings.acc.y = 0;
			this.settings.vel.y = 0;
		}
	} else if (this.settings.acc.y < 0) {
		if (this.settings.vel.y <= 0) {
			this.settings.acc.y = 0;
			this.settings.vel.y = 0;
		}
	} else {
		// ...
	}

	this.settings.pos.x += this.settings.vel.x += this.settings.acc.x;
	this.settings.pos.y += this.settings.vel.y += this.settings.acc.y;
};
/**
 * Renders the player object.
 *
 * @method render
 */
Player.prototype.render = function() {
	this.get().css({
		left: this.settings.pos.x - this.settings.radius,
		top: this.settings.pos.y - this.settings.radius
	});
};
/**
 * Retrieves the instance of this player.
 *
 * @method get
 */
Player.prototype.get = function() {
	return $("#"+this.id);
};
/**
 * General player movement.
 *
 * @method move{Direction}
 */
Player.prototype.moveLeft = function() {
	this.settings.vel.x = -this.settings.xvel;
	this.settings.acc.x = +this.settings.xacc;
};
Player.prototype.moveUp = function() {
	this.settings.vel.y = -this.settings.yvel;
	this.settings.acc.y = +this.settings.yacc;
};
Player.prototype.moveRight = function() {
	this.settings.vel.x = +this.settings.xvel;
	this.settings.acc.x = -this.settings.xacc;
};
Player.prototype.moveDown = function() {
	this.settings.vel.y = +this.settings.yvel;
	this.settings.acc.y = -this.settings.yacc;
};
