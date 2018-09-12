import BaseGame from "./baseGame";
import { todo, hitBoxGameFour, arrowRight } from "./entities";
import { checkCollision } from "./collision";
import { bindRight } from "./input";
import random from "./rand";

export default class extends BaseGame {
  constructor(gameObjects, gameState) {
    super(gameObjects, gameState);
    this.world = 3;
    this.level = 5;

    this.xSpawn = gameState.gameWidth / 2 + 6;
    this.ySpawn = 10 + gameState.UIHeight + gameState.gameHeight;
    this.heroX = 8 + gameState.gameWidth / 2;

    this.isReady = true;
    this.cooldown = 300;
    this.lastInput;
    this.hitbox;

    this.spawnFloor = 327;
    this.spawnVariance = 450;
    this.speedVariance = 0;
  }

  start() {
    const { heroX, ySpawn } = this;
    this.state = 1;
    // this.spawn(hero, heroX, ySpawn);
    // this.spawnTodos();
    let _arrow = this.spawn(
      arrowRight,
      this.gameState.gameWidth / 2,
      this.ySpawn - 50
    );
    _arrow.team = 3;
    _arrow.world = this.world;
    this.hitbox = this.spawn(
      hitBoxGameFour,
      this.gameState.gameWidth / 2,
      this.ySpawn - 50
    );
    this.hitbox.team = 0;
    this.hitbox.invincible = true;
    this.setSpawnInteval(() => this.spawnTodos());
    bindRight(() => this.input());
  }

  update(dt) {
    const { state, world, gameObjects, gameState } = this;
    if (gameState.ended) {
      this.end();
    } else if (state === 1 && gameState.activeWorld.includes(world)) {
      if (this.spawnRef === null) {
        this.setSpawnInteval(() => this.spawnTodos());
      }
      this.moveEnemies(dt, 0, -1);
      let collisionInfo = checkCollision(gameObjects, world);
      this.destroy();
      if (collisionInfo) {
        // take out one hearto
        let _todo = this.find(collisionInfo[1]);
        if (_todo) {
          _todo.destroyed = true;
        }
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

  input() {
    if (this.isReady) {
      this.isReady = false;
      this.hitbox.invincible = false;
      setTimeout(() => {
        this.isReady = true;
      }, this.cooldown);
      setTimeout(() => {
        this.hitbox.invincible = true;
      }, 200);
    }
  }

  spawnTodos() {
    const { xSpawn, ySpawn } = this;
    let _todo = this.spawn(todo, xSpawn, ySpawn);
    const wordLimit = random.range(3, 8);
    for (let i = 0; i < wordLimit; i++) {
      if (i % 2 === 0) {
        _todo.words.push(random.range(1, 4));
      } else {
        _todo.words.push(random.range(4, 8));
      }
    }
  }

  destroyOutOfBound() {
    const { gameObjects, gameState, world } = this;
    const padding = 100;

    // console.log(gameObjects);
    gameObjects.forEach((o, i) => {
      if (o.world === world) {
        if (
          o.x < -padding ||
          o.x > gameState.gameWidth + padding ||
          o.y < gameState.UIHeight + (gameState.gameHeight/2) ||
          o.y > gameState.gameWidth + gameState.UIHeight + padding
        ) {
          if (!o.destroyed) { 
            console.log('ah');
            gameState.health--;
          }
          gameObjects.splice(i, 1);
        }
      }
    });
  }
}
