import createShip from './ship/ship.js';
import createShipController from './ship/shipController.js';
import createAsteroidsBelt from './asteroid/createAsteroidsBelt.js';
import createCollision from './collision/collision.js';
import createBullet from './bullet/bullet.js';
import createAsteroid from './asteroid/asteroid.js';
import createWorldObj from './createWorldObj.js';

export default function createWorld(width = 100, height = 100, FPS = 30){
  const ASTEROID_SIZE = 40; // asteriod diameter in px
  const ASTEROID_SIZE_OPT_COUNT = 3; // how much diff size asteroids could have, 3 - means that asteroid break 2 times

  const self = {
    objects: [],
    controllers: [],
    score: 0,
    level: 1,
  };

  const worldMethods = self => ({
    update: () => {
      // next level
      if(!self.objects.some(objct => objct.category === 'asteroid')){
        self.setLevel(self.level + 1)
      }
      self.objects.forEach(object => {
        object.update(FPS)
        // loop space
        if(object.category === 'ship' || object.category === 'asteroid'){
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
        }
      })
    },
    init: (target) => {
      const targets = target ? [target] : self.objects;
      targets.forEach(obj => {
        createWorldObj(obj)
        obj.emmit = self.listener
      })
    },
    listener: (eventName, payload) => {
      switch(eventName){
        case 'shoot':
          let newBullet = createBullet(payload, FPS);
          self.objects.push(newBullet)
          self.init(newBullet)
          break;
        case 'destroyAsteroid':
          destroyAsteroid(payload);
          break;
        case 'destroyBullet':
          let index = self.objects.indexOf(payload);
          self.objects.splice(index, 1)
          break;
        case 'gameover':
          self.emmit?.('gameover')
          break;
        case 'resetGame':
          self.score = 0
          self.setLevel(1)
          break;
      }
    },
    setLevel: (level) => {
      self.emmit?.('newLevel')
      if(level) self.level = level;
      
      const ship = self.objects[0];
      ship.reset(width / 2, height / 2)
  
      const asteroidsAmmount = 3 + self.level * 2
      const asteroidsBelt = createAsteroidsBelt(asteroidsAmmount, ASTEROID_SIZE, width, height, FPS / self.level) // asteroids speed changes depends on FPS param, kinda stupid, but kinda smart -_-
      
      self.objects.splice(0, self.objects.length)
      self.objects.push(ship, ...asteroidsBelt)
  
      self.init()
      createCollision(self.objects)
    }
  });
  Object.assign(self, worldMethods(self))
  

  const asteroidSizeStep = Math.floor(ASTEROID_SIZE / ASTEROID_SIZE_OPT_COUNT);
  const asteroidMinSize = ASTEROID_SIZE - (ASTEROID_SIZE_OPT_COUNT - 1) * asteroidSizeStep;
  function breakAsteroid(asteroid, piecesCount = 2){
    for(let i = 0; i < piecesCount; i++){
      let newAsteroid = createAsteroid(asteroid.x, asteroid.y, asteroid.size - asteroidSizeStep);
      newAsteroid.randomLaunch(asteroid.speedCoef / 2) // dividing give to small asteroids more speed
      self.objects.push(newAsteroid)
      self.init(newAsteroid)
    }
  }

  function destroyAsteroid({bullet, asteroid}){
    let index = self.objects.indexOf(bullet);
    self.objects.splice(index, 1)
    index = self.objects.indexOf(asteroid)
    self.objects.splice(index, 1);
    // splitting in two if necessary
    if(asteroid?.size > asteroidMinSize){
      self.score += 10
      breakAsteroid(asteroid)
    } else if (asteroid) {
      self.score += 5
    }
  }
  
  const ship = createShip(width / 2, height / 2, 20);
  const shipController = createShipController(ship, FPS);

  self.objects.push(ship)
  self.controllers.push(shipController)
  
  self.setLevel()
  return self
}