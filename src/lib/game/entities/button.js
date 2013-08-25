/*
This entity passes through all calls to triggeredBy() to its own targets
after a delay of n seconds.

E.g.: Set an EntityDelay as the target of an EntityTrigger and connect the
entities that should be triggered after the delay as targets to the 
EntityDelay.


Keys for Weltmeister:

delay 
	Delay in seconds after which the targets should be triggered.
	default: 1
	
target.1, target.2 ... target.n
	Names of the entities whose triggeredBy() method will be called after 
	the delay.
*/

ig.module(
	'game.entities.button'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityButton = ig.Entity.extend({

    size : { x: 16, y: 8 },

    animSheet: new ig.AnimationSheet('media/button.png', 16, 8),
    currentIndex: 0,

    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,

	used: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

        this.addAnim("on",  1, [0]);
        this.addAnim("off",  1, [1]);

	},

	check: function(){
		if(!this.used) {
			this.used = true;

            this.currentAnim = this.anims["off"];

			for( var t in this.target ) {
				var ent = ig.game.getEntityByName( this.target[t] );
				if( ent && typeof(ent.toggle) === 'function' ) {
					ent.toggle( this );
				}
			}
		}
	}
});

});