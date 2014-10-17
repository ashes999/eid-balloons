window.onload = () ->  
  @game = new Phaser.Game(800, 600, Phaser.CANVAS, '')
  @game.state.add('coreGame', new window.CoreGame)
  @game.state.add('titleScreen', new window.TitleScreen)
  @game.state.start('coreGame')

