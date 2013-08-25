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

            gameOver: new ig.Image('media/gameOver.png'),
            title: new ig.Image('media/title.png'),

            _wmScalable: false,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0,0,255,0.5)',

            init: function (x, y, settings) {

                this.parent(x, y, settings);

            },

            draw: function ()
            {
                if (!ig.editor)
                {
                    if (ig.game.isGameOver ())
                    {
                        this.gameOver.draw(0, 0);
                    }
                    else if (ig.game.isTitleScreen()) {
                        this.title.draw(0, 0);
                    }
                }
            },

            update: function () {

                var sp, spe, over = ig.game.isGameOver(), title = ig.game.isTitleScreen();

                if (!this.levelInitialized)
                {
                    if (over)
                    {
                        ig.game.showStory("epilogue");
                    }
                    else if (title)
                    {
                        ig.game.setCheckPoint(LevelLevel1, "ship");
                    }
                    else
                    {
                        sp = ig.game.spawnPoint;

                        if (!sp) throw new Error("Spawn point not set!");

                        spe = ig.game.getEntityByName(sp);

                        if (!spe) throw new Error("Spawn point '" + sp + "' not found!");

                        ig.game.spawnEntity(EntityMindy, spe.pos.x, spe.pos.y);
                    }

                    this.levelInitialized = true;
                }

                if (!over && ig.input.pressed("reset")) {
                    ig.game.reset();
                }

            }

        });
    });