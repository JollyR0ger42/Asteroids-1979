export default function createInput(player, FPS){
  document.addEventListener('keydown', keyDown)
  document.addEventListener('keyup', keyUp)

  function keyDown(ev){
    switch(ev.keyCode){
      case 37: // left arrow, rotate left
        player.rotate(1 / FPS)
        break;
      case 38: // up arrow, thrust
        break;
      case 39: // right arrow, rotate right
        player.rotate(-1 / FPS)
    }
  }

  function keyUp(ev){
    switch(ev.keyCode){
      case 37: 
        player.rotate(0)
        break;
      case 38:
        break;
      case 39:
        player.rotate(0)
    }
  }
}