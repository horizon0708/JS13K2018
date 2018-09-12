// game sttes
export var game ={
  life: 3,
  level: 0,
  exp: 0,
  
  // 0 - start, 1 - ingame, 2 - gameover, 3 - gamewin
  state: 0 
}

export var trueEnding = {
  world: 4,
  team: 2,
  sprite: 'e_t.png'
}
export var normalEnding = {
  world: 4,
  team: 2,
  sprite: 'e_ff.png'
}
export var opening = {
  world: 4,
  team: 2,
  sprite: 'oo.png'
}



export var battery = {
  world: 4,
  team: 2,
  sprite: 'b.png'
}

//Game One
export var heroCar = {
  world: 0,
  team: 0,
  sprite: 'h_c.png'
};

export var car = {
  world: 0,
  team: 1,
  sprite: 'c.png'
};

//Game Two
export var hero = {
  isGrounded: true,
  world: 1,
  team: 0,
  sprite: 'h.png'
};

export var obstacleEmail = {
  world: 1,
  team: 1,
  sprite: 'o_e.png'
};

export var obstacleMemo = {
  world: 1,
  team: 1,
  sprite: 'o_m.png'
};

export var obstaclePerson = {
  world: 1,
  team: 1,
  sprite: 'o_p.png'
};

//Game Three
export var person = {
  world: 2,
  team: 2,
  order: 2,
  sprite: '2_p.png'
}

export var hand = {
  world: 2,
  team: 2,
  sprite: '2_a.png'
}

export var light = {
  world: 2,
  team: 2,
  order: 1
}

export var bubble = {
  world: 2,
  team: 2,
  sprite: '2_b.png'
}

export var like = {
  world: 2,
  team: 2,
  sprite: '2_h.png'
}

export var rt = {
  world: 2,
  team: 2,
  sprite: '2_r.png'
}

export var msg = {
  world: 2,
  team: 2,
  sprite: '2_m.png'
}

export var arrowLeft = {
  world: 2,
  team: 1,
  name: 'LEFT',
  sprite: 'a.png'
}

export var arrowUp = {
  world: 2,
  team: 1,
  name: 'UP',
  sprite: 'a_u.png'
}

export var arrowRight = {
  world: 2,
  team: 1,
  name: 'RIGHT',
  sprite: 'a_r.png'
}

export var hitBox = {
  world: 2,
  width: 2,
  height: 9,
  team: 0
}

//Game Four
export var todo = {
  width: 54,
  height: 8,
  hit: 40,
  team: 1,
  world: 3,
};

export var hitBoxGameFour = {
  world: 3,
  width: 64,
  height: 3,
  team: 0
}
