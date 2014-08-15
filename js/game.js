var Game = {
	fps: 60,
	interval: null,
	context: null,
	canvas: {
		width: 0,
		height: 0
	},
	ent: {
		player1: null,
		player2: null,
		balls: [],
	},
	/**
	 * Initializes the game components.
	 *
	 * @method init
	 */
	init: function() {
		var self = this;

		self.context = $("#game");
		self.canvas = {
			width: self.context.width(),
			height: self.context.height()
		};

		// create the player entities
		self.ent.player1 = self.createPlayerEntity("player1");
		self.ent.player2 = self.createPlayerEntity("player2");



		// add the game objects onto the game board
		self.context.append(
			self.ent.player1,
			self.ent.player2
		);
	
		console.log(self.context);

		// start the game loop
		//self.interval = setInterval(self.loop, 1000/self.fps);
	},
	/**
	 * Remove all elements in the game and unbind all events.
	 *
	 * @method destroy
	 */
	destroy: function() {
		var self = this;

		if (self.ent.player1) {
			self.ent.player1.unbind("keyup");
			self.ent.player1.unbind("keydown");
			self.ent.player1.remove();
		}
		if (self.ent.player2) {
			self.ent.player2.unbind("keyup");
			self.ent.player2.unbind("keydown");
			self.ent.player2.remove();
		}
		for (var i=0; i<self.ent.balls.length; i++) {
			self.ent.balls[i].remove();
		}
		self.context.empty();
	},
	/**
	 * Creates a player entity.
	 *
	 * @method createPlayerEntity
	 * @param id {String} The player id.
	 * @param options {Object} The player settings. 
	 * @return {Object} The player DOM entity.
	 */
	createPlayerEntity: function(id,options) {
		var player = $("<div>")
			.attr("id",id)
			.addClass("player");

		// apply each of the options to the player
		for (var o in options) {
			player.data(o,options[o]);
		}

		// bind some events onto the player entity
		// ...
	
		return player;
	},
	/**
	 * Creates a ball entity
	 *
	 * @method createBallEntity
	 * @param id {String} The ball id.
	 * @param options {Object} The ball settings.
	 * @return {Object} The ball DOM entity.
	 */
	createBallEntity: function(id,options) {
		var ball = $("<div>")
			.attr("id",id)
			.addClass("ball");

		// apply each of the options to the ball
		for (var o in options) {
			ball.data(o,options[o]);
		}

		// bind some events onto the ball entity
		// ...

		return player;
	},
	/**
	 * An iteration of the game loop.
	 *
	 * @method loop
	 */
	loop: function() {


	}

};

$(document).ready(function(){
	// initialize the game
	Game.init();
});
