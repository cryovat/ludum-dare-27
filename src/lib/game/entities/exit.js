ig.module(
        'game.entities.exit'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntityExit = ig.Entity.extend({

            targetLevel: '',
            spawnPoint: '',
            lifeBoost: 0,

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0,255,0,0.5)',

            init: function (x, y, settings) {

                this.parent(x, y, settings);

            },

            check: function (other) {

                var dest = this.targetLevel,
                    spawn = this.spawnPoint;

                if (typeof dest !== "string" || dest.length === 0) {
                    throw new Error("Target level not configured for exit at " + this.pos.x + "x" + this.pos.y);
                }

                if (typeof spawn !== "string" || spawn.length === 0) {
                    throw new Error("Spawn point not configured for exit at " + this.pos.x + "x" + this.pos.y);
                }

                ig.game.lifespan += this.lifeBoost;

                ig.game.changeLevel(window[dest], spawn);
            }

        });
    });