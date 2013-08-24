ig.module(
        'game.entities.spawn'
    )
    .requires(
        'impact.entity'
    )
    .defines(function () {

        EntitySpawn = ig.Entity.extend({

            size : { x: 16, y: 16 },
            origin: { x: 8, y: 8},

            _wmScalable: false,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0,255,255,0.5)'

        });
    });