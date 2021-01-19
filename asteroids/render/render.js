import createWorldRender from './asteroidsWorld.js';
import createUiRender from './asteroidsUI.js';

export default function createRender(canvas, WORLD, FPS){
  const worldRender = createWorldRender(canvas, WORLD);
  const UiRender = createUiRender(canvas, WORLD, FPS);

  function update(){
    worldRender.update()
    UiRender.update()
  }

  function drawSplashScreen(){
    UiRender.splashAlpha = 1
    UiRender.showDeathScreen = false
  }

  function drawDeathScreen(){
    UiRender.showDeathScreen = true
  }

  return {update, drawSplashScreen, drawDeathScreen}
}