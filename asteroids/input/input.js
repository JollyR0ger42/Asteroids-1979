import {shipControll} from './shipControll.js';

export default function createInput(){
  document.addEventListener('keydown', keyDown)
  document.addEventListener('keyup', keyUp)
  let subscribers = [];

  // subscriber = controller, for now at least
  function subscribe(subscriber){
    subscribers.push(subscriber)
  }

  function unsubscribe(subscriber){
    subscribers = subscribers.filter(sub => sub !== subscriber)
  }

  function notifySubscribers(action){
    subscribers.forEach(subscriber => subscriber.dispatch(action))
  }

  function keyDown(ev){
    if(ev.key in shipControll){
      notifySubscribers(shipControll[ev.key] + '_on')
    }
  }

  function keyUp(ev){
    if(ev.key in shipControll){
      notifySubscribers(shipControll[ev.key] + '_off')
    }
  }

  return {
    subscribe,
    unsubscribe,
  }
}