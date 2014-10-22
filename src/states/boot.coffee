class window.Boot
  preload: () ->    
    @game.load.image('loadingBar', 'assets/graphics/loading-bar.png');
    
  create: () ->
    @game.state.start('preLoader')
