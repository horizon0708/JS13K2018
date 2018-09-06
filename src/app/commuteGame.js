import { checkCollision } from "./collision";
import random from "./rand";
import { car } from "./entities";
import GameObject from "./gameObject";

export default class CommuteGame {
  constructor(gameObjects, gameState) {
    this.gameObjects = gameObjects;
    this.gameState = gameState;
    this.level = 1;
    this.speedInterval = 10;
    this.baseSpeed = 10;

    this.baseSpawn = this.baseSpeed * 400;
    this.spawnInterval = this.getSpeed() * 10;
    this.spawnFloor = 600;
    this.ySpawn = [15, 30, 45];
    this.xSpawn = 70;

    this.world = 0;
    this.spawn;
    this.state = 1;
  }

  start() {
    this.spawnObjects();
  }

  update(dt) {
    if (this.state === 1) {
      this.moveEnemies(dt);
      if (checkCollision(this.gameObjects, this.world)) {
        // take out one heart
        console.log("hitting!");
      }
    }
  }

  end() {
    clearInterval(this.spawn);
  }

  spawnObjects() {
    //spawn enemies
    this.spawnCar();
    this.spawn = setInterval(() => {
      this.spawnCar();
    }, this.getSpawnTime());
  }

  spawnCar() {
    if (this.level > 1) {
      var posInt = random.int(3);
      var newPos = [...this.ySpawn];
      newPos.splice(posInt, 1);
      var newObject = new GameObject(car, this.xSpawn, newPos[0]);
      var secondCar = new GameObject(car, this.xSpawn, newPos[1]);
      this.gameObjects.push(newObject);
      this.gameObjects.push(secondCar);
    } else {
      var posInt = random.int(3);
      var newObject = new GameObject(car, this.xSpawn, this.ySpawn[posInt]);
      this.gameObjects.push(newObject);
    }
  }

  moveEnemies(dt) {
    this.gameObjects.forEach(o => {
      if (o.world === this.world) {
        o.x -= this.getSpeed() * dt;
      }
    });
  }

  getSpawnTime() {
    var speed = this.baseSpawn - (this.spawnInterval * this.level);
    // var speed = this.baseSpawn -  this.getSpeed() * this.level * 10;
    if (speed < this.spawnFloor) {
      return this.spawnFloor;
    }
    // return Math.abs(speed);
    return speed;
  }

  getSpeed() {
    return this.baseSpeed + (this.speedInterval * this.level);
  }
}
