ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.entities.delay',

    'game.entities.mindy',
    'game.entities.sally',

    'game.entities.part',
    'game.entities.clock',
    'game.entities.exit',
    'game.entities.spawn',
    'game.entities.janitor',
    'game.entities.fuzzy',
    'game.entities.savePoint',

    'game.entities.button',

    'game.entities.killBeam',
    'game.entities.tractorBeam',
    'game.entities.spike',
    'game.entities.chomp',

    'game.entities.storyTrigger',

    'game.levels.level1',
    'game.levels.controlRoom',
    'game.levels.partOne',
    'game.levels.partTwo',
    'game.levels.partThree'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
    frames: new ig.Image ( 'media/storyframes.png' ),

    lifespan: 10,
    spawnPoint: "west",

    CONSTANTS: {
        MOVEMENT_SPEED: 100,
        JUMP_ACCEL: 200,
        GRAVITY: 200,
        BEAM_DRAG: 100,
        DRAG_REDUCE: 50,
        CHOMP_MOVEMENT_SPEED: 400,
        CHOMP_SLEEP_TIME: 1
    },

    stories: {

        intro: {
            shown: false,
            frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nOh no, my ship has crashed!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nThis place looks deserted!"
                },
                {
                    x: 160, y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nAnd my battery is running very low..."
                },
                {
                    x: 240,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nI need to find a battery!"
                },
                {
                    x: 0,  y: 120,   w: 80,  h: 120,
                    text: "Mindy:\nMaybe in that big building over there!"
                },
                {
                    x: 80,   y: 120,   w: 80,  h: 120,
                    text: "Mindy:\nI think I see a light?"
                }
            ]
        },

        scary: {
            shown: false,
            frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nThis place is dangerous and I'm really low on power..."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nCan I really find help here?"
                },
                {
                    x: 160, y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nI hear a sound from below..."
                },
                {
                    x: 240,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nLet's see..."
                }
            ]
        },

        helloSally: {
            shown: false,
            frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nD-don't hurt me!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nOh! No! No! I'm also trapped here!"
                },
                {
                    x: 160, y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nA-ah. You're a robot like me!"
                },
                {
                    x: 240,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nDo you have a power source?"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nNo, that's why I'm staying in this room."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nDo you see the light? It gives power."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nBut if you step out, the battery drains..."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nThere is a ship, but we need four parts to use it."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nThe caves here are too scary..."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nNo problem! I will find them."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nR-really? I'll wait here."
                }
            ]
        },

        partOne: {
            shown: false,
            frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nWoah, this looks heavy."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nSally! I found it!"
                },
                {
                    x: 160, y: 0,   w: 80,  h: 120,
                    text: "Sally:\nThat's great!"
                },
                {
                    x: 240,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nYeah, soon we'll be out of here!"
                }
            ]
        },

        partTwoIntro: {
            shown: false,
            frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nThis place looks pretty fishy..."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nI don't know why, but it feels off."
                },
                {
                    x: 160, y: 0,   w: 80,  h: 120,
                    text: "Sally:\nA-are you OK down there?"
                },
                {
                    x: 240,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nYeah, just gotta be careful!"
                }
            ]
        },

        partTwoTrap: {
            shown: false,
            frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nN-No!!!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nMindy! What's wrong?!"
                },
                {
                    x: 160, y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nS-Sally, I don't think I'll be back..."
                },
                {
                    x: 240,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nMindy? Mindy?! MINDY!!!!"
                }
            ]
        },

        partTwo: {
            shown: false,
            frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nWhew, that went on forever.\nBut here it is!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nSally! I-I found the second one!"
                },
                {
                    x: 160, y: 0,   w: 80,  h: 120,
                    text: "Sally:\nYay! We're getting out of here!"
                },
                {
                    x: 240,  y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nJust two more now!"
                }
            ]
        }

    },
	
	init: function() {

        ig.input.bind(ig.KEY.R, "reset");
        ig.input.bind(ig.KEY.Z, "jump");
		ig.input.bind(ig.KEY.LEFT_ARROW, "left");
        ig.input.bind(ig.KEY.RIGHT_ARROW, "right");

        this.setCheckPoint(LevelPartThree, "chompBeam");
        this.reset();
	},
	
	update: function() {

        var cs = this.currentStory;

        if (!cs)
        {
            this.parent();

            this.lifespan = Math.max(0, this.lifespan - ig.system.tick);
            this.gravity = this.CONSTANTS.GRAVITY;
        }
        else if (ig.input.pressed("jump"))
        {
            cs.frame += 1;

            if (cs.frame >= cs.story.frames.length)
            {
                this.currentStory = null;
            }

        }
	},
	
	draw: function() {

		var x = ig.system.width / 2,
			y = ig.system.height / 2,
            alive = this.getPlayer(),
            timeShort = this.isTimeShort(),
            cs = this.currentStory,
            frame,
            text,
            offset,
            textHeight;

        this.clearColor = !alive || timeShort ? "#440000" : "#000000";
        this.parent();

        if (cs)
        {
            frame = cs.story.frames[cs.frame];
            text = frame.text + "\n\n[PRESS Z]";
            textHeight = this.font.heightForString(text);

            offset = (cs.frame % 4) * 80;

            this.frames.draw(offset, 0, frame.x, frame.y, frame.w, frame.h);
            this.font.draw(text, x, ig.system.height - textHeight - 4, ig.Font.ALIGN.CENTER);
        }
        else
        {
            if (alive)
            {
                this.font.draw(
                    (timeShort ? 'WARNING!\n' : '') + 'Power supply: ' + Math.ceil(this.lifespan),
                    x, 16, ig.Font.ALIGN.CENTER );
            }
            else
            {
                this.font.draw( 'You never made it home...', x, y - 8, ig.Font.ALIGN.CENTER );
                this.font.draw( 'Press R to respawn.', x, y + 8, ig.Font.ALIGN.CENTER );
            }
        }
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
        this.lifespan = 10;

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

        if (!level) throw new Error("Level not specified?");

        this.spawnPoint = spawnPoint;
        this.currentLevel = level;
        this.loadLevelDeferred(level);

    },

    isTimeShort: function () {
        return this.lifespan < 5;
    },

    showStory: function (name)
    {
        var story = this.stories[name];

        if (!story)
        {
            throw new Error("Story '" + name + "' not found!");
        }

        if (story.shown)
        {
            return;
        }

        this.currentStory = {
            story: story,
            frame: 0
        };

        story.shown = true;

    }

});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 120, 2 );

});
