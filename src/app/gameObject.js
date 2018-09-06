

export default class GameObject {
  constructor(){
    const entity = arguments[0];
    this.x = entity.x;
    this.y = entity.y;
    this.width = 8;
    this.height = 8;
    this.loaded = false;
    this.destroyed = false;
    this.world = entity.world;

    this.show = true;
    this.invincible = false;
    this.invisibleTimer = 3000;
    this.frequency = 200;

    if(entity.hasOwnProperty('team')){
      this.team = entity.team;
    }

    if(entity.hasOwnProperty('width') & entity.hasOwnProperty('width')){
      this.width = entity.width;
      this.height = entity.height;
    }

    // co-ord override
    if(arguments[1] && arguments[2]){
      this.x = arguments[1];
      this.y = arguments[2];
    }
    
    this.image = new Image();
    this.image.src = entity.sprite;
    this.image.onload = () =>{
      this.loaded = true;
    }
  }

  getHit(){
    this.invincible = true;
    setTimeout(()=>{
      this.invincible = false;
    }, this.invisibleTimer);
  }
}