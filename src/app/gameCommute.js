import { checkCollision } from "./collision";
import random from "./rand";
import { car } from "./entities";
import GameObject from "./gameObject";

export default class GameCommute {
  constructor(gameObjects) {
    this.gameObjects = gameObjects;
  }
  level = 0;
  speedInterval = 2;
  baseSpeed = 1;

  baseSpawn = 5000;
  spawnInterval = 500;
  spawnFloor = 500;
  ySpawn = [15, 30, 45];
  xSpawn = 80;

  world = 0;
  spawn;
  state = 0;

  start() {
    this.spawnObjects();
  }

  update(dt) {
    if (state === 1) {
      this.moveEnemies();

      if (checkCollision(this.gameObjects, this.world)) {
        // take out one heart
      }
    }
  }

  end() {
    clearInterval(this.spawn);
  }

  spawnObjects() {
    //spawn enemies
    this.spawn = setInterval(() => {
      var posInt = random.int(3);
      var newObject = new GameObject(car, this.xSpawn, this.ySpawn[posInt]);
      this.gameObjects.push(newObject);
    }, this.getSpawnTime());
  }

  moveEnemies() {
    this.gameObjects.forEach(o => {
      if (o.world === this.world) {
        o.y -= this.getSpeed * dt;
      }
    });
  }

  getSpawnTime() {
    var speed = this.baseSpawn - this.spawnInterval * level;
    if (speed > this.spawnFloor) {
      return speed;
    }
    return this.spawnFloor;
  }

  getSpeed() {
    return this.baseSpeed + this.speedInterval * level;
  }
}
