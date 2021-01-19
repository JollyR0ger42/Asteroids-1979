export default function createUiRender(canvas, world, FPS){
  const FADING_TIME = 3; // sec to splash screen fade
  const ctx = canvas.getContext('2d');

  const render = {
    splashAlpha: 1,
    showDeathScreen: false,
    // methods
    update,
    drawDeathScreen,
  }

  function drawDeathScreen(){
    ctx.textAlign = 'center'
    ctx.textBaseLine = 'middle'
    ctx.fillStyle = 'red'
    ctx.font = '50px sans'
    ctx.fillText(`YOU DIED`, canvas.width / 2, canvas.height / 2)
    ctx.font = '20px sans'
    ctx.fillText(`Press Enter to try again`, canvas.width / 2, canvas.height / 2 + 40)
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
    if(render.showDeathScreen) drawDeathScreen();
    drawScore()
  }
  
  return render
}