import createShip from './ship/ship.js';
import createShipController from './ship/shipController.js';
import createAsteroidsBelt from './asteroid/createAsteroidsBelt.js';
import createCollision from './collision/collision.js';

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

  function emmit(eventName, payload){
    console.log(eventName, payload)
  }

  function init(target){
    const targets = target ? [target] : this.objects;
    targets.forEach(obj => obj.emmit = this.emmit)
  }

  const world = {
    objects: [],
    controllers: [],
    update,
    init,
    emmit,
  };
  
  const ship = createShip(width / 2, height / 2, 20);
  const shipController = createShipController(ship, FPS);
  const asteroidsBelt = createAsteroidsBelt(20, width, height)

  world.objects.push(ship)
  world.controllers.push(shipController)
  world.objects.push(...asteroidsBelt)
  
  world.init()
  createCollision(world.objects)
  return world
}