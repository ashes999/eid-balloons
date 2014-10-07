class CoreGameplayState
  MOVE_SPEED = 300
  NUM_CLOUDS = 5 # always on screen at once
  MAX_CLOUD_SPEED = 200
    
  preload: () ->  
    @game.load.image('sky', 'assets/graphics/sky.png')
    @game.load.image('cloud', 'assets/graphics/cloud.png')
    @game.load.image('player', 'assets/graphics/player.png')

  create: () ->
    #  A simple background for our game
    @game.add.sprite(0, 0, 'sky')
    @clouds = []
    
    # N clouds
    for i in [1..NUM_CLOUDS]
      randomX = this._pickCloudX();
      randomY = Math.random() * @game.height
      cloud = @game.add.sprite(randomX, randomY, 'cloud')
      quarterSpeed = MAX_CLOUD_SPEED / 4
      # 25-100% of MAX_CLOUD_SPEED
      cloud.body.velocity.x = -(Math.random() * 3 * quarterSpeed) - quarterSpeed
      scale = this._pickCloudScale()
      cloud.scale.setTo(scale, scale)
      @clouds.push(cloud)
    
    @player = @game.add.sprite(0, 0, 'player')
    @game.camera.follow(@player)
    @cursors = game.input.keyboard.createCursorKeys();  
    
  update: () ->
    this._updatePlayerVelocity();
    this._respawnOffScreenClouds();
    
  # begin: private methods
  
  _updatePlayerVelocity: () ->
    if @cursors.up.isDown
      @player.body.velocity.y = -1 * MOVE_SPEED;
    else if @cursors.down.isDown
      @player.body.velocity.y = MOVE_SPEED;
    else
      # Standing still
      
    # Decelerate
    if @player.body.velocity.y != 0
      @player.body.velocity.y *= 0.9   
      
    @player.body.velocity.y = 0 if Math.abs(@player.body.velocity.y) <= 5
    
  _respawnOffScreenClouds: () ->
    for cloud in @clouds
      if cloud.x <= -cloud.width
        cloud.x = this._pickCloudX()
        cloud.y = Math.random() * @game.height
        scale = this._pickCloudScale()
        cloud.scale.setTo(scale, scale)
    
  _pickCloudX: () ->
    return @game.width + (Math.random() * @game.width) 
  
  _pickCloudScale: () ->
    return 0.25 + (Math.random() * 0.75)
  
window.onload = () ->  
  @game = new Phaser.Game(800, 600, Phaser.AUTO, '', new CoreGameplayState)  

