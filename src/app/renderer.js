import random from "./rand";
import { timestamp } from "./loop";
import { battery, trueEnding, normalEnding, opening } from "./entities";
import GameObject from "./gameObject";
import c from './colors'

export default class {
  constructor(ctx, gameObjects, gameState, canvas) {
    this.opening = new GameObject(opening, 0, 0);
    this.normalEnding = new GameObject(normalEnding, 0, 0);
    this.trueEnding = new GameObject(trueEnding, 0, 0);
    this.ctx = ctx;
    this.canvas = canvas;
    this.gameObjects = gameObjects;
    this.gameState = gameState;

    this.UIHeight = 16;
    this.gameHeight = 128;
    this.gameWidth = 128;

    this.battery;
    this.showEnding = false;

    // 0 | 1
    // - - -
    // 2 | 3
    const { UIHeight, gameHeight, gameWidth } = this;
    this.worldRect = [
      [0, UIHeight, gameWidth / 2, gameHeight / 2],
      [gameWidth / 2, UIHeight, gameWidth / 2, gameHeight / 2],
      [0, UIHeight + gameHeight / 2, gameWidth / 2, gameHeight / 2],
      [gameWidth / 2, UIHeight + gameHeight / 2, gameWidth / 2, gameHeight / 2]
    ];
  }

  render() {
    let { gameState, gameObjects, ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameState.activeWorld.includes(-1) && !gameState.ended) {
      this.renderStartScreen();
    } else if (!gameState.ended) {
      ctx.fillStyle = "#323542";
      ctx.fillRect(0, gameState.UIHeight, canvas.width, canvas.height);

      this.renderWorld(gameObjects, 0, gameState.activeWorld);
      this.renderWorld(gameObjects, 1, gameState.activeWorld);
      this.renderWorld(gameObjects, 2, gameState.activeWorld);
      this.renderWorld(gameObjects, 3, gameState.activeWorld);
      this.renderUI(gameObjects);
    } else if (gameState.ended) {
      this.renderEnding();
    }
  }

  renderUI(gameObjects) {
    const { health, level, startTimestamp } = this.gameState;
    gameObjects.filter(o => o.world === 4).forEach(o => {
      if (o.loaded) {
        this.ctx.drawImage(o.image, o.x, o.y);
      }
      for (let i = 0; i <= health; i++) {
        this.ctx.fillStyle = health === 0 ? c.red : c.grey;
        let _width = 5;

        if (i === 0) {
          this.ctx.fillRect(o.x + 3, o.y + 3, _width - 4, 11);
        } else {
          this.ctx.fillRect(o.x - 1 + i * _width, o.y + 3, _width + 3, 11);
        }
      }
    });
    if (startTimestamp) {
      this.ctx.fillStyle = c.grey;
      this.ctx.font = "12px Arial";
      this.ctx.fillText(
        this.gameState.getProgress(startTimestamp) + "%",
        1,
        12
      );
    }
  }

  renderTodo(todo) {
    const { ctx } = this;
    ctx.fillStyle = c.grey;
    ctx.fillRect(todo.x, todo.y, todo.width, todo.height);

    // checkbox
    const xPadding = 3;
    const yPadding = 2;
    const cHeight = 4;
    const cWidth = 4;
    ctx.fillStyle = c.red;

    ctx.fillRect(todo.x + xPadding, todo.y + yPadding, cWidth, cHeight);
    ctx.fillStyle = c.grey;
    ctx.fillRect(
      todo.x + xPadding + 1,
      todo.y + yPadding + 1,
      cWidth - 2,
      cHeight - 2
    );

    // todo
    ctx.fillStyle = "#6a6a6b";
    const space = 2;
    const wordLimit = random.range(4, 6);
    if (todo.words.length === 0) {
      for (let i = 3; i < wordLimit + 3; i++) {
        if (i % 2 === 0) {
          todo.words.push(random.range(5, 7));
        } else {
          todo.words.push(random.range(8, 16));
        }
      }
      console.log(todo.words);
    }

    let offset = 0;
    todo.words.forEach(w => {
      ctx.fillRect(
        todo.x + xPadding * 3 + offset,
        todo.y + yPadding,
        w * 1.5,
        cHeight
      );
      offset += w + 2;
    });

    if (todo.destroyed) {
      ctx.fillStyle = c.red;
      ctx.fillRect(todo.x + 8, todo.y + 3, 40, 2);
    }
  }

  renderHitbox(hitbox) {
    const { ctx } = this;
    if (hitbox.invincible) {
      ctx.globalAlpha = 0.5;
    }
    // for some reason using rgba values for fillstyle does not work.
    ctx.fillStyle = "white";
    ctx.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    ctx.globalAlpha = 1;
  }

  renderWorld(gameObjects, worldNumber, activeWorld) {
    let { ctx, worldRect, canvas } = this;
    ctx.globalCompositeOperation = "source-over";

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "transparent";

    ctx.rect(...worldRect[worldNumber]);
    ctx.stroke();
    ctx.clip();

    gameObjects.filter(o => o.world === worldNumber).forEach(o => {
      if (o.world !== 3 && o.world !== 2 && o.loaded) {
        ctx.drawImage(o.image, o.x, o.y);
      }
      // hard coding here
      if (o.world === 3) {
        if (!o.loaded) {
          if (o.team === 1) {
            this.renderTodo(o);
          }
          if (o.team === 3) {
            this.renderHitbox(o);
          }
        } else {
          ctx.drawImage(o.image, o.x, o.y);
        }
      }

      if (o.world === 2) {
        if (o.order === 2) {
          ctx.drawImage(o.image, o.x, o.y);
        }
        if (o.order === 1 && !o.loaded) {
          this.renderLight(o);
        }
        if (o.order === 0) {
          if (o.loaded) {
            ctx.drawImage(o.image, o.x, o.y);
          } else {
            this.renderHitbox(o);
          }
        }
      }
    });

    ctx.restore();

    ctx.globalCompositeOperation = "source-over";
    if (activeWorld) {
      ctx.globalAlpha = this.gameState.activeWorld.includes(worldNumber)
        ? 0
        : 0.8;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(...worldRect[worldNumber]);
    ctx.globalAlpha = 1;
  }

  renderLight(light) {
    const { ctx, worldRect } = this;
    ctx.globalAlpha = 0.5;
    let gradient = ctx.createRadialGradient(
      13,
      140,
      light.y / 2,
      13,
      140,
      light.y
    );
    gradient.addColorStop(0, "#a7c3f2");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(...worldRect[2]);
    ctx.globalAlpha = 1;
  }

  renderStartScreen() {
    if (this.opening.loaded) {
      this.ctx.drawImage(this.opening.image, 0, 0);
    }
  }

  renderEnding() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      0,
      this.gameState.UIHeight,
      this.canvas.width,
      this.canvas.height
    );
    if (!this.battery) {
      this.battery = new GameObject(battery, 64, this.gameState.UIHeight + 64);
    }
    if (this.battery.loaded && !this.showEnding) {
      this.ctx.globalAlpha = 1 - this.gameState.getEndingProgress();
      this.ctx.drawImage(this.battery.image, 50, 64);
    }
    if (this.gameState.getEndingProgress() > 1) {
      this.showEnding = true;
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, 128, 144);
      this.ctx.globalAlpha = 0;
      if (!this.gameState.fadeInTimestamp) {
        this.gameState.fadeInTimestamp = timestamp();
      }
      if(this.gameState.ending === 0) {
        if(this.gameState.getFadeInProgress() < 1){
          this.ctx.globalAlpha = this.gameState.getFadeInProgress();
          } else{
          this.ctx.globalAlpha = 1
          }
          if(this.gameState.getTimeProgress(3500, this.gameState.endingShowTimestamp) > 1) {
            this.renderStartScreen();
          }
      }
      if (this.gameState.ending === 1) {
        this.renderEnd(this.normalEnding.image);
      }
      if (this.gameState.ending === 2) {
        this.renderEnd(this.trueEnding.image);
      }
    }
  }

  renderEnd(img){
    if(this.gameState.getFadeInProgress() < 1){
      this.ctx.globalAlpha = this.gameState.getFadeInProgress();
      } else{
      this.ctx.globalAlpha = 1
      }
      this.ctx.drawImage(img, 0, 0);
      if(this.gameState.getBeforeResetProgress() > 1) {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(
          0,
          0,
          this.canvas.width,
          this.canvas.height + 16
        );
        this.renderStartScreen();
      }
  }

  reset() {
    this.battery;
    this.showEnding = false;
  }
}
