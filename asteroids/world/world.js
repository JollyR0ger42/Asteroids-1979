import createShip from './ship/ship.js';
import createShipController from './ship/shipController.js';
import createAsteroidsBelt from './asteroid/createAsteroidsBelt.js';
import createCollision from './collision/collision.js';
import createBullet from './bullet/bullet.js';
import createAsteroid from './asteroid/asteroid.js';

export default function createWorld(width = 100, height = 100, level = 1, FPS = 30){
  const ASTEROID_SIZE = 40; // asteriod diameter in px

  const world = {
    objects: [],
    controllers: [],
    score: 0,
    update,
    init,
    emmit,
    newLevel,
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

  function destroyAsteroid(asteroid){
    if(asteroid.size === ASTEROID_SIZE){
      world.score += 10
      for(let i = 0; i < 2; i++){
        let newAsteroid = createAsteroid(asteroid.x, asteroid.y, ASTEROID_SIZE / 2)
        newAsteroid.randomLaunch(FPS / 4) // dividing give to small asteroids more speed
        world.objects.push(newAsteroid)
        world.init(newAsteroid)
      }
    } else {
      world.score += 5
    }
    console.log('Score:', world.score)
  }

  function emmit(eventName, payload){
    switch(eventName){
      case 'shoot':
        let newBullet = createBullet(payload, FPS);
        world.objects.push(newBullet)
        world.init(newBullet)
        break;
      case 'destroy':
        let index = world.objects.indexOf(payload);
        world.objects.splice(index, 1)
        if(payload.category === 'asteroid') destroyAsteroid(payload);
        break;
      case 'gameover':
        world.newLevel()
        break;
    }
  }

  function init(target){
    const targets = target ? [target] : this.objects;
    targets.forEach(obj => obj.emmit = this.emmit)
  }

  function newLevel(){
    const ship = this.objects[0];
    ship.reset(width / 2, height / 2)
    const asteroidsBelt = createAsteroidsBelt(5, ASTEROID_SIZE, width, height, FPS)
    this.objects.splice(0, this.objects.length)
    this.objects.push(ship, ...asteroidsBelt)
    world.init()
    createCollision(this.objects)
  }
  
  const ship = createShip(width / 2, height / 2, 20);
  const shipController = createShipController(ship, FPS);

  world.objects.push(ship)
  world.controllers.push(shipController)
  
  world.newLevel()
  return world
}