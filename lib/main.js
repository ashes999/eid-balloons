(function() {
  var CoreGameplayState;

  CoreGameplayState = (function() {
    var MAX_BALLOON_SPEED, MAX_CLOUD_SPEED, MOVE_SPEED, NUM_BALLOONS, NUM_CLOUDS;

    function CoreGameplayState() {}

    MOVE_SPEED = 300;

    NUM_CLOUDS = 5;

    NUM_BALLOONS = 5;

    MAX_CLOUD_SPEED = 200;

    MAX_BALLOON_SPEED = 250;

    CoreGameplayState.prototype.preload = function() {
      this.game.load.image('sky', 'assets/graphics/sky.png');
      this.game.load.image('cloud', 'assets/graphics/cloud.png');
      this.game.load.image('player', 'assets/graphics/player.png');
      this.game.load.image('balloon', 'assets/graphics/balloon.png');
      return this.game.load.image('ui-balloons', 'assets/graphics/balloons.png');
    };

    CoreGameplayState.prototype.create = function() {
      var balloons, cloud, cloudsGroup, i, quarterSpeed, randomX, randomY, scale;
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.balloonsCollected = 0;
      this.game.add.sprite(0, 0, 'sky');
      this.clouds = [];
      cloudsGroup = this.game.add.group();
      cloudsGroup.enableBody = true;
      this.balloons = [];
      for (i = 1; 1 <= NUM_CLOUDS ? i <= NUM_CLOUDS : i >= NUM_CLOUDS; 1 <= NUM_CLOUDS ? i++ : i--) {
        randomX = this._pickCloudX();
        randomY = Math.random() * this.game.height;
        cloud = cloudsGroup.create(randomX, randomY, 'cloud');
        quarterSpeed = MAX_CLOUD_SPEED / 4;
        cloud.body.velocity.x = -(Math.random() * 3 * quarterSpeed) - quarterSpeed;
        scale = this._pickCloudScale();
        cloud.scale.setTo(scale, scale);
        this.clouds.push(cloud);
      }
      this.balloonGroup = this.game.add.group();
      this.balloonGroup.enableBody = true;
      for (i = 1; 1 <= NUM_BALLOONS ? i <= NUM_BALLOONS : i >= NUM_BALLOONS; 1 <= NUM_BALLOONS ? i++ : i--) {
        this._spawnBalloon();
      }
      balloons = this.game.add.sprite(8, this.game.height - 64 - 8, 'ui-balloons');
      this.numBalloons = this.game.add.text(16, this.game.height - 32, 'x0', {
        font: '28px Sans',
        fill: '#000'
      });
      this.player = this.game.add.sprite(0, 0, 'player');
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.game.camera.follow(this.player);
      return this.cursors = game.input.keyboard.createCursorKeys();
    };

    CoreGameplayState.prototype.update = function() {
      this.game.physics.arcade.overlap(this.player, this.balloonGroup, this._balloonCollected, null, this);
      this._updatePlayerVelocity();
      this._respawnOffScreenClouds();
      this._applyWavesToBalloons();
      return this._respawnOffScreenBalloons();
    };

    CoreGameplayState.prototype._updatePlayerVelocity = function() {
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

    CoreGameplayState.prototype._respawnOffScreenClouds = function() {
      var cloud, scale, _i, _len, _ref, _results;
      _ref = this.clouds;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cloud = _ref[_i];
        if (cloud.x <= -cloud.width) {
          cloud.x = this._pickCloudX();
          cloud.y = Math.random() * this.game.height;
          scale = this._pickCloudScale();
          _results.push(cloud.scale.setTo(scale, scale));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    CoreGameplayState.prototype._respawnOffScreenBalloons = function() {
      var balloon, _i, _len, _ref, _results;
      _ref = this.balloons;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        balloon = _ref[_i];
        if (balloon.x <= -balloon.width) {
          balloon.x = this._pickCloudX();
          balloon.y = Math.random() * (this.game.height - 64);
          _results.push(balloon.randomY = Math.random() * 500);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    CoreGameplayState.prototype._applyWavesToBalloons = function() {
      var balloon, _i, _len, _ref, _results;
      _ref = this.balloons;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        balloon = _ref[_i];
        _results.push(balloon.y += 2 * Math.sin((this.game.time.now + balloon.randomY) / 500));
      }
      return _results;
    };

    CoreGameplayState.prototype._pickCloudX = function() {
      return this.game.width + (Math.random() * this.game.width);
    };

    CoreGameplayState.prototype._pickCloudScale = function() {
      return 0.25 + (Math.random() * 0.75);
    };

    CoreGameplayState.prototype._balloonCollected = function(player, balloon) {
      balloon.kill();
      this.balloonsCollected += 1;
      this.numBalloons.text = "x" + this.balloonsCollected;
      return this._spawnBalloon();
    };

    CoreGameplayState.prototype._spawnBalloon = function() {
      var balloon, halfSpeed, randomX, randomY;
      randomX = this._pickCloudX();
      randomY = Math.random() * (this.game.height - 64);
      balloon = this.balloonGroup.create(randomX, randomY, 'balloon');
      halfSpeed = MAX_BALLOON_SPEED / 2;
      balloon.body.velocity.x = -(Math.random() * halfSpeed) - halfSpeed;
      balloon.randomY = Math.random() * 500;
      return this.balloons.push(balloon);
    };

    return CoreGameplayState;

  })();

  window.onload = function() {
    return this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', new CoreGameplayState);
  };

}).call(this);
