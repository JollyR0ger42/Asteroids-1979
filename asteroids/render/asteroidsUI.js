export default function createUiRender(canvas, world, FPS){
  const FADING_TIME = 3; // sec to splash screen fade
  const ctx = canvas.getContext('2d');

  const render = {
    splashAlpha: 1,
    // methods
    update
  }

  function drawSplashScreen(){
    ctx.textAlign = 'center'
    ctx.textBaseLine = 'middle'
    ctx.fillStyle = `rgba(255,255,255,${render.splashAlpha})`
    ctx.font = '50px sans'
    ctx.fillText(`Level ${world.level}`, canvas.width / 2, canvas.height * 0.75)
    render.splashAlpha -= 1 / FADING_TIME / FPS
  }

  function drawScore(){
    ctx.textAlign = 'left'
    ctx.fillStyle = 'white'
    ctx.font = '25px sans'
    ctx.fillText(`Score: ${world.score}`, 15, 35)
    render.splashAlpha -= 1 / FADING_TIME / FPS
  }

  function update(){
    if(render.splashAlpha >= 0) drawSplashScreen();
    drawScore()
  }
  
  return render
}