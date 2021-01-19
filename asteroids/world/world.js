import createShip from './ship/ship.js';
import createShipController from './ship/shipController.js';
import createAsteroidsBelt from './asteroid/createAsteroidsBelt.js';
import createCollision from './collision/collision.js';
import createBullet from './bullet/bullet.js';
import createAsteroid from './asteroid/asteroid.js';

export default function createWorld(width = 100, height = 100, FPS = 30){
  const ASTEROID_SIZE = 40; // asteriod diameter in px

  const world = {
    objects: [],
    controllers: [],
    update,
    init,
    emmit,
  };

  function update(){
    this.objects.forEach(object => {
      object.update(FPS)
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
    if(eventName === 'shoot'){
      let newBullet = createBullet(payload, FPS);
      world.objects.push(newBullet)
      world.init(newBullet)
    }
    if(eventName === 'destroy'){
      let index = world.objects.indexOf(payload);
      world.objects.splice(index, 1)
      if(payload.category === 'asteroid' && payload.size === ASTEROID_SIZE){
        for(let i = 0; i < 2; i++){
          let newAsteroid = createAsteroid(payload.x, payload.y, ASTEROID_SIZE / 2)
          newAsteroid.randomLaunch(FPS / 4) // dividing give to small asteroids more speed
          world.objects.push(newAsteroid)
          world.init(newAsteroid)
        }
      }
    }
  }

  function init(target){
    const targets = target ? [target] : this.objects;
    targets.forEach(obj => obj.emmit = this.emmit)
  }
  
  const ship = createShip(width / 2, height / 2, 20);
  const shipController = createShipController(ship, FPS);
  const asteroidsBelt = createAsteroidsBelt(20, ASTEROID_SIZE, width, height, FPS)

  world.objects.push(ship)
  world.controllers.push(shipController)
  world.objects.push(...asteroidsBelt)
  
  world.init()
  createCollision(world.objects)
  return world
}