(function() {

  window.onload = function() {
    this.game = new Phaser.Game(800, 600, Phaser.CANVAS, '');
    this.game.state.add('boot', new window.Boot);
    this.game.state.add('preLoader', new window.Preloader);
    this.game.state.add('titleScreen', new window.TitleScreen);
    this.game.state.add('coreGame', new window.CoreGame);
    this.game.state.start('boot');
    window.addEventListener('resize', function(event) {
      return console.log("!");
    });
    return console.log("READY! w=" + window.width + ", h=" + window.height);
  };

}).call(this);
