export default function createBullet(payload, FPS = 30){
  const BULLET_SPEED = 500; // px per sec
  const BULLET_LIFESPAN = 2; // in seconds
  const BULLET_SIZE = 1; // in px

  const self = {
    category: 'bullet',
    x: payload.x,
    y: payload.y,
    size: BULLET_SIZE,
    angle: payload.angle,
    velocity: {
      x: BULLET_SPEED * Math.cos(payload.angle) / FPS,
      y: BULLET_SPEED * Math.sin(payload.angle) / FPS,
    },
    lifeSpan: BULLET_LIFESPAN, // in seconds
    collisions: [],
  };

  const bulletMethods = self => ({
    getShape: () => {
      const shape = {
        lineWidth: 2,
        points: [],
        color: 'white',
      };
      shape.points.push([self.x-self.size, self.y-self.size])
      shape.points.push([self.x+self.size, self.y-self.size])
      shape.points.push([self.x+self.size, self.y+self.size])
      shape.points.push([self.x-self.size, self.y+self.size])
      return shape
    },
    update: () => {
      self.x += self.velocity.x
      self.y -= self.velocity.y
      self.lifeSpan -= 1 / FPS
      checkIfAlive(self)
    }
  });

  return Object.assign(self, bulletMethods(self))


  // "private" methods
  function checkIfAlive(self){
    const colidedAsteroid = self.collisions.find(objct => objct.category === 'asteroid')
    if(colidedAsteroid){
      self.emmit?.('destroyAsteroid', {bullet: self, asteroid: colidedAsteroid})
    } else if (self.lifeSpan <= 0) {
      self.emmit?.('destroyBullet', self)
    }
  }
}
