export default class GameObject {
  constructor() {
    const entity = arguments[0];
    this.id = uuidv4();
    this.x = 0;
    this.y = 0;
    this.width = 9;
    this.height = 9;
    this.loaded = false;
    this.destroyed = false;
    this.world = entity.world;

    this.order = 0;
    this.show = true;
    this.invincible = false;
    this.invincibleTimer = 3000;
    this.frequency = 200;
    this.words = [];

    if (entity.hasOwnProperty("team")) {
      this.team = entity.team;
    }

    if (entity.hasOwnProperty("name")) {
      this.name = entity.name;
    }

    if (entity.hasOwnProperty("width") && entity.hasOwnProperty("width")) {
      this.width = entity.width;
      this.height = entity.height;
    }

    if(entity.hasOwnProperty("order")){
      this.order = entity.order;
    }

    // co-ord override
    if (arguments[1] && arguments[2]) {
      this.x = arguments[1];
      this.y = arguments[2];
    }
    if (entity.sprite) {
      this.image = new Image();
      this.image.src = entity.sprite;
      this.image.onload = () => {
        this.loaded = true;
      };
    }
  }


  
  getHit() {
    this.invincible = true;
    setTimeout(() => {
      this.invincible = false;
    }, this.invincibleTimer);
  }
}

//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
