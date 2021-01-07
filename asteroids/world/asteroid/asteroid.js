export default function createAsteroid(posX, posY){
  const ASTEROID_SPEED = 5; // px per sec
  const ASTEROID_SIZE = 50; // asteriod diameter in px
  const ASTEROID_VERTS = 10; // avarage verts ammount
  const ASTEROID_JAG = 0.5; // jaggednest
  
  function randomLaunch(FPS = 30){
    this.velocity.x = (Math.random() + 0.1) * ASTEROID_SPEED * (Math.random() < 0.5 ? 1 : -1) / FPS
    this.velocity.y = (Math.random() + 0.1) * ASTEROID_SPEED * (Math.random() < 0.5 ? 1 : -1) / FPS
  }

  function getShape(){
    const result = {
      lineWidth: ASTEROID_SIZE / 20,
      points: [],
      color: 'slategrey'
    };

    for(let i = 0; i < this.verts; i++){
      result.points.push([
        this.x + (this.size * this.offsets[i]) * Math.cos(this.angle + (Math.PI * 2 / this.verts) * i), 
        this.y - (this.size * this.offsets[i]) * Math.sin(this.angle + (Math.PI * 2 / this.verts) * i)
      ])
    }
    return result
  }

  function update(){

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
    // methods
    randomLaunch,
    getShape,
    update,
  }
}