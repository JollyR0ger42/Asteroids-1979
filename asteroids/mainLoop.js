export default function initLoop(world, render, FPS){
  setInterval(() => {
    world.update()
    render.update()
  }, 1000 / FPS)
}

