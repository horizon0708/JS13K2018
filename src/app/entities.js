// game sttes
export var game ={
  life: 3,
  level: 0,
  exp: 0,
  
  // 0 - start, 1 - ingame, 2 - gameover, 3 - gamewin
  state: 0 
}

//Game One
export var heroCar = {
  x: 5,
  y: 5,
  world: 0,
  team: 0,
  sprite: 'assets/h_c.png'
};

export var car = {
  x: 20,
  y: 20,
  world: 0,
  team: 1,
  sprite: 'assets/c.png'
};

//Game Two
export var hero = {
  x: 20,
  y: 20,
  isGrounded: true,
  world: 1,
  team: 0,
  sprite: 'assets/h.png'
};

export var obstacleEmail = {
  x: 20,
  y: 20,
  world: 1,
  team: 1,
  sprite: 'assets/o_e.png'
};

export var obstacleMemo = {
  x: 20,
  y: 20,
  world: 1,
  team: 1,
  sprite: 'assets/o_m.png'
};

export var obstaclePerson = {
  x: 20,
  y: 20,
  world: 1,
  team: 1,
  sprite: 'assets/o_p.png'
};

//Game Three
export var email = {
  x: 20,
  y: 20,
  hit: 40,
  world: 2,
  sprite: 'assets/e.png'
};

//Game Four
export var heart = {

}