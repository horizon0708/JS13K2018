export default class {
  constructor() {
    this.UIHeight = 16;
    this.gameWidth = 128;
    this.gameHeight = 128;
    this.health = 3;
    // -2: end, -1: start, 0~3 games
    this.activeWorld = 0;
    this.gameTimer = 0;
    this.startTimestamp;
    this.worldTimestamp;
    this.level = 0; 
  }

  start() {
    // startTimestamp
    // worldTimestamp
    // 
  }

  update() {
    // check time and change world, depending on level 
    // first 3 level, go in order
    // update only on activeworld > -1
  }

  loseHealth() {

  }

  end() {
    
  }
}