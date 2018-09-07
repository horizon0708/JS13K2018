export default class {
  constructor(ctx, gameObjects, gameState) {
    this.ctx = ctx;
    this.gameObjects = gameObjects;
    this.gameState = gameState;

    this.UIHeight = 16;
    this.gameHeight = 128;
    this.gameWidth = 128;

    // 1 | 2
    // - - -
    // 3 | 4
    const { UIHeight, gameHeight, gameWidth } = this;
    this.worldRect = [
      [0, UIHeight, gameWidth / 2, gameHeight / 2],
      [gameWidth / 2, UIHeight, gameWidth / 2, gameHeight / 2],
      [0, UIHeight + gameHeight / 2, gameWidth / 2, gameHeight / 2],
      [gameWidth / 2, UIHeight, gameWidth / 2, gameHeight / 2]
    ];
  }

  render() {
    let { gameState, gameObjects } = this;
      if (gameState.activeWorld !== -1) {
        this.renderWorld(gameObjects, 0, gameState.activeWorld);
        // this.renderWorld(o, 1, gameState.activeWorld);
        // this.renderWorld(o, 2, gameState.activeWorld);
        // this.renderWorld(o, 3, gameState.activeWorld);
      }
      if (gameState.activeWorld === -1) {
        this.renderStartScreen();
      }
      if (gameState.activeWorld === -2) {
        // render all worlds, so we can fade out or do stuff
        this.renderWorld(gameObjects, 0, 0);
        this.renderWorld(o, 1, 1);
        this.renderWorld(o, 2, 2);
        this.renderWorld(o, 3, 3);
        this.renderEnding();
      }
  }

  renderUI() {
    const { health, level, gameTimer,  }
  }

  renderWorld(gameObjects, worldNumber, activeWorld) {
    let { ctx, worldRect } = this;
    ctx.globalCompositeOperation = "source-over";
    // this.ctx.fillStyle = "#FF0000";
    ctx.fillStyle = "#304566";
    ctx.fillRect(...worldRect[worldNumber]);
    ctx.globalCompositeOperation = "source-atop";
    gameObjects.filter(o => o.world === worldNumber && o.loaded).forEach(o => {
      ctx.drawImage(o.image, o.x, o.y);
    });
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = activeWorld === worldNumber ? 0 : 0.5;

    // for some reason using rgba values for fillstyle does not work.
    ctx.fillStyle = "#304566";
    ctx.fillRect(...worldRect[worldNumber]);
    ctx.globalAlpha = 1;
  }

  renderStartScreen() {
    // TODO: start screen
  }

  renderEnding() {
    // TODO: fade out and render ending

  }
}
