ig.module(
        'game.entities.storyTrigger'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntityStoryTrigger = ig.Entity.extend({

            size : { x: 16, y: 16 },
            checkAgainst: ig.Entity.TYPE.A,

            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(100,100,100,0.5)',

            check: function (other) {

                if (typeof this.name !== "string" || this.name.length === 0) {
                    throw new Error("Cut scene name not configured for story trigger at " + this.pos.x + "x" + this.pos.y);
                }

                ig.game.showStory(this.name);
            }

        });
    });