export default class BaseGame {
  constructor(gameObjects, gameState, input) {
    this.gameObjects = gameObjects;
    this.gameState = gameState;
    this.input = input;
    this.spawn;
    this.world;
    this.state = -1;
  }

  destroy(id) {
    let ind = this.gameObjects.findIndex(o => o.id === id);
    if (ind > -1) {
      this.gameObjects.splice(ind, 1);
    }
  }

  pause() {
    this.state = 0;
    clearInterval(spawn);
  }

  end() {
    const { spawn, gameObjects, world, state } = this;
    clearInterval(spawn);
    state = -1;
    gameObjects.forEach((o, i) => {
      if (world && o.world === world) {
        gameObjects.splice(i, 1);
      }
    });
  }

  destroyOutOfBound() {
    const { gameObjects, gameState } = this;
    const padding = 100;
    gameObjects.forEach((o, i) => {
      if (
        o.x < -padding ||
        o.x > gameState.gameWidth + padding ||
        o.y < -padding ||
        o.y > gameState.gameWidth + gameState.UIHeight + padding
      ) {
        gameObjects.splice(i, 1);
      }
    });
  }
}
