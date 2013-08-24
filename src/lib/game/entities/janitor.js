ig.module(
        'game.entities.janitor'
    )
    .requires(
        'impact.entity',
        "game.entities.mindy"
    )
    .defines(function () {

        EntityJanitor = ig.Entity.extend({

            size : { x: 16, y: 16 },
            origin: { x: 8, y: 8},

            levelInitialized: false,

            _wmScalable: false,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0,0,255,0.5)',

            init: function (x, y, settings) {

                this.parent(x, y, settings);

            },

            update: function () {

                var sp, spe;

                if (!this.levelInitialized)
                {
                    sp = ig.game.spawnPoint;

                    if (!sp) throw new Error("Spawn point not set!");

                    spe = ig.game.getEntityByName(sp);

                    if (!spe) throw new Error("Spawn point '" + sp + "' not found!");

                    ig.game.spawnEntity(EntityMindy, spe.pos.x, spe.pos.y);

                    this.levelInitialized = true;
                }

                if (ig.input.pressed("reset")) {
                    ig.game.reset();
                }

            }

        });
    });