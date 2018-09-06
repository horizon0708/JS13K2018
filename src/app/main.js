var loop = require('./loop');
var rand = require('./rand');
var key = require('./key');
import { hero } from './entities';
import GameObject from './gameObject';
// var testImage = require('./sprite/h_c.png');
var testImage = 'assets/h_c.png';

var canvas = document.createElement('canvas');
canvas.width = 128;
canvas.height = 128;
canvas.style.backgroundColor = '#000';
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');
var gameObjects = [new GameObject(hero)];


var test = new Image();
test.src = testImage;
// demo entity
var mob = {
  x: rand.int(canvas.width),
  y: rand.int(canvas.height),
  width: 25,
  height: 25,
  speed: 150,
  color: 'rgba(236, 94, 103, 1)'
};

// game loop
var img = document.createElement('img');
img.src = './assets/h_c.png';
document.body.appendChild(img);

test.onload = function() {
ctx.drawImage(test, 20, 20); 

  startLoop();
}

function startLoop() {
  loop.start(function (dt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // update mob
    if (key.isDown(key.LEFT)) {
      mob.x = mob.x - (mob.speed * dt);
    }
    if (key.isDown(key.RIGHT)) {
      mob.x = mob.x + (mob.speed * dt);
    }
    if (key.isDown(key.UP)) {
      mob.y = mob.y - (mob.speed * dt);
    }
    if (key.isDown(key.DOWN)) {
      mob.y = mob.y + (mob.speed * dt);
    }
  
    // check bounds collisions
    if (mob.x < 0) {
      mob.x = canvas.width;
    } else if (mob.x > canvas.width) {
      mob.x = 0;
    }
    if (mob.y < 0) {
      mob.y = canvas.height;
    } else if (mob.y > canvas.height) {
      mob.y = 0;
    }
  // draw mob
  
    // render all objects
    gameObjects.forEach(o => {
      if(o.loaded){
        ctx.drawImage(o.image, o.x, o.y);
      }
    });
  
    // console.log('game update fn %s', dt);
  });
}
