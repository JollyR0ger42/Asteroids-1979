const SECOND = 1000; // in ms

export default function createCollision(objects, perSecond = 10){
  const NORMALIZER = 0.8; // coef to triger collision later then it should be for NORMALIZER < 1
  setInterval(() => {
    for(let objct of objects){
      objct.resetCollision()
    }

    for(let i = 0; i < objects.length; i++){
      let firstObj = objects[i];
      for(let secondObj of objects.slice(i+1)){
        let collisionDistance = firstObj.size + secondObj.size;
        if(distanceBetween(firstObj, secondObj) < collisionDistance * NORMALIZER){
          firstObj.collideWith(secondObj)
          secondObj.collideWith(firstObj)
        }
      }
    }
  }, SECOND / perSecond)
}

function distanceBetween(obj1, obj2){
  return Math.sqrt((obj1.x - obj2.x)**2 + (obj1.y - obj2.y)**2)
}