(function() {

  window.TitleScreen = (function() {

    function TitleScreen() {}

    TitleScreen.prototype.create = function() {
      var fadeInTween;
      this.game.add.sprite(0, 0, 'titlescreen');
      this.blackout = this.game.add.sprite(0, 0, 'blackout');
      this.fadeOutTween = this.game.add.tween(this.blackout);
      this.fadeOutTween.to({
        alpha: 1
      }, 1000, null);
      this.fadeOutTween.onComplete.add(function() {
        return this.game.state.start('coreGame');
      }, this);
      fadeInTween = this.game.add.tween(this.blackout);
      fadeInTween.to({
        alpha: 0
      }, 1000, null);
      return fadeInTween.start();
    };

    TitleScreen.prototype.update = function() {
      if (game.input.activePointer.isDown && this.blackout.alpha === 0) {
        return this.fadeOutTween.start();
      }
    };

    return TitleScreen;

  })();

}).call(this);
