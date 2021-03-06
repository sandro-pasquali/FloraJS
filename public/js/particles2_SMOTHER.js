/*global Flora */
Flora.System.start(function() {

  'use strict';

  Flora.universe.update({
    c: 0,
    showStats: false,
    gravity: new Flora.Vector(),
    borderWidth: 0

  });

  var walker = new Flora.Walker({
    isPerlin: true,
    wrapEdges: true,
    maxSpeed: 20,
    opacity: 0.5
  });

  var smoke = new Flora.ParticleSystem({
    burstRate: 1,
    seekTarget: walker,
    color: [200, 200, 200],
    isStatic: false,
    particle: function () {

      var pl = new Flora.ColorPalette();

      pl.addColor({
        min: 1,
        max: 3,
        startColor: [255, 255, 255],
        endColor: [180, 180, 180]
      });

      return {
        location: this.getLocation(),
        acceleration: new Flora.Vector(Flora.Utils.getRandomNumber(-4, 4), Flora.Utils.getRandomNumber(-4, 4)),
        width: 0,
        height: 0,
        borderRadius: '100%',
        boxShadow: '1px 1px 20px 20px rgba(' + pl.getColor().toString() + ', .5)'
      };
    }
  });
});