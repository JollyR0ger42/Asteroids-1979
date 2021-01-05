export default function createShipController(ship, FPS){
  function dispatch(command){
    switch(command){
      case 'rotateLeft_on':
        ship.rotate(1 / FPS)
        break;
      case 'thrust_on':
        break;
      case 'rotateRight_on':
        ship.rotate(-1 / FPS)
        break;
      case 'rotateRight_off':
      case 'rotateLeft_off':
        ship.rotate(0)
        break;
      case 'thrust_off':
        break;
    }
  }

  return {
    name: 'ship',
    dispatch
  }
}
  // function keyDown(ev){
  //   switch(ev.keyCode){
  //     case 37: // left arrow, rotate left
  //       player.rotate(1 / FPS)
  //       break;
  //     case 38: // up arrow, thrust
  //       break;
  //     case 39: // right arrow, rotate right
  //       player.rotate(-1 / FPS)
  //   }
  // }

  // function keyUp(ev){
  //   switch(ev.keyCode){
  //     case 37: 
  //     case 38:
  //     case 39:
  //       player.rotate(0)
  //   }
  // }