// we only need to check collision between hero and the enemies, within the same world(mini game)

export const checkCollision = (gameObjects, world) => {
  const worldObjects = gameObjects.filter(objects => objects.world === world);
  const heroIndex = worldObjects.findIndex(objects => objects.team === 0);
  const enemies = worldObjects.filter(objects => objects.team === 1);

  if (heroIndex > -1 && enemies.length > 0) {
    enemies.forEach(e => {
      return hasCollided(worldObjects[heroIndex], e);
    });
  }

  return false;
};

function hasCollided(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
