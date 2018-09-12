import random from "./rand";
import {
  person,
  hand,
  light,
  bubble,
  like,
  rt,
  msg,
  arrowLeft,
  arrowRight,
  arrowUp,
  hitBox
} from "./entities";
import BaseGame from "./baseGame";
import { checkCollision } from "./collision";
import { bindUp, bindLeft, bindRight } from "./input";

export default class extends BaseGame {
  constructor(gameObjects, gameState) {
    super(gameObjects, gameState);
    this.world = 2;
    this.level = 5;

    this.xSpawn = gameState.gameWidth / 2 + 6;
    this.ySpawn = 6 + gameState.UIHeight + gameState.gameHeight / 2;

    this.personY = gameState.UIHeight + gameState.gameHeight - 29;
    this.personX = -1;
    this.state = 1;
    this.handX = 9;
    this.handY = gameState.UIHeight + gameState.gameHeight - 16;
    this.handMoveTime = random.range(600, 1500);
    this.handRef;
    this.lightRef;

    this.isReady = true;
    this.spawnFloor = 870;
    this.cooldown = 300;
    this.lastInput;
    this.hitbox;
  }

  start() {
    this.spawn(person, -1, this.personY);
    this.hitbox = this.spawn(hitBox, 10, this.ySpawn - 1);
    this.hitbox.invincible = true;
    let _light = this.spawn(light, 0, 22);
    let _hand = this.spawn(hand, this.handX, this.handY);
    this.moveHand(_hand);
    this.changeLightIntensity(_light);
    this.setSpawnInteval(() => this.spawnNotes());
    bindUp(() => this.input("UP"));
    bindLeft(() => this.input("LEFT"));
    bindRight(() => this.input("RIGHT"));
  }

  update(dt) {
    const { state, world, gameObjects, lastInput, gameState } = this;
    if (gameState.ended) {
      this.end();
    } else if (state === 1 && gameState.activeWorld.includes(world)) {
      if (this.spawnRef === null) {
        this.setSpawnInteval(() => this.spawnNotes());
      }
      this.moveEnemies(dt, -1, 0);

      let collisionInfo = checkCollision(gameObjects, world, lastInput);
      if (collisionInfo) {
        // take out one heart
        this.spawnEmote(lastInput);
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

  input(inp) {
    if (this.gameState.activeWorld.includes(this.world)) {
      if (this.isReady) {
        this.lastInput = inp;
        this.isReady = false;
        this.hitbox.invincible = false;
        setTimeout(() => {
          this.isReady = true;
          this.lastInput = null;
        }, this.cooldown);
        setTimeout(() => {
          this.hitbox.invincible = true;
        }, 200);
      }
    }
  }

  spawnEmote(inp) {
    const _bubbleCoord = [28, this.ySpawn + 19];
    let _bubble = this.spawn(bubble, _bubbleCoord[0], _bubbleCoord[1]);
    let _emote;
    if (inp === "LEFT") {
      _emote = this.spawn(rt, _bubbleCoord[0] + 4, _bubbleCoord[1] + 3);
    }
    if (inp === "UP") {
      _emote = this.spawn(like, _bubbleCoord[0] + 4, _bubbleCoord[1] + 3);
    }
    if (inp === "RIGHT") {
      _emote = this.spawn(msg, _bubbleCoord[0] + 4, _bubbleCoord[1] + 3);
    }
    setTimeout(() => {
      this.destroy(_bubble.id);
      this.destroy(_emote.id);
    }, 500);
  }

  moveHand(hand) {
    this.handRef = setInterval(() => {
      hand.y = this.handY + random.range(-1, 2);
      // console.log(this.gameObjects.filter(x=>x.world===2));
    }, 1000);
  }

  spawnNotes() {
    const { xSpawn, ySpawn } = this;
    let randomInt = random.int(3);
    if (randomInt === 0) {
      this.spawn(arrowLeft, xSpawn, ySpawn);
    }
    if (randomInt === 1) {
      this.spawn(arrowUp, xSpawn, ySpawn);
    }
    if (randomInt === 2) {
      this.spawn(arrowRight, xSpawn, ySpawn);
    }
  }

  changeLightIntensity(light) {
    this.handRef = setInterval(() => {
      light.y = random.range(22, 45);
    }, 2000);
  }

  destroyOutOfBound() {
    const { gameObjects, gameState, world } = this;
    const padding = 10;

    // console.log(gameObjects);
    gameObjects.forEach((o, i) => {
      if (o.world === world) {
        if (
          o.x < -padding ||
          o.x > gameState.gameWidth + padding ||
          o.y < -padding ||
          o.y > gameState.gameWidth + gameState.UIHeight + padding
        ) {
          gameState.health--;
          gameObjects.splice(i, 1);
        }
      }
    });
  }
}
