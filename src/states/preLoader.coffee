class window.Preloader
  preload: () ->  
  
    ## Setup loading bar ##
    loadingBar = @game.add.sprite(0, 0, 'loadingBar')
    loadingBar.x = (@game.width - loadingBar.width) / 2
    loadingBar.y = (@game.height - loadingBar.height) * 2 / 3
    @load.setPreloadSprite(loadingBar)
    
    text = @game.add.text(0, 0, 'Loading ...', { fill: '#fff' })
    text.x = (@game.width - text.width) / 2
    text.y = (@game.height - text.height) / 2
    
    
    ## Load everything! ##
    # Common
    @game.load.image('blackout', 'assets/graphics/blackout.png')
    
    # TitleScreen state
    @game.load.image('titlescreen', 'assets/graphics/titlescreen.png')
    
    # Core Game state
    @game.load.image('sky', 'assets/graphics/sky.png')
    @game.load.image('cloud', 'assets/graphics/cloud.png')
    @game.load.image('player', 'assets/graphics/player.png')
    @game.load.image('balloon', 'assets/graphics/balloon.png')
    @game.load.image('bird', 'assets/graphics/bird.png')

    @game.load.image('ui-balloons', 'assets/graphics/balloons.png')
    @game.load.image('ui-game-over', 'assets/graphics/game-over.png')
    @game.load.image('ui-restart', 'assets/graphics/restart-button.png')

  create: () ->
    @game.state.start('titleScreen')
