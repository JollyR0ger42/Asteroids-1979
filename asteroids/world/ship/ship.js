export default function createShip(posX, posY){
  const SHIP_LENGTH = 15;
  const TURN_SPEED = 360; // degrees per sec
  const SHIP_THRUST = 5; // acceleration in px per sec
  const FRICTION = 0.33; // ship slowdown
  const RELOAD_TIME = 0.5; // seconds to reload
  let lastThrusting = 0; // will save here last non-zero thrust, would be handy to slowdown

  function getShape(){
    const result = {
      lineWidth: SHIP_LENGTH / 10,
      points: [],
      color: this.isAlive ? (this.collisions.length > 0 ? 'red' : 'white') : 'grey'
    };

    result.points.push([
      this.x + this.size * Math.cos(this.angle), 
      this.y - this.size * Math.sin(this.angle)
    ]) // nose
    result.points.push([
      this.x + this.size * Math.cos(this.angle + 145 / 180 * Math.PI), 
      this.y - this.size * Math.sin(this.angle + 145 / 180 * Math.PI)
    ]) // left corner
    result.points.push([
      this.x + this.size * Math.cos(this.angle +  Math.PI) * 0.75, // 0.75 - for curvy back
      this.y - this.size * Math.sin(this.angle +  Math.PI) * 0.75
    ]) // back
    result.points.push([
      this.x + this.size * Math.cos(this.angle - 145 / 180 * Math.PI), 
      this.y - this.size * Math.sin(this.angle - 145 / 180 * Math.PI)
    ]) // right corner

    return result
  }

  function rotate(coef){ // positive coef - rotate left, negative - right
    this.rotation = (TURN_SPEED / 180 * Math.PI) * coef;
  }

  function toggleThrust(coef){ 
    this.thrusting = coef
    lastThrusting = coef || lastThrusting
  }
  
  function thrust(ship){
    ship.acceleration.x += SHIP_THRUST * Math.cos(ship.angle) * ship.thrusting
    ship.acceleration.y += SHIP_THRUST * Math.sin(ship.angle) * ship.thrusting
  }

  function slowDown(ship){
    ship.acceleration.x -= FRICTION * ship.acceleration.x * lastThrusting
    ship.acceleration.y -= FRICTION * ship.acceleration.y * lastThrusting
  }

  function collideWith(object){
    this.collisions.push(object)
    checkIfAlive(this)
  }

  function resetCollision(){
    this.collisions = [];
  }

  function checkIfAlive(ship){
    if(ship.collisions.some(objct => objct.category === 'asteroid')){
      ship.isAlive = false
      ship.isShooting = false
      ship.rotate(0)
      ship.toggleThrust(0)
      console.log('YOU DIED')
      ship.emmit('gameover')
    }
  }

  function allowShooting(input){
    this.isShooting = input
  }

  function shoot(ship){
    if(ship.emmit){
      ship.reloading = RELOAD_TIME
      ship.emmit('shoot', {
        x: ship.getShape().points[0][0],
        y: ship.getShape().points[0][1],
        angle: ship.angle,
      })
    }
  }

  function update(FPS = 30){
    // rotation
    this.angle += this.rotation
    // thrust
    if(this.thrusting) thrust(this)
      else slowDown(this);
    // movement
    this.x += this.acceleration.x
    this.y -= this.acceleration.y
    // shooting
    if(this.reloading >= 0) this.reloading -= 1 / FPS;
    if(this.isShooting && this.reloading <= 0) shoot(this);
  }

  return {
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
    // methods
    getShape,
    rotate,
    toggleThrust,
    update,
    collideWith,
    resetCollision,
    allowShooting,
  }
}