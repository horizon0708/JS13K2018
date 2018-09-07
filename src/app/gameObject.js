export default class GameObject {
  constructor(){
    const entity = arguments[0];
    this.id = uuidv4();
    this.x = entity.x;
    this.y = entity.y;
    this.width = 8;
    this.height = 8;
    this.loaded = false;
    this.destroyed = false;
    this.world = entity.world;

    this.show = true;
    this.invincible = false;
    this.invincibleTimer = 3000;
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
    }, this.invincibleTimer);
  }
}

//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}