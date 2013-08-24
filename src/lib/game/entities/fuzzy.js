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

            active: true,
            requiredStory: "",

            image: new ig.Image ( 'media/fuzzy.png' ),


            _wmScalable: true,

            update: function ()
            {
                this.parent();

                this.active = !this.requiredStory || (ig.game.stories && ig.game.stories[this.requiredStory] && ig.game.stories[this.requiredStory].shown);
            },

            draw: function () {

                if (!this.active) { return; }

                var x = this.pos.x - this.offset.x - ig.game._rscreen.x,
                    y = this.pos.y - this.offset.y - ig.game._rscreen.y,
                    i, j,
                    w = Math.ceil(this.size.x / 16),
                    h = Math.ceil(this.size.y / 16);

                for (i = 0; i < w;  i++)
                {
                    this.image.draw(x + (i * 16), y, 0, 0, 16, 16);

                    for (j = 1; j < h - 1; j++ ) {

                        this.image.draw(x + (i * 16), y + (j * 16) , 0, 16, 16, 16);

                    }

                    this.image.draw(x + (i * 16), y + ((h - 1) * 16), 0, 32, 16, 16);
                }

            },

            check: function (other) {

                if (!this.active) { return; }

                ig.game.lifespan += ig.system.tick;



            }

        });
    });