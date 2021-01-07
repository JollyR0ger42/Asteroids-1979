import createShip from './ship/ship.js';
import createShipController from './ship/shipController.js';
import createAsteroidsBelt from './asteroid/createAsteroidsBelt.js';

export default function createWorld(width = 100, height = 100, FPS = 30){
  function update(){
    this.objects.forEach(object => {
      object.update()
      // loop space
      if(object.x < 0 - object.size){
        object.x = width + object.size
      } else if(object.x > width + object.size){
        object.x = 0 - object.size
      }
      if(object.y < 0 - object.size){
        object.y = height + object.size
      } else if(object.y > height + object.size){
        object.y = 0 - object.size
      }
    })
  }

  const result = {
    objects: [],
    controllers: [],
    update,
  };
  
  const ship = createShip(width / 2, height / 2, 20);
  const shipController = createShipController(ship, FPS);
  const asteroidsBelt = createAsteroidsBelt(20, width, height)

  result.objects.push(ship)
  result.controllers.push(shipController)
  result.objects.push(...asteroidsBelt)
  
  return result
}