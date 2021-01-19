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
const gameRender = createRender(canvas, gameWorld.objects);
const inputPublisher = createInput();
inputPublisher.subscribe(gameWorld.controllers[0])

initLoop(gameWorld, gameRender, FPS)