export default function createBullet(payload, FPS = 30){
  const BULLET_SPEED = 500; // px per sec

  function getShape(){
    const result = {
      lineWidth: 2,
      points: [],
      color: this.lifeSpan > 0 ? 'white' : 'red'
    };
    result.points.push([this.x-this.size, this.y-this.size])
    result.points.push([this.x+this.size, this.y-this.size])
    result.points.push([this.x+this.size, this.y+this.size])
    result.points.push([this.x-this.size, this.y+this.size])
    return result
  }

  function resetCollision(){

  }

  function collideWith(){

  }

  function checkIfAlive(self){
    if(self.lifeSpan <= 0){
      self.emmit('destroy', self)
    }
  }

  function update(){
    this.x += this.velocity.x
    this.y -= this.velocity.y
    this.lifeSpan -= 1 / FPS
    checkIfAlive(this)
  }

  console.log(payload)
  return {
    x: payload.x,
    y: payload.y,
    size: 1,
    angle: payload.angle,
    velocity: {
      x: BULLET_SPEED * Math.cos(payload.angle) / FPS,
      y: BULLET_SPEED * Math.sin(payload.angle) / FPS,
    },
    lifeSpan: 2, // in seconds
    // methods
    update,
    getShape,
    resetCollision,
    collideWith,
  }
}