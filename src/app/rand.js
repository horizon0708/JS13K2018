var seed = 0;

function random () {
  var x = Math.sin(.8765111159592828 + seed++) * 10000;

  return x - Math.floor(x);
}

/**
 * Return an integer within [0, max).
 *
 * @param  {int} [max]
 * @return {int}
 */
exports.int = function (max) {
  return random() * (max || 0xfffffff) | 0;
};

/**
 * Return an integer within [min, max).
 *
 * @param  {int} min
 * @param  {int} max
 * @return {int}
 */
exports.range = function (min, max) {
  return this.int(max - min) + min;
};

