import { levels, articles, place, tait } from "./level.js";
import { Player } from "./player.js";
import { TouchMove } from "./touch_move.js";

function init() {
   let touch = TouchMove.getInstance();

   let pj = new Player(place);
   let level_label = document.querySelector("#level");
   let playerInput = document.querySelector("#player-input");
   let level = 0;
   let isNextLevel = false;

   for (let i = 1; i <= 25; i++) {
      const div = document.createElement('div');
      div.style.zIndex = `5`;
      div.classList.add('tail');
      div.setAttribute('id', `tail-${i}`);
      tait.appendChild(div);
   }

   place.appendChild(tait);

   return { pj, touch, level_label, playerInput, level, isNextLevel };
}

let { pj, touch, level_label, playerInput, level, isNextLevel } = init();

function nextLevel() {
   level++;

   const objLevel = levels[level - 1];

   pj[objLevel.fn]();
   pj.point = { ...objLevel.point };
   objLevel.objs();

   level_label.innerHTML = `Level ${level}`;
}
nextLevel();


let platformX = 0;
let platformY = 0;
const placeRotationSensitivity = 0.009;
let rightAnimation = false;
let leftAnimation = false;
let topAnimation = false;
let bottomAnimation = false;

function moverPlayerX(value) {
   if (value > 0 && value > 50) {
      rightAnimation = true;
   }

   if (value < 0 && value < -50) {
      leftAnimation = true;
   }
}

function moverPlayerY(value) {
   if (value > 0 && value > 50) {
      topAnimation = true;
   }

   if (value < 0 && value < -50) {
      bottomAnimation = true;
   }
}

function verify(value) {
   for (let ele of objPoint) {
      let x = pj.point.x;
      let y = pj.point.y;

      if (value === 'right') {
         x -= 1;
      }
      else if (value === 'left') {
         x += 1;
      }
      else if (value === 'top') {
         y -= 1;
      }
      else if (value === 'bottom') {
         y += 1;
      }

      if (ele.point.x === x && ele.point.y === y && ele.disable === false) {
         const oldState = pj.state;
         const move = pj.state.moves[value];
         move();
         let nameState = pj.state.na;
         nameState = nameState.substring(0, nameState.length - 1);
         pj.state = oldState;

         if (ele.name === 'key') {
            if (nameState === "transform1" && ele.disable === false) {
               pj.hasKey = true;
               ele.disable = true;
               ele.obj.style.opacity = "0";
               return true;
            } else if (ele.disable === true) {
               return true;
            }
         }
         else if (ele.name === 'shield') {
            if (nameState === "transform3" && ele.disable === false) {
               ele.disable = true;
               ele.obj.style.opacity = "0";

               pj.shieldOn = true;
               return true;
            } else if (ele.disable === true) {
               return true;
            }
         }
         else if (ele.name === 'sword') {
            if (nameState === "transform2" && ele.disable === false) {
               ele.disable = true;
               ele.obj.style.opacity = "0";

               const key = points.find((el) => el.name === "enemy");
               key.disable = true;
               key.obj.style.opacity = "0";

               pj.swordOn = true;

               return true;
            } else if (ele.disable === true) {
               return true;
            }
         }
         else if (ele.name === 'hoyo1' || ele.name === 'hoyo2') {
            if (nameState === "transform1") {
               if (pj.hasKey === true) {
                  pj.hasKey = false;

                  const key = points.find((el) => el.name === "key");
                  key.disable = false;
                  key.obj.style.opacity = "1";
               }
               return true;
            }
         }
         else if (ele.name === 'closedLock') {
            if (nameState === "transform1" && pj.hasKey === true) {
               ele.disable = true;
               ele.obj.style.opacity = "0";

               const openLock = points.find((el) => el.name === "openLock");
               openLock.disable = false;
               openLock.obj.style.opacity = "1";

               isNextLevel = true;
            }
            return true;
         }

         return false;
      }
   }

   return true;
}

function end(value) {
   const opcionesDeTemporizacion = {
      duration: 1000,
      iterations: 1,
      easing: 'ease-in-out',
      fill: 'forwards'
   };
   let keyframesDeAnimacion = [];

   if (pj.x < 4 && rightAnimation === true) {
      rightAnimation = false;
      if (verify('left')) {
         keyframesDeAnimacion = pj.state.moves.right();
         pj.x += 1;
      }
   }

   if (pj.x > 0 && leftAnimation === true) {
      leftAnimation = false;
      if (verify('right')) {
         keyframesDeAnimacion = pj.state.moves.left();
         pj.x -= 1;
      }
   }

   if (pj.y < 3 && topAnimation === true) {
      topAnimation = false;
      if (verify('bottom')) {
         keyframesDeAnimacion = pj.state.moves.bottom();
         pj.y += 1;
      }
   }

   if (pj.y > 0 && bottomAnimation === true) {
      bottomAnimation = false;
      if (verify('top')) {
         keyframesDeAnimacion = pj.state.moves.top();
         pj.y -= 1;
      }
   }

   pj.obj.animate(keyframesDeAnimacion, opcionesDeTemporizacion);

   if (isNextLevel) {
      isNextLevel = false;
      // nextLevel();
   }
};

function right(value) {
   alert('-------')
   if (playerInput.checked) {
      moverPlayerX(value);
   } else {
      platformX += value * placeRotationSensitivity;
      wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${platformY}deg) rotateZ(${platformX}deg)`;
      //wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
   }
};

function left(value) {
   if (playerInput.checked) {
      moverPlayerX(value);
   } else {
      platformX += value * placeRotationSensitivity;
      wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${platformY}deg) rotateZ(${platformX}deg)`;
      //wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
   }
};

function top(value) {
   if (playerInput.checked) {
      moverPlayerY(value);
   } else {
      platformY += value * placeRotationSensitivity;

      if (platformY > -20 && platformY < 0) {
         wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${platformY}deg) rotateZ(${platformX}deg)`;
         //wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
      }
   }
};

function bottom(value) {
   if (playerInput.checked) {
      moverPlayerY(value);
   } else {
      platformY += value * placeRotationSensitivity;

      if (platformY > -20 && platformY < 0) {
         wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${platformY}deg) rotateZ(${platformX}deg)`;
         //wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
      }
   }
};

touch.addEvent(end);
touch.addEvent(right);
touch.addEvent(left);
touch.addEvent(top);
touch.addEvent(bottom);