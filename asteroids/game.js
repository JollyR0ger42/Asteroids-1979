// starting data
const FPS = 60; // frame per sec
const canvas = document.getElementById('gameWorld'); // canvas context

// game modules
import initLoop from './mainLoop.js';
import createWorld from './world/world.js';
import createRender from './render/render.js';
import createInput from './input/input.js'


// init
const gameWorld = createWorld(canvas.width, canvas.height, FPS);
const gameRender = createRender(canvas, gameWorld, FPS);
const inputPublisher = createInput();
inputPublisher.subscribe(gameWorld.controllers[0])

initLoop(gameWorld, gameRender, FPS)

// Events
gameWorld.emmit = listener

// 
function listener(eventName, payload){
  switch(eventName){
    case 'newLevel':
      gameRender.drawSplashScreen()
      break;
    case 'gameover':
      gameRender.drawDeathScreen()
      break;
  }
}