import createShip from './ship/ship.js';
import createShipController from './ship/shipController.js';

export default function createWorld(width = 100, height = 100, FPS = 30){
  function update(){
    this.objects.forEach(object => object.update())
  }

  const result = {
    objects: [],
    controllers: [],
    update,
  };
  
  const ship = createShip(width / 2, height / 2, 20);
  const shipController = createShipController(ship, FPS);

  result.objects.push(ship)
  result.controllers.push(shipController)
  
  return result
}