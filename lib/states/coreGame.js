(function() {

  window.CoreGame = (function() {
    var MAX_BALLOON_SPEED, MAX_BIRD_SPEED, MAX_BIRD_VERTICAL_SPEED, MAX_CLOUD_SPEED, MOVE_SPEED, NUM_BALLOONS, NUM_BIRDS, NUM_CLOUDS, gameOver;

    function CoreGame() {}

    MOVE_SPEED = 300;

    NUM_CLOUDS = 5;

    NUM_BALLOONS = 5;

    NUM_BIRDS = 3;

    MAX_CLOUD_SPEED = 200;

    MAX_BALLOON_SPEED = 250;

    MAX_BIRD_SPEED = 300;

    MAX_BIRD_VERTICAL_SPEED = 50;

    gameOver = false;

    CoreGame.prototype.create = function() {
      var balloons, cloud, fadeInTween, i, quarterSpeed, randomX, randomY, scale,
        _this = this;
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.numBalloonsCollected = 0;
      this.game.add.sprite(0, 0, 'sky');
      this.clouds = this.game.add.group();
      this.clouds.enableBody = true;
      for (i = 1; 1 <= NUM_CLOUDS ? i <= NUM_CLOUDS : i >= NUM_CLOUDS; 1 <= NUM_CLOUDS ? i++ : i--) {
        randomX = Math.random() * (2 * this.game.width);
        randomY = Math.random() * this.game.height;
        cloud = this.clouds.create(randomX, randomY, 'cloud');
        quarterSpeed = MAX_CLOUD_SPEED / 4;
        cloud.body.velocity.x = -(Math.random() * 3 * quarterSpeed) - quarterSpeed;
        scale = this._pickCloudScale();
        cloud.scale.setTo(scale, scale);
      }
      this.balloons = this.game.add.group();
      this.balloons.enableBody = true;
      for (i = 1; 1 <= NUM_BALLOONS ? i <= NUM_BALLOONS : i >= NUM_BALLOONS; 1 <= NUM_BALLOONS ? i++ : i--) {
        this._spawnBalloon();
      }
      balloons = this.game.add.sprite(8, this.game.height - 64 - 8, 'ui-balloons');
      this.birds = this.game.add.group();
      this.birds.enableBody = true;
      for (i = 1; 1 <= NUM_BIRDS ? i <= NUM_BIRDS : i >= NUM_BIRDS; 1 <= NUM_BIRDS ? i++ : i--) {
        this._spawnBird();
      }
      this.player = this.game.add.sprite(0, 0, 'player');
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.blackout = this.game.add.sprite(0, 0, 'blackout');
      this.blackout.alpha = 1;
      this.game.add.tween(this.blackout).to({
        alpha: 0
      }, 500, null).start();
      this.game.camera.follow(this.player);
      this.cursors = game.input.keyboard.createCursorKeys();
      fadeInTween = this.game.add.tween(this.blackout);
      this.fadeOutTween = this.game.add.tween(this.blackout);
      this.fadeOutTween.to({
        alpha: 1
      }, 500, null);
      this.fadeOutTween.onComplete.add(function() {
        this.gameOverText.destroy();
        this.scoreText.destroy();
        this.restart.kill();
        fadeInTween.to({
          alpha: 0
        }, 500, null);
        fadeInTween.start();
        fadeInTween.onComplete.add(function() {
          this.gameOver = false;
          return this.restarting = false;
        }, this);
        return this._reset();
      }, this);
      this.game.time.advancedTiming = true;
      return window.setInterval(function() {
        var message;
        message = "" + _this.game.time.fps + " FPS";
        if (_this.game.time.fps !== 0) return console.info(message);
      }, 1000);
    };

    CoreGame.prototype.update = function() {
      this._checkForGameOver();
      this._respawnOffScreenClouds();
      this._applyWavesToBalloons();
      if (!this.gameOver) {
        this.game.physics.arcade.overlap(this.player, this.balloons, this._balloonCollected, null, this);
        this.game.physics.arcade.collide(this.player, this.birds);
        this._updatePlayerVelocity();
        this._respawnOffScreenBalloons();
        return this._respawnOffScreenBirds();
      } else {
        if (game.input.activePointer.isDown) {
          this.gameOver = false;
          if (!this.restarting) {
            this.restarting = true;
            return this.fadeOutTween.start();
          }
        }
      }
    };

    CoreGame.prototype._updatePlayerVelocity = function() {
      if (this.gameOver === true) return;
      if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -1 * MOVE_SPEED;
      } else if (this.cursors.down.isDown) {
        this.player.body.velocity.y = MOVE_SPEED;
      } else {

      }
      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -1 * MOVE_SPEED;
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = MOVE_SPEED;
      } else {

      }
      if (this.player.body.velocity.x !== 0) this.player.body.velocity.x *= 0.9;
      if (this.player.body.velocity.y !== 0) this.player.body.velocity.y *= 0.9;
      if (Math.abs(this.player.body.velocity.x) <= 5) {
        this.player.body.velocity.x = 0;
      }
      if (Math.abs(this.player.body.velocity.y) <= 5) {
        return this.player.body.velocity.y = 0;
      }
    };

    CoreGame.prototype._respawnOffScreenClouds = function() {
      return this.clouds.forEach(function(cloud) {
        var scale;
        if (cloud.x <= -cloud.width) {
          cloud.x = this._pickRandomX();
          cloud.y = Math.random() * this.game.height;
          scale = this._pickCloudScale();
          return cloud.scale.setTo(scale, scale);
        }
      }, this);
    };

    CoreGame.prototype._respawnOffScreenBalloons = function() {
      return this.balloons.forEach(function(balloon) {
        if (balloon.x <= -balloon.width) {
          balloon.x = this._pickRandomX();
          balloon.y = Math.random() * (this.game.height - 64);
          return balloon.randomY = Math.random() * 500;
        }
      }, this);
    };

    CoreGame.prototype._respawnOffScreenBirds = function() {
      return this.birds.forEach(function(bird) {
        if (bird.x <= -bird.width) return this._spawnBird(bird);
      }, this);
    };

    CoreGame.prototype._applyWavesToBalloons = function() {
      return this.balloons.forEach(function(balloon) {
        return balloon.y += (2 * Math.sin((this.game.time.now + balloon.randomY) / 500));
      }, this);
    };

    CoreGame.prototype._pickRandomX = function() {
      return this.game.width + (Math.random() * this.game.width);
    };

    CoreGame.prototype._pickCloudScale = function() {
      return 0.25 + (Math.random() * 0.75);
    };

    CoreGame.prototype._balloonCollected = function(player, balloon) {
      balloon.kill();
      this.numBalloonsCollected += 1;
      return this._spawnBalloon();
    };

    CoreGame.prototype._spawnBalloon = function() {
      var balloon, halfSpeed, randomX, randomY;
      randomX = this._pickRandomX();
      randomY = Math.random() * (this.game.height - 64);
      balloon = this.balloons.create(randomX, randomY, 'balloon');
      halfSpeed = MAX_BALLOON_SPEED / 2;
      balloon.body.velocity.x = -(Math.random() * halfSpeed) - halfSpeed;
      return balloon.randomY = Math.random() * 2500;
    };

    CoreGame.prototype._spawnBird = function(bird) {
      var halfSpeed, randomX, randomY;
      randomX = this._pickRandomX();
      randomY = Math.random() * game.height;
      if (!(bird != null)) {
        bird = this.birds.create(randomX, randomY, 'bird');
        bird.body.immovable = true;
      } else {
        bird.x = randomX;
        bird.y = randomY;
      }
      halfSpeed = MAX_BIRD_SPEED / 2;
      bird.body.velocity.x = -(Math.random() * halfSpeed) - halfSpeed;
      bird.body.velocity.y = (Math.random() * (MAX_BIRD_VERTICAL_SPEED / 2)) + (MAX_BIRD_VERTICAL_SPEED / 2);
      if (randomY >= this.game.height / 2) return bird.body.velocity.y *= -1;
    };

    CoreGame.prototype._checkForGameOver = function() {
      this.oldGameOver = this.gameOver;
      if (this.player.x <= -this.player.width || this.player.x >= this.game.width || this.player.y <= -this.player.height || this.player.y >= this.game.height) {
        this.gameOver = true;
      }
      if (this.oldGameOver !== true && this.gameOver === true && !this.restarting) {
        return this._gameOver();
      }
    };

    CoreGame.prototype._gameOver = function() {
      this.gameOverText = this.game.add.sprite(0, 0, 'ui-game-over');
      this._centerImage(this.gameOverText);
      this.gameOverText.y -= this.gameOverText.height / 2;
      this.restart = this.game.add.sprite(0, 0, 'ui-restart');
      this._centerImage(this.restart);
      this.restart.y = this.gameOverText.y + this.gameOverText.height + 48;
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      return this.scoreText = this.game.add.text(350, this.restart.y - 48, "Score: " + this.numBalloonsCollected);
    };

    CoreGame.prototype._centerImage = function(sprite) {
      sprite.x = (this.game.width - sprite.width) / 2;
      sprite.y = (this.game.height - sprite.height) / 2;
      return this.blackout.bringToTop();
    };

    CoreGame.prototype._reset = function() {
      this.restarting = false;
      this.player.x = this.player.y = 0;
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      return this.numBalloonsCollected = 0;
    };

    return CoreGame;

  })();

}).call(this);
