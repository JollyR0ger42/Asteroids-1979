export default function createBullet(payload, FPS = 30){
  const BULLET_SPEED = 500; // px per sec

  function getShape(){
    const result = {
      lineWidth: 2,
      points: [],
      color: 'white',
    };
    result.points.push([this.x-this.size, this.y-this.size])
    result.points.push([this.x+this.size, this.y-this.size])
    result.points.push([this.x+this.size, this.y+this.size])
    result.points.push([this.x-this.size, this.y+this.size])
    return result
  }

  function collideWith(object){
    this.collisions.push(object)
  }

  function resetCollision(){
    this.collisions = [];
  }

  function checkIfAlive(self){
    const colidedAsteroid = self.collisions.find(objct => objct.category === 'asteroid')
    if(colidedAsteroid){
      self.emmit?.('destroyAsteroid', {bullet: self, asteroid: colidedAsteroid})
    } else if (self.lifeSpan <= 0) {
      self.emmit?.('destroyBullet', self)
    }
  }

  function update(){
    this.x += this.velocity.x
    this.y -= this.velocity.y
    this.lifeSpan -= 1 / FPS
    checkIfAlive(this)
  }

  return {
    category: 'bullet',
    x: payload.x,
    y: payload.y,
    size: 1,
    angle: payload.angle,
    velocity: {
      x: BULLET_SPEED * Math.cos(payload.angle) / FPS,
      y: BULLET_SPEED * Math.sin(payload.angle) / FPS,
    },
    lifeSpan: 2, // in seconds
    collisions: [],
    // methods
    update,
    getShape,
    resetCollision,
    collideWith,
  }
}