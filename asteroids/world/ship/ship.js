export default function createShip(posX, posY){
  const SHIP_LENGTH = 15;
  const TURN_SPEED = 200; // degrees per sec
  const SHIP_THRUST = 5; // acceleration in px per sec
  const FRICTION = 0.33; // ship slowdown
  const RELOAD_TIME = 0.33; // seconds to reload
  let lastThrusting = 0; // will save here last non-zero thrust, would be handy to slowdown

  const self = {
    category: 'ship',
    x: posX,
    y: posY,
    size: SHIP_LENGTH,
    acceleration: {x: 0, y: 0},
    thrusting: 0,
    angle: 90 / 180 * Math.PI,
    rotation: 0,
    collisions: [],
    isAlive: true,
    isShooting: false,
    reloading: 0, // seconds left to reload after shot
  };

  const shipMethods = self => ({
    getShape: () => {
      const shape = {
        lineWidth: SHIP_LENGTH / 10,
        points: [],
        color: self.isAlive ? 'white' : 'grey'
      };
      shape.points.push([
        self.x + self.size * Math.cos(self.angle), 
        self.y - self.size * Math.sin(self.angle)
      ]) // nose
      shape.points.push([
        self.x + self.size * Math.cos(self.angle + 145 / 180 * Math.PI), 
        self.y - self.size * Math.sin(self.angle + 145 / 180 * Math.PI)
      ]) // left corner
      shape.points.push([
        self.x + self.size * Math.cos(self.angle +  Math.PI) * 0.75, // 0.75 - for curvy back
        self.y - self.size * Math.sin(self.angle +  Math.PI) * 0.75
      ]) // back
      shape.points.push([
        self.x + self.size * Math.cos(self.angle - 145 / 180 * Math.PI), 
        self.y - self.size * Math.sin(self.angle - 145 / 180 * Math.PI)
      ]) // right corner
      return shape
    },
    rotate: (coef) => {self.rotation = (TURN_SPEED / 180 * Math.PI) * coef},
    toggleThrust: (coef) => {
      self.thrusting = coef
      lastThrusting = coef || lastThrusting
    },
    allowShooting: (input) => {self.isShooting = input},
    update: (FPS = 30) => {
      // rotation
      self.angle += self.rotation
      // thrust
      if(self.thrusting) thrust(self)
        else slowDown(self);
      // movement
      self.x += self.acceleration.x
      self.y -= self.acceleration.y
      // shooting
      if(self.reloading >= 0) self.reloading -= 1 / FPS;
      if(self.isShooting && self.reloading <= 0) shoot(self);
      checkIfAlive(self)
    },
    reset: (posX, posY) => {
      self.x = posX
      self.y = posY
      self.angle = 90 / 180 * Math.PI
      self.acceleration = {x:0, y:0}
      self.isAlive = true
      self.collisions = []
    },
    resetGame: () => {self.emmit?.('resetGame')}
  })

  return Object.assign(self, shipMethods(self))


  // private methods
  function thrust(self){
    self.acceleration.x += SHIP_THRUST * Math.cos(self.angle) * self.thrusting
    self.acceleration.y += SHIP_THRUST * Math.sin(self.angle) * self.thrusting
  }
  function slowDown(self){
    self.acceleration.x -= FRICTION * self.acceleration.x * lastThrusting
    self.acceleration.y -= FRICTION * self.acceleration.y * lastThrusting
  }
  function checkIfAlive(self){
    if(self.collisions.some(objct => objct.category === 'asteroid')){
      self.isAlive = false
      self.isShooting = false
      self.rotate(0)
      self.toggleThrust(0)
      self.emmit?.('gameover')
    }
  }
  function shoot(self){
    self.reloading = RELOAD_TIME
    // create bullet object
    self.emmit?.('shoot', {
      x: self.getShape().points[0][0],
      y: self.getShape().points[0][1],
      angle: self.angle,
    })
  }
}
