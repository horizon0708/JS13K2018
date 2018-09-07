export const bindInput = (fn, keycode) => {


  window.addEventListener('keypress', function (e) {
    if(e.keyCode === keycode){
      fn();
    }
  }, false);
}

export const bindUp = (fn) => {
  return bindInput(fn, 38);
}

export const bindDown = (fn) => {
  return bindInput(fn, 40);
}

export const bindLeft = (fn) => {
  return bindInput(fn, 37);
}

export const bindRight = (fn) => {
  return bindInput(fn, 39);
}