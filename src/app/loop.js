var lastTime = timestamp();

function timestamp () {
  return window.performance && window.performance.now ?
    window.performance.now() :
    Date.now();
}

function raf (fn) {
  return window.requestAnimationFrame(function () {

    var now = timestamp();
    var dt = now - lastTime;

    if (dt > 999) {
      dt = 1 / 60;
    } else {
      dt /= 1000;
    }

    lastTime = now;

    fn(dt);
  });
}

exports.start = function (fn) {
  return raf(function tick (dt) {
    fn(dt);
    raf(tick);
  });
};