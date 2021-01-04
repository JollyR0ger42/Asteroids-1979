// starting data
const FPS = 30; // frame per sec
const canvas = document.getElementById('gameWorld'); // canvas context

// game modules
import initLoop from './mainLoop.js';
import createWorld from './world/world.js';
import createRender from './render/render.js';
import createInput from './input.js'


// init
const gameWorld = createWorld(canvas.width, canvas.height);
const gameRender = createRender(canvas, gameWorld.objects);

initLoop(gameWorld, gameRender, FPS)
createInput(gameWorld.objects[0], FPS)