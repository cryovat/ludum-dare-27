ig.module(
        'game.entities.sally'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntitySally = ig.Entity.extend({

            size : { x: 16, y: 16 },

            animSheet: new ig.AnimationSheet('media/sally.png', 16, 16),

            checkAgainst: ig.Entity.TYPE.NONE,

            init: function (x, y, settings) {

                this.parent(x, y, settings);
                this.addAnim("default",  1, [0]);
            }

        });
    });