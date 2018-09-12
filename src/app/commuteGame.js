import { checkCollision } from "./collision";
import random from "./rand";
import { car, heroCar } from "./entities";
import GameObject from "./gameObject";
import { bindUp, bindDown } from "./input";
import BaseGame from "./baseGame";

export default class CommuteGame extends BaseGame {
  constructor(gameObjects, gameState) {
    super(gameObjects, gameState);

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
    const { heroX, ySpawn } = this;
    this.state = 1;
    this.spawn(heroCar, heroX, ySpawn[1]);
    this.setSpawnInteval(() => this.spawnCar());
    bindUp(() => this.goUp());
    bindDown(() => this.goDown());
  }

  update(dt) {
    const { state, world, gameObjects, gameState } = this;
    if (gameState.ended) {
      this.end();
    } else if (state === 1 && gameState.activeWorld.includes(world)) {
      if (this.spawnRef === null) {
        this.setSpawnInteval(() => this.spawnCar());
      }
      this.moveEnemies(dt, -1, 0);
      let collisionInfo = checkCollision(gameObjects, world);
      if (collisionInfo) {
        // take out one heart
        this.gameState.health--;
        this.destroy(collisionInfo[1]);
      }
    } else {
      if (this.spawnRef) {
        clearInterval(this.spawnRef);
        this.gameObjects.forEach((o, i) => {
          if (o.world === world && o.team === 1) {
            this.gameObjects.splice(i, 1);
          }
        });
        this.spawnRef = null;
      }
    }

    this.destroyOutOfBound();
  }

  goUp() {
    const { ySpawn, yInterval, state, gameState, world } = this;
    if (state === 1 && gameState.activeWorld.includes(world)) {
      const hero = this.getHero();
      if (hero && hero.y > ySpawn[0]) {
        hero.y -= yInterval;
      }
    }
  }

  goDown() {
    const { ySpawn, yInterval, state, gameState,world } = this;
    if (state === 1 && gameState.activeWorld.includes(world)) {
      const hero = this.getHero();
      if (hero && hero.y < ySpawn[2]) {
        hero.y += yInterval;
      }
    }
  }

  spawnCar() {
    const { ySpawn, xSpawn, gameState } = this;
    // console.log(this.gameObjects);
    const posInt = random.int(3);
    if (gameState.level - gameState.baseLevel > 0) {
      var newPos = [...ySpawn];
      newPos.splice(posInt, 1);
      this.spawn(car, xSpawn, newPos[0]);
      this.spawn(car, xSpawn, newPos[1]);
    } else {
      this.spawn(car, xSpawn, ySpawn[posInt]);
    }
  }
}
