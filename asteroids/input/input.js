import {shipControll} from './shipControll.js';

export default function createInput(playerController){
  document.addEventListener('keydown', keyDown)
  document.addEventListener('keyup', keyUp)

  function keyDown(ev){
    if(ev.key in shipControll){
      playerController.dispatch(shipControll[ev.key] + '_on')
    }
  }

  function keyUp(ev){
    if(ev.key in shipControll){
      playerController.dispatch(shipControll[ev.key] + '_off')
    }
  }
}