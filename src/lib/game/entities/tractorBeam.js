ig.module(
        'game.entities.tractorBeam'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntityTractorBeam = ig.Entity.extend({

            size : { x: 16, y: 16 },
            checkAgainst: ig.Entity.TYPE.A,

            gravityFactor: 0,

            enabled: true,

            image: new ig.Image ( 'media/tractorbeam.png' ),

            _wmScalable: true,

            init: function (x, y, settings) {

                if (settings.enabled && settings.enabled === "false")
                {
                    settings.enabled = false;
                }

                this.parent(x, y, settings);
            },

            draw: function () {

                if (!this.enabled && !ig.editor) { return; }


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

                if (!this.enabled) { return; }

                other.vel.y = -ig.game.CONSTANTS.BEAM_DRAG;

            },

            toggle: function() {

                this.enabled = !this.enabled;

            }

        });
    });