export default function createWorldObj(target){
  const wolrdObjMethods = self => ({
    collideWith: collisionTarget => {
      self.collisions.push(collisionTarget)
    },
    resetCollision: () => {
      self.collision = []
    }
  });
  Object.assign(target, wolrdObjMethods(target))
}