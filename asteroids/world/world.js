import createShip from './ship.js';

export default function createWorld(width = 100, height = 100){
  function update(){
    this.objects.forEach(object => object.update())
  }

  const result = {
    objects: [],
    update,
  };
  
  const player = createShip(width / 2, height / 2);
  result.objects.push(player)
  
  return result
}