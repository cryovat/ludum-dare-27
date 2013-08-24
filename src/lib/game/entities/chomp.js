ig.module(
        'game.entities.chomp'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntityChomp = ig.Entity.extend({

            STATES : {
                MOVING: 1,
                SLEEP: 2
            },

            size : { x: 32, y: 32 },
            origin: { x: 16, y: 16},
            direction: "vertical",

            gravityFactor: 0,

            animSheet: new ig.AnimationSheet('media/chomp.png', 32, 32),

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            sleepCounter: 1,
            dirMultiplier: 1,

            init: function (x, y, settings) {

                //this.maxVel = ig.game.CONSTANTS.MOVEMENT_SPEED;

                this.parent(x, y, settings);
                this.addAnim("default",  1, [0]);

                if (ig.game.CONSTANTS)
                {
                    this.launch();
                }

            },

            update: function () {

                this.parent();

                if (this.state === this.STATES.SLEEP)
                {
                    if (this.sleepCounter > 0)
                    {
                        this.sleepCounter -= ig.system.tick;
                    }
                    else
                    {
                        this.launch();
                    }

                }

            },

            launch: function () {

                var multi = this.dirMultiplier;

                this.state = this.STATES.MOVING;

                if (this.direction === "vertical")
                {
                    this.vel.y = multi * ig.game.CONSTANTS.CHOMP_MOVEMENT_SPEED;
                }

                if (this.direction !== "vertical")
                {
                    this.vel.x = multi * ig.game.CONSTANTS.CHOMP_MOVEMENT_SPEED;
                }

                this.dirMultiplier = multi * -1;
            },

            handleMovementTrace: function (res) {

                if (this.state === this.STATES.MOVING &&
                    ((this.vel.x !== 0 && res.collision.x) || (this.vel.y !== 0 && res.collision.y)))
                {
                    this.state = this.STATES.SLEEP;
                    this.vel.x = 0;
                    this.vel.y = 0;
                    this.sleepCounter = ig.game.CONSTANTS.CHOMP_SLEEP_TIME;

                    res.collision.x = false;
                    res.collision.y = false;
                }

                this.parent(res);
            },

            check: function (other) {

                other.receiveDamage(1, this);

            }

        });
    });