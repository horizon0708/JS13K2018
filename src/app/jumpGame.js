import BaseGame from "./baseGame";
import { hero, obstacleEmail, obstacleMemo, obstaclePerson } from "./entities";
import random from "./rand";
import { checkCollision } from "./collision";
import { bindUp } from "./input";

export default class extends BaseGame {
  constructor(gameObjects, gameState) {
    super(gameObjects, gameState);
    this.world = 1;
    this.level = 5;

    this.xSpawn = gameState.gameWidth + 10;
    this.ySpawn = 45 + gameState.UIHeight;
    this.heroX = 8 + gameState.gameWidth / 2;

    this.isJumping = false;
    this.jumpFrames = 16;
    this.jumpFrameCount = 0;
    this.dropFrameCount = 0;
    this.jumpForce = 120;
    this.gravity = 50;
    this.isGrounded = true;
    this.jumpCount = 0;

    this.spawnFloor = 700;
  }

  start() {
    const { heroX, ySpawn } = this;
    this.state = 1;
    this.spawn(hero, heroX, ySpawn);
    this.setSpawnInteval(() => this.spawnObstacles());
    bindUp(() => this.jump());
  }

  update(dt) {
    const { state, world, gameObjects, gameState } = this;
    if( gameState.ended ){
      this.end();
    } else if (state === 1 && gameState.activeWorld.includes(world)) {
      if (this.spawnRef === null) {
        this.setSpawnInteval(() => this.spawnObstacles());
      }
      this.moveEnemies(dt, -1, 0);
      this.updateHero(dt);
      let collisionInfo = checkCollision(gameObjects, world);
      if (collisionInfo) {
        // take out one heart
        this.gameState.health--;
        this.destroy(collisionInfo[1]);
      }
    } else {
      this.isJumping = false;
      this.jumpFrameCount = 0;
      this.dropFrameCount = 0;
      this.jumpCount = 0;
      if (this.spawnRef) {
        clearInterval(this.spawnRef);
        this.gameObjects.forEach((o,i) => {
          if(o.world === world && o.team === 1){
            this.gameObjects.splice(i, 1);
          }
        })
        this.spawnRef = null;
      }
    }
    
    this.destroyOutOfBound();
  }

  jump() {
    if (this.jumpCount < 2) {
      this.isJumping = true;
      this.jumpFrameCount = 0;
      this.dropFrameCount = 0;
      this.jumpCount++;
    }
  }

  updateHero(dt) {
    let hero = this.getHero();

    if (hero) {
      if (this.isJumping && this.jumpFrameCount < this.jumpFrames) {
        hero.y -= (this.jumpForce - this.jumpFrameCount * 3) * dt;
        this.jumpFrameCount++;
      } else if (!this.heroIsGrounded()) {
        hero.y += (this.gravity + this.dropFrameCount * 3) * dt;
        this.dropFrameCount++;
      }

      if (this.isJumping && this.heroIsGrounded()) {
        this.isJumping = false;
        this.jumpFrameCount = 0;
        this.dropFrameCount = 0;
        this.jumpCount = 0;
      }
      if (!this.isJumping) {
        if (hero.y > this.ySpawn) {
          hero.y = this.ySpawn;
        }
      }
    }
  }

  heroIsGrounded() {
    let hero = this.getHero();
    if (hero) {
      return hero.y > this.ySpawn;
    }
  }

  spawnObstacles() {
    const { xSpawn, ySpawn } = this;
    // console.log(this.gameObjects);
    let randomInt = random.int(3);
    if (randomInt === 0) {
      this.spawn(obstacleEmail, xSpawn, ySpawn);
    }
    if (randomInt === 1) {
      this.spawn(obstacleMemo, xSpawn, ySpawn);
    }
    if (randomInt === 2) {
      this.spawn(obstaclePerson, xSpawn, ySpawn);
    }
  }
}
