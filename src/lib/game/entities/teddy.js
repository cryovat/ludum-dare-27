ig.module(
        'game.entities.teddy'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntityTeddy = ig.Entity.extend({

            size : { x: 32, y: 32 },

            animSheet: new ig.AnimationSheet('media/teddy.png', 32, 32),
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
                if (typeof this.name !== "string" || this.name.length === 0) {
                    throw new Error("Cut scene name not configured for teddy at " + this.pos.x + "x" + this.pos.y);
                }

                ig.game.showStory(this.name);

                ig.game.lifespan = 10;
                this.kill();
            }

        });
    });