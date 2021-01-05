export default function createShipController(ship, FPS){
  function dispatch(command){
    switch(command){
      case 'rotateLeft_on':
        ship.rotate(1 / FPS)
        break;
      case 'thrust_on':
        ship.toggleThrust(1 / FPS)
        break;
      case 'rotateRight_on':
        ship.rotate(-1 / FPS)
        break;
      case 'rotateRight_off':
      case 'rotateLeft_off':
        ship.rotate(0)
        break;
      case 'thrust_off':
        ship.toggleThrust(0)
        break;
    }
  }

  return {
    name: 'ship',
    dispatch
  }
}