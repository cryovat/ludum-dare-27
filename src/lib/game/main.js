ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.entities.clock',
    'game.entities.mindy',

    'game.levels.level1'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
    lifespan: 10,

    CONSTANTS: {
        MOVEMENT_SPEED: 100,
        JUMP_ACCEL: 200,
        GRAVITY: 140
    },
	
	init: function() {

        ig.input.bind(ig.KEY.Z, "jump");
		ig.input.bind(ig.KEY.LEFT_ARROW, "left");
        ig.input.bind(ig.KEY.RIGHT_ARROW, "right");

        this.loadLevel(LevelLevel1);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		this.lifespan = Math.max(0, this.lifespan - ig.system.tick);
        this.gravity = this.CONSTANTS.GRAVITY;

        this.clearColor = this.lifespan < 5 ? "#440000" : "#000000";
	},
	
	draw: function() {
		this.parent();

		var x = ig.system.width/2,
			y = 16;
		
		this.font.draw( 'Power supply: ' + Math.ceil(this.lifespan), x, y, ig.Font.ALIGN.CENTER )
    },

    lookat: function (entity) {

        ig.game.screen.x = entity.pos.x - ig.system.width / 2;
        ig.game.screen.y = entity.pos.y - ig.system.height / 2;

    }
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
