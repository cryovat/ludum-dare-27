ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.entities.delay',

    'game.entities.mindy',
    'game.entities.sally',

    'game.entities.teddy',
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

    'game.levels.title',
    'game.levels.level1',
    'game.levels.controlRoom',
    'game.levels.partOne',
    'game.levels.partTwo',
    'game.levels.partThree',
    'game.levels.partFour',
    'game.levels.endGame'
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
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nThis place looks deserted!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nAnd my battery is running very low..."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nI need to find a battery!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nMaybe in that big building over there!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
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
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nCan I really find help here?"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nI hear a sound from below..."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
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
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nA-ah. You're a robot like me!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
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
                    x: 0,   y: 0,   w: 80,  h: 120,
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
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nSally! I found it!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nThat's great!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
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
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nI don't know why, but it feels off."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nA-are you OK down there?"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
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
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nS-Sally, I don't think I'll be back..."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
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
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nSally! I-I found the second one!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nYay! We're getting out of here!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nJust two more now!"
                }
            ]
        },

        partThree: {
            shown: false,
                frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nYay! Piece three!!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nHoly whiskers! We got all the parts! "
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nDidn't you say there were four parts?"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\n!!!!!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nA-aah! O-of course! F-four! Four!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nBut you just said..."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nN-no! You misunderstood!\nPart four is critical!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nWe can't leave without it!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nWhy are you shifty all of a sudden?"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nM-me? I'm not shifty at all!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nI'm the picture of honesty!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nJust one more then? OK...\nBut I think you're hiding something!"
                }
            ]
        },

        partFourIntro: {
            shown: false,
            frames: [
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nS-so. This is the most important bit."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nWe can't leave without it at all! No way!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nBut this place is the scariest!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nThe super scariest!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nI could never go in there at all. No way."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nBut please, find him!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nHim? What are you sending me to do?"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nEh! E-eh! I'll explain later.\nFor now, please. Just find him."
                }
            ]
        },

        notSoBad: {
            shown: false,
            frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nSally? Can you hear me?"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nThis doesn't seem so bad!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nB-but it is! When the angry robot stole him..."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\n...I tried to follow them. But then I saw it."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nIt's terrifying... So dangerous..."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nSo there's a monster at the end?"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nY-yes! I ran away screaming at once!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nI better not let my guard down..."
                }
            ]
        },

        reallyNotSoBad: {
            shown: false,
            frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nI'm getting a bit worried."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nThis does seem too easy."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nAnd Sally has been here for a long time."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nIt must have been really scary."
                }
            ]
        },

        reallyNow: {
            shown: false,
            frames: [
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nWHAAAA!!!!! There it is!!!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\n......."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\n....................."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nSally, are you still there?"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nI-I am. You're still alive?"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nSally. Did you ever go into the other caves?"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\n......no."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nThis was the first one I went into."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nAnd when I saw that. N-n-no! I ran!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nBut you are brave! Keep going! P-please!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nRelax, I will..."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nThere better not be a punchline\nat the end of this..."
                }
            ]
        },

        partFour: {
            shown: false,
            frames: [
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nM-Mister Whiskers!!!! You're safe!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\n......."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nI'm speechless..."
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nHow is this in any way necessary\n for spaceflight?"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nO-of course it's necessary!"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nSpace is scary! But Mister Whisker protects me!"
                },
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "Mindy:\nAre you sure you can fix the spaceship?"
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "Sally:\nOf course! Hurry back here!"
                }
            ]
        },

        epilogue: {
            shown: false,
            frames: [
                {
                    x: 0,   y: 0,   w: 80,  h: 120,
                    text: "And so the two robots repaired the ship."
                },
                {
                    x: 80,  y: 0,   w: 80,  h: 120,
                    text: "And along with Mister Whiskers, they left the strange world."
                },
                {
                    x: 160, y: 0,   w: 80,  h: 120,
                    text: "What new adventures await them?"
                },
                {
                    x: 240,  y: 0,   w: 80,  h: 120,
                    text: "Maybe another Ludum Dare will tell..."
                }
            ]
        }

    },
	
	init: function() {

        ig.input.bind(ig.KEY.R, "reset");
        ig.input.bind(ig.KEY.Z, "jump");
		ig.input.bind(ig.KEY.LEFT_ARROW, "left");
        ig.input.bind(ig.KEY.RIGHT_ARROW, "right");

        this.setCheckPoint(LevelTitle, "meow");
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
            ingame = this.isInGame(),
            cs = this.currentStory,
            frame,
            text,
            offset,
            textHeight;

        this.clearColor = ingame && (!alive || timeShort) ? "#440000" : "#000000";
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
        else if (ingame)
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

    isInGame : function () {
        return !this.isTitleScreen() && !this.isGameOver();
    },

    isTitleScreen: function () {
        return this.currentLevel === LevelTitle;
    },

    isGameOver: function () {
        return this.currentLevel === LevelEndGame;
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
