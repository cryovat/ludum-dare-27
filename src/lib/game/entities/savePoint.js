ig.module(
        'game.entities.savePoint'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntitySavePoint = ig.Entity.extend({

            size : { x: 16, y: 16 },
            origin: { x: 8, y: 8 },

            animSheet: new ig.AnimationSheet('media/savepoint.png', 16, 16),

            checkAgainst: ig.Entity.TYPE.A,

            init: function (x, y, settings) {

                //this.maxVel = ig.game.CONSTANTS.MOVEMENT_SPEED;

                this.parent(x, y, settings);
                this.addAnim("on",  1, [0]);
                this.addAnim("off", 1, [1]);
            },

            update : function () {

                this.parent();

                var cp = ig.game.checkPoint,
                    hot = cp && cp.level === ig.game.currentLevel && cp.spawnPoint === this.name;

                this.currentAnim = this.anims[hot ? "on" : "off"];

            },

            check: function (other) {

                var name = this.name;

                if (typeof name !== "string" || name.length === 0) {
                    throw new Error("Name not configured for save point at " + this.pos.x + "x" + this.pos.y);
                }

                if (ig.game.isCheckPointAllowed())
                    ig.game.setCheckPoint(ig.game.currentLevel, this.name);
            }

        });
    });