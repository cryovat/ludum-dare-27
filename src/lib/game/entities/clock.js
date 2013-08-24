ig.module(
        'game.entities.clock'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntityClock = ig.Entity.extend({

            size : { x: 16, y: 16 },
            origin: { x: 8, y: 8},

            boost: 5,
            animSheet: new ig.AnimationSheet('media/clock.png', 16, 16),
            currentIndex: 0,

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            init: function (x, y, settings) {

                this.parent(x, y, settings);
                this.addAnim("default",  1, [0]);
            },

            check: function (other)
            {
                ig.game.lifespan += this.boost;
                this.kill();
            }

        });
    });