import { timestamp } from "./loop";
import random from "./rand";
import { bindUp, bindDown, bindLeft, bindRight } from "./input";

export default class {
  constructor() {
    this.UIHeight = 16;
    this.gameWidth = 128;
    this.gameHeight = 128;
    this.health = 0;
    // -2: end, -1: start, 0~3 games
    this.activeWorld = [-1];

    // 0 - restart, 1 - normal, 2 - true
    this.ending = 0;
    this.gameTimer = 0;
    this.startTimestamp;
    this.worldUpdateTimestamp;
    this.endingTimestamp;
    this.endingTime = 1000 * 2;
    this.fadeInTimestamp;
    this.fadeInTime = 1000 * 4;
    this.endingShowTimestamp;
    this.endingShowTime = 1000 * 12;
    this.ended = false;

    this.level = 5;
    this.baseLevel = 5;
    this.changeInterval = [6000, 5000, 4000, 3000];
    this.levelOrder = [[0], [1], [3], [2]];
    this.currOrder = 0;
    this.advancedOrder = [[2], [1, 3]];
    this.changeRef;
    this.levelRef;
  }

  initialise() {
    this.reset();
    bindUp(() => this.start());
    bindDown(() => this.start());
    bindLeft(() => this.start());
    bindRight(() => this.start());
  }

  reset() {
    
    if (this.levelRef) {
      clearInterval(this.levelRef);
    }
    this.health = 3;
    this.activeWorld = [-1];
    this.ending = 0;
    this.ended = false;
    this.startTimestamp = 0;
    this.worldUpdateTimestamp = null;
    this.endingTimestamp = null;
    this.fadeInTimestamp = null;
    this.endingShowTimestamp = null;
    this.level = this.baseLevel;
    
  }

  start() {
    if (this.activeWorld.includes(-1)) {
      this.startTimestamp = timestamp();
      this.worldUpdateTimestamp = timestamp();
      this.activeWorld = [0];
      this.levelRef = setInterval(() => {
        this.level++;
      }, 1000 * 20);
    }
  }

  getLevel() {
    let { level, baseLevel, levelOrder, advancedOrder } = this;
    if (this.currOrder === 3) {
      this.currOrder = 0;
    } else {
      this.currOrder++;
    }
    if (level - baseLevel < 4) {
      return levelOrder[this.currOrder];
    }
    return advancedOrder[this.currOrder];
  }

  getInterval() {
    const { level, baseLevel, changeInterval } = this;
    if (level - baseLevel > 3) {
      return changeInterval[3];
    }
    if (level - baseLevel > -1) {
      return changeInterval[level - baseLevel];
    }
    return changeInterval[0];
  }

  getProgress() {
    let _goal = 1000 * 60 * 1.5; //2.5m
    let _curr = timestamp() - this.startTimestamp;
    // console.log(timestamp() - this.startTimestamp);
    let percent = (_curr / _goal) * 100;
    return Math.round(percent);
  }

  getTimeProgress(goal, ts) {
    let _curr = timestamp() - ts;
    let percent = _curr / goal;
    return percent;
    // return percent > 1 ? 1 : percent;
  }

  getEndingProgress() {
    return this.getTimeProgress(this.endingTime, this.endingTimestamp);
  }

  getFadeInProgress() {
    return this.getTimeProgress(this.fadeInTime, this.fadeInTimestamp);
  }

  getBeforeResetProgress() {
    return this.getTimeProgress(this.endingShowTime, this.endingShowTimestamp);
  }

  update() {
    // check time and change world, depending on level
    // first 3 level, go in order
    // update only on activeworld > -1
    if (this.worldUpdateTimestamp) {
      if (timestamp() - this.worldUpdateTimestamp > this.getInterval()) {
        this.worldUpdateTimestamp = timestamp();
        this.activeWorld = this.getLevel() || [random.range(0, 4)];
      }
    }
    if (this.getProgress() > 100 && !this.ended) {
      // console.log(this.getProgress());
      this.end(2);
    }
    if (this.health < 0 && !this.ended) {
      if (this.getProgress() > 50) {
        this.end(1);
      } else {
        this.end(0);
      }
    }
  }

  end(ending) {
    if (this.levelRef) {
      clearInterval(this.levelRef);
    }
    this.activeWorld = [-2];
    this.ending = ending;
    this.ended = true;
    this.endingTimestamp = timestamp();
    this.endingShowTimestamp = timestamp();
    // if (ending > 0) {
    //   setTimeout(() => {
    //     console.log(this.activeWorld);
    //     if (this.activeWorld.includes(-2)) {
    //       this.reset();
    //     }
    //   }, 4000);
    // }
  }
}
