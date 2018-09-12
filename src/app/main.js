import loop from "./loop";
import CommuteGame from "./commuteGame";
import JumpGame from "./jumpGame";
import TodoGame from "./todoGame";
import Renderer from "./renderer";
import SnsGame from "./snsGame";
import State from "./state";
import GameObject from "./gameObject";
import { battery } from "./entities";
import { bindAny } from "./input";

const canvas = document.createElement("canvas");
canvas.width = 128;
canvas.height = 128 + 16;
canvas.style.backgroundColor = "#000";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let gameObjects = [new GameObject(battery, 102, -1)];
const gameState = new State();
const commuteGame = new CommuteGame(gameObjects, gameState);
const jumpGame = new JumpGame(gameObjects, gameState);
const todoGame = new TodoGame(gameObjects, gameState);
const snsGame = new SnsGame(gameObjects, gameState);
const renderer = new Renderer(ctx, gameObjects, gameState, canvas);

bindAny(() => resetAll());

gameState.initialise();
commuteGame.start();
jumpGame.start();
todoGame.start();
snsGame.start();

loop(function(dt) {
  commuteGame.update(dt);
  jumpGame.update(dt);
  todoGame.update(dt);
  snsGame.update(dt);
  gameState.update();
  renderer.render();
});

function resetAll() {
  if (renderer.showEnding) {
    gameObjects = [new GameObject(battery, 102, -1)];

    gameState.initialise();
    // commuteGame.start();
    // jumpGame.start();
    // todoGame.start();
    // snsGame.start();
    renderer.reset();
  }
}
