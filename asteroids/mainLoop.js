const SECOND = 1000; // in ms

export default function initLoop(world, render, FPS){
  setInterval(() => {
    world.update()
    render.update()
  }, SECOND / FPS)
}

