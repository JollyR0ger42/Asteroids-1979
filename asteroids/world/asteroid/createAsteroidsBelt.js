import createAsteroid from './asteroid.js';

export default function createAsteroidsBelt(ammount, worldWidth, worldHeight, FPS = 30){
  const SAFE_ZONE_RADIUS = 200; // dist from center without asteroids

  const result = [];
  for(let i = 0; i < ammount; i++){
    let posX, posY;
    do {
      posX = Math.floor(Math.random() * worldWidth);
      posY = Math.floor(Math.random() * worldHeight);
    } while(distanceBetweenPoints(worldWidth / 2, worldHeight / 2, posX, posY) < SAFE_ZONE_RADIUS)

    const newAsteroid = createAsteroid(posX, posY);
    newAsteroid.randomLaunch(FPS)
    result.push(newAsteroid)
  }
  return result
}

function distanceBetweenPoints(x1, y1, x2, y2){
  return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
}