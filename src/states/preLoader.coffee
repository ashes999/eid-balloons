class window.Preloader
  # TODO: add stuff for other states too
  # TODO: seperate this state from the core game
  preload: () ->  

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
