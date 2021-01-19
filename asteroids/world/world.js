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
    score: 0,
    level: 1,
    // methods
    update,
    init,
    listener,
    setLevel,
  };

  function update(){
    // next level
    if(!this.objects.some(objct => objct.category === 'asteroid')){
      this.setLevel(this.level + 1)
    }

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

  function destroyAsteroid({bullet, asteroid}){
    let index = world.objects.indexOf(bullet);
    world.objects.splice(index, 1)
    index = world.objects.indexOf(asteroid)
    if(index > -1)
      world.objects.splice(index, 1);
    // splitting in two if necessary
    if(asteroid?.size === ASTEROID_SIZE){
      world.score += 10
      for(let i = 0; i < 2; i++){
        let newAsteroid = createAsteroid(asteroid.x, asteroid.y, ASTEROID_SIZE / 2)
        newAsteroid.randomLaunch(FPS / 3) // dividing give to small asteroids more speed
        world.objects.push(newAsteroid)
        world.init(newAsteroid)
      }
    } else if (asteroid) {
      world.score += 5
    }
    console.log('Score:', world.score)
  }

  function listener(eventName, payload){
    switch(eventName){
      case 'shoot':
        let newBullet = createBullet(payload, FPS);
        world.objects.push(newBullet)
        world.init(newBullet)
        break;
      case 'destroyAsteroid':
        destroyAsteroid(payload);
        break;
      case 'gameover':
        world.setLevel(1)
        break;
    }
  }

  function init(target){
    const targets = target ? [target] : this.objects;
    targets.forEach(obj => obj.emmit = this.listener)
  }

  function setLevel(level){
    this.emmit?.('newLevel')
    if(level) world.level = level;
    
    const ship = this.objects[0];
    ship.reset(width / 2, height / 2)

    const asteroidsAmmount = 1 + world.level * 2
    const asteroidsBelt = createAsteroidsBelt(asteroidsAmmount, ASTEROID_SIZE, width, height, FPS / world.level) // asteroids speed changes depends on FPS param, kinda stupid, but kinda smart -_-
    
    this.objects.splice(0, this.objects.length)
    this.objects.push(ship, ...asteroidsBelt)

    world.init()
    createCollision(this.objects)
  }
  
  const ship = createShip(width / 2, height / 2, 20);
  const shipController = createShipController(ship, FPS);

  world.objects.push(ship)
  world.controllers.push(shipController)
  
  world.setLevel()
  return world
}