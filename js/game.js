var keys = {};

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
		self.ent.player1 = new Player("player1", {css: {background: "red"}});
		self.ent.player2 = new Player("player2", {css: {background: "green"}});

		// create the balls
		for (var i=0; i<24; i++) {
			var ball = new Ball("ball"+i,{});
			self.ent.balls.push(ball);
		}

		// randomly position everything
		self.ent.player1.settings.pos = self.getRandomFreePosition(self.ent.player1);
		self.ent.player2.settings.pos = self.getRandomFreePosition(self.ent.player2);
		for (var i=0; i<self.ent.balls.length; i++) {
			self.ent.balls[i].settings.pos = self.getRandomFreePosition(self.ent.balls[i]);
		}

		console.log(self.ent.player1);

		// set up the controls
		self.setupControls();

		// start the game loop
		self.interval = setInterval($.proxy(self.loop,self), 1);
	},
	/**
	 * Set up the controls for the game
	 *
	 * @method setupControls
	 */
	setupControls: function() {
		var self = this;
		$(document).keydown(function (e) {
			keys[e.which] = true;
   
			// go through all of the pressed keys
			for (var keyCode in keys) {
				if (!keys.hasOwnProperty(keyCode)) continue;
				switch (parseInt(keyCode,10)) {
					// PLAYER 1 CONTROLS
					case 37: // move left
						self.ent.player1.moveLeft();
						break;
					case 38: // move up
						self.ent.player1.moveUp();
						break;
					case 39: // move right
						self.ent.player1.moveRight();
						break;
					case 40: // move down
						self.ent.player1.moveDown();
						break;

					// PLAYER 2 CONTROLS
					case 65: // move left
						self.ent.player2.moveLeft();
						break;
					case 87: // move up
						self.ent.player2.moveUp();
						break;
					case 68: // move right
						self.ent.player2.moveRight();
						break;
					case 83: // move down
						self.ent.player2.moveDown();
						break;

					default:
						break;
				}
			}
		});
		$(document).keyup(function (e) {
			delete keys[e.which];
		});
	},
	/**
	 * Remove all elements in the game and unbind all events.
	 *
	 * @method destroy
	 */
	destroy: function() {
		var self = this;

		if (self.ent.player1) {
			self.ent.player1.destroy();
		}
		if (self.ent.player2) {
			self.ent.player2.destroy();
		}
		for (var i=0; i<self.ent.balls.length; i++) {
			self.ent.balls[i].destroy();
		}
		self.context.empty();
	},
	/**
	 * An iteration of the game loop.
	 *
	 * @method loop
	 */
	loop: function() {
		var self = this;

		// perform game logic
		for (var type in self.ent) {
			if ($.isArray(self.ent[type])) {
				var list = self.ent[type];
				for (var i=0; i<list.length; i++) {
					list[i].update();
				}
			} else {
				$.proxy(self.ent[type].update(),self);
			}
		}

		self.render();
	},
	/**
	 * Renders the game objects based on their metadata
	 *
	 * @method render
	 */
	render: function() {
		var self = this;

		for (var type in self.ent) {
			if ($.isArray(self.ent[type])) {
				var list = self.ent[type];
				for (var i=0; i<list.length; i++) {
					$.proxy(list[i].render(),self);
				}
			} else {
				$.proxy(self.ent[type].render(),self);
			}
		}
	},
	/**
	 * Gets a position where there is no collision that will occur
	 *
	 * @method getRandomFreePosition
	 * @param obj {Object} The entity that we want to position.
	 * @return {Object} The position vector.
	 */
	getRandomFreePosition: function(obj) {
		var self = this,
			x = getRandom(0,self.canvas.width),
			y = getRandom(0,self.canvas.height);
		
		if (self.collides(obj)) {
			return self.getRandomFreePosition(obj);
		}
		return {x:x,y:y};
	},
	/**
	 * Determines if a collision has occured.
	 *
	 * @method collides
	 * @param obj {Object} The object that we are testing.
	 * @return {Object} The collision test results.
	 */
	collides: function(obj) {
		var hasCollision = false;
		var sr = obj.settings.radius / 2,
			sx = obj.settings.pos.x,
			sy = obj.settings.pos.y;


		return false;

		console.log(obj);

		$(".entity").each(function(index,elem){
			var $elem = $(elem);

			if (hasCollision || $elem.attr("id") === obj.id) return;

			var dr = $elem.width() / 2,
				dx = parseInt($elem.css("left"), 10),
				dy = parseInt($elem.css("top"), 10);

			// calculate the distance between the two points
			var distance = Math.sqrt( Math.pow(dx-sx,2) + Math.pow(dy-sy,2) );

			// a collision has occurred!
			if (distance <= sr + dr) {
				hasCollision = true;
			}
		});

		console.log( hasCollision );

		return hasCollision;
	}
};

$(document).ready(function(){
	// initialize the game
	Game.init();
});

window.getRandom = function(min,max) {
	return Math.floor(Math.random() * (max-min)) + min;
};
