export default function createRender(canvas, WORLD){
  function update(){
    const ctx = this.canvas.getContext('2d')
    
    // draw space
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // draw WORLD
    ctx.strokeStyle = 'white'
    WORLD.forEach(el => {
      const shape = el.getShape();
      ctx.lineWidth = shape.lineWidth
      ctx.beginPath()
      ctx.moveTo(...shape.points[0])
      for(let point of shape.points.slice(1)){
        ctx.lineTo(...point)
      }
      ctx.closePath()
      ctx.stroke()
    })
  }

  return {canvas, WORLD, update}
}