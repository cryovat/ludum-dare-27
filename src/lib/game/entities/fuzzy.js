ig.module(
        'game.entities.fuzzy'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntityFuzzy = ig.Entity.extend({

            size : { x: 16, y: 16 },
            checkAgainst: ig.Entity.TYPE.A,

            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(252, 223, 255, 50)',

            check: function (other) {

                ig.game.lifespan += ig.system.tick;

            }

        });
    });