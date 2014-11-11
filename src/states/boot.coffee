class window.Boot
  preload: () ->    
    # Scale to fit screen, preserving aspect ratio
    @game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    
    @_setPixelPerfectScaling()

    # Only support one orientation
    @game.scale.forceLandscape = true
    
    @game.load.image('loadingBar', 'assets/graphics/loading-bar.png');
    
  create: () ->
    @game.onresize = () ->
      @game.scale.refresh()
      
    @game.state.start('preLoader')
    
  _setPixelPerfectScaling: () ->
    Phaser.Canvas.setSmoothingEnabled(@game.context, false)
