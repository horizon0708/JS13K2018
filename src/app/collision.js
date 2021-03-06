// we only need to check collision between hero and the enemies, within the same world(mini game)

export const checkCollision = (gameObjects, world, input) => {
  const heroIndex = gameObjects.findIndex(
    objects => objects.team === 0 && objects.world === world
  );
  const enemies = gameObjects.filter(
    objects => objects.team === 1 && objects.world === world
  );

  if (heroIndex > -1 && enemies.length > 0) {
    if (!gameObjects[heroIndex].invincible) {
      // cannot use forEach for this https://stackoverflow.com/questions/32041912/can-foreach-in-javascript-make-a-return
      for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].name) {
          if(enemies[i].name === input && hasCollided(gameObjects[heroIndex], enemies[i])){
            return [gameObjects[heroIndex].id, enemies[i].id];
          }
        } else {
          if (hasCollided(gameObjects[heroIndex], enemies[i])) {
            return [gameObjects[heroIndex].id, enemies[i].id];
          }
        }
      }
    }
  }
  return false;
};

//AABB
function hasCollided(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
