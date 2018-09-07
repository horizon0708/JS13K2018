var loop = require("./loop");
import CommuteGame from "./commuteGame";
import Renderer from "./renderer";
import State from "./state";

const canvas = document.createElement("canvas");
canvas.width = 128;
canvas.height = 128 + 16;
canvas.style.backgroundColor = "#000";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let gameObjects = [];
const gameState = new State();
const commuteGame = new CommuteGame(gameObjects, gameState, key);
const renderer = new Renderer(ctx, gameObjects, gameState);

commuteGame.start();

loop.start(function(dt) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  commuteGame.update(dt);
  renderer.render();
});
