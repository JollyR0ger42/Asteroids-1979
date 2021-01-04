export default function createShip(posX, posY, length = 20){
  const TURN_SPEED = 360; // degrees per sec

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
    const rotation = (TURN_SPEED / 180 * Math.PI) * coef;
    this.rotation = rotation
  }

  function update(){
    this.angle += this.rotation
  }

  return {
    x: posX,
    y: posY,
    angle: 90 / 180 * Math.PI,
    rotation: 0,
    getShape,
    rotate,
    update,
  }
}