import { checkCollision } from "./collision";
import random from "./rand";
import { car, heroCar } from "./entities";
import GameObject from "./gameObject";
import { bindUp, bindDown } from "./input";
import BaseGame from './baseGame';

export default class CommuteGame extends BaseGame{
  constructor(gameObjects, gameState, input) {
    super(gameObjects, gameState, input);
    this.level = 5;
    this.speedInterval = 10;
    this.baseSpeed = 10;

    this.baseSpawn = this.baseSpeed * 400;
    this.spawnInterval = this.getSpeed() * 10;
    this.spawnFloor = 600;
    this.yInterval = 15;
    this.ySpawn = [1, 2, 3]
      .map(x => x * this.yInterval)
      .map(x => x + gameState.UIHeight);
    this.xSpawn = 70;

    this.heroX = 8;

    this.world = 0;
  }

  start() {
    this.state = 1;
    this.spawnHero();
    this.spawnObjects();
    bindUp(()=>this.goUp());
    bindDown(()=>this.goDown());
  }

  update(dt) {
    const { state, world, gameObjects } = this;
    if (state === 1) {
      this.moveEnemies(dt);
      let collisionInfo = checkCollision(gameObjects, world);
      if (collisionInfo) {
        // take out one heart

        this.destroy(collisionInfo[1]);
      }
    }
    this.destroyOutOfBound();
  }

  end() {
    clearInterval(this.spawn);
  }

  goUp() {
    const { gameObjects, world, ySpawn, yInterval } = this;
    const heroIndex = gameObjects.findIndex(
      o => o.world === world && o.team === 0
    );
    if (heroIndex > -1 && gameObjects[heroIndex].y > ySpawn[0]) {
      gameObjects[heroIndex].y -= yInterval;
    }
  }

  goDown() {
    const { gameObjects, world, ySpawn, yInterval } = this;
    const heroIndex = gameObjects.findIndex(
      o => o.world === world && o.team === 0
    );
    if (heroIndex > -1 && gameObjects[heroIndex].y < ySpawn[2]) {
      gameObjects[heroIndex].y += yInterval;
    }
  }

  spawnHero() {
    const { heroX, ySpawn, gameObjects } = this;
    const hero = new GameObject(heroCar, heroX, ySpawn[1]);
    gameObjects.push(hero);
  }

  spawnObjects() {
    //spawn enemies
    this.spawnCar();
    this.spawn = setInterval(() => {
      this.spawnCar();
    }, this.getSpawnTime());
  }

  spawnCar() {
    console.log(this.gameObjects);
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
      if (o.world === this.world && o.team === 1) {
        o.x -= this.getSpeed() * dt;
      }
    });
  }

  getSpawnTime() {
    var speed = this.baseSpawn - this.spawnInterval * this.level;
    // var speed = this.baseSpawn -  this.getSpeed() * this.level * 10;
    if (speed < this.spawnFloor) {
      return this.spawnFloor;
    }
    // return Math.abs(speed);
    return speed;
  }

  getSpeed() {
    return this.baseSpeed + this.speedInterval * this.level;
  }
}
