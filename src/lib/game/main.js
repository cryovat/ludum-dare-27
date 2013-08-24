ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.entities.clock',
    'game.entities.mindy',
    'game.entities.exit',
    'game.entities.spawn',
    'game.entities.janitor',
    'game.entities.fuzzy',
    'game.entities.savePoint',

    'game.levels.level1'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
    lifespan: 10,
    spawnPoint: "west",

    CONSTANTS: {
        MOVEMENT_SPEED: 100,
        JUMP_ACCEL: 200,
        GRAVITY: 140
    },
	
	init: function() {

        ig.input.bind(ig.KEY.R, "reset");
        ig.input.bind(ig.KEY.Z, "jump");
		ig.input.bind(ig.KEY.LEFT_ARROW, "left");
        ig.input.bind(ig.KEY.RIGHT_ARROW, "right");

        this.setCheckPoint(LevelLevel1, "ship");
        this.reset();
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		this.lifespan = Math.max(0, this.lifespan - ig.system.tick);
        this.gravity = this.CONSTANTS.GRAVITY;

        this.clearColor = this.isTimeShort() ? "#440000" : "#000000";
	},
	
	draw: function() {
		this.parent();

		var x = ig.system.width/2,
			y = 16;
		
		this.font.draw( 'Power supply: ' + Math.ceil(this.lifespan), x, y, ig.Font.ALIGN.CENTER )
    },

    lookat: function (entity) {

        var x = entity.pos.x - ig.system.width / 2,
            y = entity.pos.y - ig.system.height / 2,
            critical = this.isTimeShort();

        ig.game.screen.x = critical ? x + Math.random() * 2 : x;
        ig.game.screen.y = critical ? y + Math.random() * 2 : y;

    },

    getPlayer: function () {
        return  this.getEntityByName("Mindy");
    },

    setCheckPoint: function (level, spawnPoint)
    {
        this.checkPoint = {
            level: level,
            spawnPoint: spawnPoint,
            lifespan: this.lifespan
        };
    },

    reset: function () {

        if (!this.checkPoint)
            throw new Error("Checkpoint not set!");

        var p = this.checkPoint;

        this.lifespan = p.lifespan;
        this.changeLevel(p.level, p.spawnPoint);
    },

    changeLevel: function (level, spawnPoint) {

        this.spawnPoint = spawnPoint;
        this.currentLevel = level;
        this.loadLevelDeferred(level);

    },

    isTimeShort: function () {
        return this.lifespan < 5;
    },

    r : function () {
        return !this.isTimeShort();
    }

});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 120, 2 );

});
