var loop = require("./loop");
var rand = require("./rand");
var key = require("./key");
import { hero } from "./entities";
import GameObject from "./gameObject";
import CommuteGame from "./commuteGame";
import Renderer from "./renderer";

var canvas = document.createElement("canvas");
canvas.width = 128;
canvas.height = 128 + 16;
canvas.style.backgroundColor = "#000";
document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");

let gameObjects = [new GameObject(hero)];
let gameState = {
  UIHeight: 16,
  gameWidth: 128,
  gameHeight: 128,

  // -1 for non, 4 for all ?
  activeWorld: 0
};
const commuteGame = new CommuteGame(gameObjects, gameState);
const renderer = new Renderer(ctx, gameObjects, gameState);

commuteGame.start();

startLoop();
function startLoop() {
  loop.start(function(dt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    commuteGame.update(dt);
    // update mob
    // if (key.isDown(key.LEFT)) {
    //   mob.x = mob.x - mob.speed * dt;
    // }
    // if (key.isDown(key.RIGHT)) {
    //   mob.x = mob.x + mob.speed * dt;
    // }
    // if (key.isDown(key.UP)) {
    //   mob.y = mob.y - mob.speed * dt;
    // }
    // if (key.isDown(key.DOWN)) {
    //   mob.y = mob.y + mob.speed * dt;
    // }

    // // check bounds collisions
    // if (mob.x < 0) {
    //   mob.x = canvas.width;
    // } else if (mob.x > canvas.width) {
    //   mob.x = 0;
    // }
    // if (mob.y < 0) {
    //   mob.y = canvas.height;
    // } else if (mob.y > canvas.height) {
    //   mob.y = 0;
    // }
    // draw mob

    renderer.render();

    // render all objects
    // gameObjects.forEach(o => {
    //   if(o.loaded){
    //     ctx.globalCompositeOperation="source-over";
    //     ctx.fillStyle ="#FF0000";
    //     ctx.fillRect(0,0,64,64);
    //     ctx.globalCompositeOperation="source-atop";
    //     ctx.drawImage(o.image, o.x, o.y);
    //     ctx.globalCompositeOperation="source-over";
    //     ctx.globalAlpha = 0.5;

    //     // for some reason using rgba values for fillstyle does not work.
    //     ctx.fillStyle= "#304566";
    //     ctx.fillRect(0,0,64,64);
    //     ctx.globalAlpha = 1;
    //   }
    // });

    // console.log('game update fn %s', dt);
  });
}
