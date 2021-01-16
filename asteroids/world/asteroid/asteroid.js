export default function createAsteroid(posX, posY){
  const ASTEROID_SPEED = 20; // px per sec
  const ASTEROID_SIZE = 40; // asteriod diameter in px
  const ASTEROID_VERTS = 10; // avarage verts ammount
  const ASTEROID_JAG = 0.3; // jaggednest
  const ASTEROID_ROT = 15 / 180 * Math.PI; // avarage rotation speed in rad
  
  function randomLaunch(FPS = 30){
    this.velocity.x = (Math.random() + 0.1) * ASTEROID_SPEED * (Math.random() < 0.5 ? 1 : -1) / FPS
    this.velocity.y = (Math.random() + 0.1) * ASTEROID_SPEED * (Math.random() < 0.5 ? 1 : -1) / FPS
    this.rotation = Math.random() * ASTEROID_ROT / FPS
  }

  function getShape(){
    const result = {
      lineWidth: ASTEROID_SIZE / 15,
      points: [],
      color: this.collisions.length > 0 ? 'red' : 'slategrey'
    };

    for(let i = 0; i < this.verts; i++){
      result.points.push([
        this.x + (this.size * this.offsets[i]) * Math.cos(this.angle + (Math.PI * 2 / this.verts) * i), 
        this.y - (this.size * this.offsets[i]) * Math.sin(this.angle + (Math.PI * 2 / this.verts) * i)
      ])
    }
    return result
  }

  function collideWith(object){
    this.collisions.push(object)
  }

  function resetCollision(){
    this.collisions = [];
  }

  function update(){
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.angle += this.rotation
  }

  // create verts offsets array
  const verts = Math.floor(Math.random() * (ASTEROID_VERTS + 1) + ASTEROID_VERTS / 2);
  const offsets = [];
  for(let i = 0; i < verts; i++){
    offsets.push(Math.random() * ASTEROID_JAG + 1 - ASTEROID_JAG)
  }

  return {
    x: posX,
    y: posY,
    velocity: {x: 0, y: 0,},
    size: ASTEROID_SIZE,
    angle: Math.PI * 2 * Math.random(),
    verts: verts,
    offsets: offsets,
    rotation: 0,
    collisions: [],
    // methods
    randomLaunch,
    getShape,
    update,
    collideWith,
    resetCollision,
  }
}