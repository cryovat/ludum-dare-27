ig.module(
        'game.entities.spike'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntitySpike = ig.Entity.extend({

            size : { x: 16, y: 16 },
            origin: { x: 8, y: 8 },

            animSheet: new ig.AnimationSheet('media/spike.png', 16, 16),

            checkAgainst: ig.Entity.TYPE.A,

            init: function (x, y, settings) {

                this.parent(x, y, settings);
                this.addAnim("default",  1, [0]);
            },

            check: function (other) {

                other.receiveDamage(1, this);

            }

        });
    });