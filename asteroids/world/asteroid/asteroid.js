export default function createAsteroid(posX, posY, size){
  const ASTEROID_SPEED = 20; // px per sec
  const ASTEROID_VERTS = 10; // avarage verts ammount
  const ASTEROID_JAG = 0.3; // jaggednest
  const ASTEROID_ROT = 15 / 180 * Math.PI; // avarage rotation speed in rad
  
  const self = {
    category: 'asteroid',
    x: posX,
    y: posY,
    velocity: {x: 0, y: 0,},
    size: size,
    angle: Math.PI * 2 * Math.random(),
    verts: null,
    offsets: null,
    rotation: 0,
    collisions: [],
    speedCoef: null,
  };

  const asteroidMethods = self => ({
    randomLaunch: (FPS = 30) => {
      self.speedCoef = FPS
      self.velocity.x = (Math.random() + 0.1) * ASTEROID_SPEED * (Math.random() < 0.5 ? 1 : -1) / FPS
      self.velocity.y = (Math.random() + 0.1) * ASTEROID_SPEED * (Math.random() < 0.5 ? 1 : -1) / FPS
      self.rotation = Math.random() * ASTEROID_ROT / FPS
    },
    getShape: () => {
      const result = {
        lineWidth: size / 15,
        points: [],
        color: 'slategrey'
      };
      for(let i = 0; i < self.verts; i++){
        result.points.push([
          self.x + (self.size * self.offsets[i]) * Math.cos(self.angle + (Math.PI * 2 / self.verts) * i), 
          self.y - (self.size * self.offsets[i]) * Math.sin(self.angle + (Math.PI * 2 / self.verts) * i)
        ])
      }
      return result
    },
    update: () => {
      self.x += self.velocity.x
      self.y += self.velocity.y
      self.angle += self.rotation
    },
  });

  // create verts offsets array
  const verts = Math.floor(Math.random() * (ASTEROID_VERTS + 1) + ASTEROID_VERTS / 2);
  const offsets = [];
  for(let i = 0; i < verts; i++){
    offsets.push(Math.random() * ASTEROID_JAG + 1 - ASTEROID_JAG)
  }
  self.verts = verts
  self.offsets = offsets

  return Object.assign(self, asteroidMethods(self))
}