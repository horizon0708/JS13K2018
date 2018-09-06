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
    gameObjects.forEach(o => {
      if (gameState.activeWorld !== -1) {
        this.renderWorld(o, 0, gameState.activeWorld);
        // this.renderWorld(o, 1, gameState.activeWorld);
        // this.renderWorld(o, 2, gameState.activeWorld);
        // this.renderWorld(o, 3, gameState.activeWorld);
      }
    });
  }

  renderUI() {}

  renderWorld(gameObject, worldNumber, activeWorld) {
    let { ctx, worldRect } = this;
    if (gameObject.world === worldNumber && gameObject.loaded) {
      ctx.globalCompositeOperation = "source-over";
      this.ctx.fillStyle = "#FF0000";
        // ctx.fillRect(0,0,64,64);
      this.ctx.fillRect(...worldRect[worldNumber]);
      ctx.globalCompositeOperation = "source-atop";
      ctx.drawImage(gameObject.image, gameObject.x, gameObject.y);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = activeWorld === worldNumber ? 0 : 0.5;

      // for some reason using rgba values for fillstyle does not work.
      ctx.fillStyle = "#304566";
      ctx.fillRect(...worldRect[worldNumber]);
      ctx.globalAlpha = 1;
    }
  }
}
