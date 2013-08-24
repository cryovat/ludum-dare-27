ig.module(
        'game.entities.mindy'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntityMindy = ig.Entity.extend({

            size : { x: 16, y: 16 },
            origin: { x: 8, y: 8},

            animSheet: new ig.AnimationSheet('media/mindy.png', 16, 16),

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.PASSIVE,

            init: function (x, y, settings) {

                //this.maxVel = ig.game.CONSTANTS.MOVEMENT_SPEED;

                this.parent(x, y, settings);
                this.addAnim("default",  1, [0]);

            },

            update: function () {

                if (ig.game.lifespan <= 0)
                {
                    this.kill();
                    this.parent();
                    return;
                }

                if (ig.input.state("left")) {
                    this.vel.x = -(ig.game.CONSTANTS.MOVEMENT_SPEED);
                } else if (ig.input.state("right")) {
                    this.vel.x = ig.game.CONSTANTS.MOVEMENT_SPEED;
                }   else {
                    this.vel.x = 0;
                }

                if (this.standing && ig.input.pressed("jump"))
                {
                    this.vel.y = -(ig.game.CONSTANTS.JUMP_ACCEL);
                }

                ig.game.lookat(this);

                this.parent();
            },

        });
    });