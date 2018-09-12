import GameObject from './gameObject'
import random from './rand';

export default class {
  constructor(gameObjects, gameState) {
    this.gameObjects = gameObjects;
    this.gameState = gameState;
    this.spawnRef;
    this.world = 0;
    this.state = -1;
   
    // enemy speed
    this.baseSpeed = 10;
    this.speedInterval = 10;

    // enemy spawn interval
    this.baseSpawn = this.baseSpeed * 400;
    this.spawnInterval = this.getSpeed() * 10;
    this.spawnFloor = 600;
    this.spawnVariance = 300;

    this.speedVariance = 0;
    this.gameEnded = false;
  }

  destroy(id) {
    let ind = this.gameObjects.findIndex(o => o.id === id);
    if (ind > -1) {
      return this.gameObjects.splice(ind, 1);
    }
  }

  find(id) {
    let ind = this.gameObjects.findIndex(o => o.id === id);
    return ind > -1 ? this.gameObjects[ind] : null;
  }

  spawn(entity, x, y) {
    let newObj = new GameObject(entity, x ,y)
    this.gameObjects.push(newObj);
    return newObj;
  }

  setSpawnInteval(fn) {
    this.spawnRef = setInterval(()=> {
      fn();
    }, this.getSpawnTime()) ;
  }

  end() {
    if(this.gameEnded){
      return null;
    }
    this.gameEnded = true;
    let { spawnRef, gameObjects, world, state } = this;
    if(spawnRef){
      clearInterval(spawnRef);
    }
    state = -1;
    gameObjects = [];
    // gameObjects.forEach((o, i) => {
    //   if (world && o.world === world) {
    //     gameObjects.splice(i, 1);
    //   }
    // });
  }

  destroyOutOfBound() {
    const { gameObjects, gameState } = this;
    const padding = 10;
    
    // console.log(gameObjects);
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
  
  getHero(){
    const { gameObjects, world } = this;
    const heroIndex = gameObjects.findIndex(
      o => o.world === world && o.team === 0
    );
    return heroIndex > -1 ? gameObjects[heroIndex] : null;
  }

  getSpawnTime() {
    const { baseSpawn, spawnInterval, spawnFloor, gameState, spawnVariance } = this;
    let speed = baseSpawn - spawnInterval * gameState.level;
    speed = speed < spawnFloor ? spawnFloor : speed;
    return random.range(speed, speed + spawnVariance);
  }
  
  getSpeed() {
    let _speed =  this.baseSpeed + this.speedInterval * this.gameState.level;
    return _speed;
  }
  
  moveEnemies(dt, xVector, yVector) {
    const {gameObjects, world} = this;
    gameObjects.forEach(o => {
      if(o.world === world && o.team ===1){
        o.x += (this.getSpeed() * dt * xVector);
        o.y += (this.getSpeed() * dt * yVector);
      }
    })
  }
}
