class window.TitleScreen

  create: () ->
    @game.add.sprite(0, 0, 'titlescreen')
    
    @blackout = @game.add.sprite(0, 0, 'blackout')
    
    @fadeOutTween = @game.add.tween(@blackout)
    @fadeOutTween.to({ alpha: 1 }, 1000, null)
    @fadeOutTween.onComplete.add(() ->
      @game.state.start('coreGame')
    , this)    
    
    fadeInTween = @game.add.tween(@blackout)
    fadeInTween.to({ alpha: 0 }, 1000, null)
    fadeInTween.start()
    
  update: () ->       
    if (game.input.activePointer.isDown && @blackout.alpha == 0)
      @fadeOutTween.start()
