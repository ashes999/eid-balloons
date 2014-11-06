(function() {

  window.Boot = (function() {

    function Boot() {}

    Boot.prototype.preload = function() {
      return this.game.load.image('loadingBar', 'assets/graphics/loading-bar.png');
    };

    Boot.prototype.create = function() {
      return this.game.state.start('preLoader');
    };

    return Boot;

  })();

}).call(this);
