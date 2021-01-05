import {inputCfg} from './inputCfg.js';

export default function createInput(playerController){
  document.addEventListener('keydown', keyDown)
  document.addEventListener('keyup', keyUp)

  function keyDown(ev){
    if(ev.key in inputCfg){
      playerController.dispatch(inputCfg[ev.key] + '_on')
    }
  }

  function keyUp(ev){
    if(ev.key in inputCfg){
      playerController.dispatch(inputCfg[ev.key] + '_off')
    }
  }
}