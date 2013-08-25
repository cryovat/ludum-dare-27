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

            requiredStory: "",

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            init: function (x, y, settings) {

                this.parent(x, y, settings);
                this.addAnim("default",  1, [0]);
            },

            update: function () {

                this.parent();

                if (this.requiredStory && ig.game.stories[this.requiredStory]
                    && !ig.game.stories[this.requiredStory].shown)
                {
                    this.kill();
                }

            },

            check: function (other)
            {
                ig.game.lifespan = Math.min(ig.game.lifespan + this.boost, 10);
                this.kill();
            }

        });
    });