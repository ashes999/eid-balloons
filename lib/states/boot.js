(function() {

  window.Boot = (function() {

    function Boot() {}

    Boot.prototype.preload = function() {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this._setPixelPerfectScaling();
      return this.game.load.image('loadingBar', 'assets/graphics/loading-bar.png');
    };

    Boot.prototype.create = function() {
      return this.game.state.start('preLoader');
    };

    Boot.prototype._setPixelPerfectScaling = function() {
      return Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
    };

    return Boot;

  })();

}).call(this);
