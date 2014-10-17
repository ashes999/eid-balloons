class window.TitleScreen
  preload: () ->  
    @game.load.image('titlescreen', 'assets/graphics/titlescreen.png')

  create: () ->
    @blackout = @game.add.sprite(0, 0, 'blackout')
    @blackout.alpha = 0
    
    @fadeOutTween = @game.add.tween(@blackout)
    @fadeOutTween.to({ alpha: 1 }, 500, null)
    @fadeOutTween.onComplete.add(() ->
      # Switch states
      alert('hi')
    , this)
    
  update: () ->       
    if (game.input.activePointer.isDown && @blackout.alpha == 0)
      @fadeOutTween.start()
