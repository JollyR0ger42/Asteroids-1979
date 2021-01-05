export default function createShip(posX, posY, length = 20){
  const TURN_SPEED = 360; // degrees per sec
  const SHIP_THRUST = 5; // acceleration in px per sec

  function getShape(){
    const result = {
      lineWidth: length / 10,
      points: []
    };

    result.points.push([
      this.x + length * Math.cos(this.angle), 
      this.y - length * Math.sin(this.angle)
    ]) // nose
    result.points.push([
      this.x + length * Math.cos(this.angle + 150 / 180 * Math.PI), 
      this.y - length * Math.sin(this.angle + 150 / 180 * Math.PI)
    ]) // left corner
    result.points.push([
      this.x + length * Math.cos(this.angle +  Math.PI) * 0.75, // 0.75 - for curvy back
      this.y - length * Math.sin(this.angle +  Math.PI) * 0.75
    ]) // back
    result.points.push([
      this.x + length * Math.cos(this.angle - 150 / 180 * Math.PI), 
      this.y - length * Math.sin(this.angle - 150 / 180 * Math.PI)
    ]) // right corner

    return result
  }

  function rotate(coef){ // positive coef - rotate left, negative - right
    this.rotation = (TURN_SPEED / 180 * Math.PI) * coef;
  }

  function toggleThrust(coef){ 
    this.thrusting = coef
  }
  
  function thrust(){
    this.acceleration.x += SHIP_THRUST * Math.cos(this.angle) * this.thrusting
    this.acceleration.y += SHIP_THRUST * Math.sin(this.angle) * this.thrusting
  }

  function update(){
    this.angle += this.rotation
    if(this.thrusting) this.thrust();
    this.x += this.acceleration.x
    this.y -= this.acceleration.y
  }

  return {
    x: posX,
    y: posY,
    acceleration: {x: 0, y: 0},
    thrusting: 0,
    angle: 90 / 180 * Math.PI,
    rotation: 0,
    getShape,
    rotate,
    toggleThrust,
    thrust,
    update,
  }
}