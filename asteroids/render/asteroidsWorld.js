export default function createWorldRender(canvas, WORLD){
  const objects = WORLD.objects;
  const ctx = canvas.getContext('2d');

  function update(){
    // draw space
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // draw WORLD
    objects.forEach(el => {
      const shape = el.getShape();
      ctx.strokeStyle = shape.color || 'white'
      ctx.lineWidth = Math.max(shape.lineWidth, 1.5)
      ctx.beginPath()
      ctx.moveTo(...shape.points[0])
      for(let point of shape.points.slice(1)){
        ctx.lineTo(...point)
      }
      ctx.closePath()
      ctx.stroke()
    })
  }

  return {update}
}