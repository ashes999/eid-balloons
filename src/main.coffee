window.onload = () ->  
  @game = new Phaser.Game(800, 600, Phaser.CANVAS, '')
  
  @game.state.add('boot', new window.Boot)
  @game.state.add('preLoader', new window.Preloader)
  @game.state.add('titleScreen', new window.TitleScreen)
  @game.state.add('coreGame', new window.CoreGame)

  
  @game.state.start('boot')

