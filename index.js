import { levels, articles, tait } from "./level.js";
import { Player } from "./player.js";
import { TouchMove } from "./touch_move.js";
import { Place } from "./place.js";

function init() {
   let touch = TouchMove.getInstance();
   const place = new Place(tait);
   let pj = new Player(tait);

   let moves = 0;
   let level_label = document.querySelector("#level");
   let moves_label = document.querySelector("#moves");
   let playerInput = document.querySelector("#player-input");
   let level = 0;
   let isNextLevel = false;

   return { pj, touch, place, moves, moves_label, level_label, playerInput, level, isNextLevel };
}

let { pj, touch, place, moves, moves_label, level_label, playerInput, level, isNextLevel } = init();

function nextLevel() {
   level++;

   const objLevel = levels[level - 1];

   pj[objLevel.fn]();
   pj.point = { ...objLevel.point };
   objLevel.objs();

   moves_label.innerHTML = `Moves: ${objLevel.moves}`;

   level_label.innerHTML = `Level ${level}`;
}
nextLevel();

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

function movePrompt() {
   moves++;
   const objLevel = levels[level - 1];

   if (objLevel.moves - moves < 0) {
      moves_label.style.color = "red";
   }

   moves_label.innerHTML = `Moves: ${objLevel.moves - moves}`;
}

function verify(value) {

   for (let ele of articles) {
      let x = pj.x;
      let y = pj.y;


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

      console.log(`${ele.name} - ${ele.point.x} - ${ele.point.y} === ${x} - ${y} ? ${ele.point.x === x && ele.point.y === y}`)
      if (ele.point.x === x && ele.point.y === y && ele.disable === false) {
         alert("---")
         const oldState = pj.state;
         const move = pj.state.moves[value];
         move();
         alert(pj.state.name)
         let nameState = pj.state.name;
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
         else if (ele.name === 'hole1' || ele.name === 'hole2') {
            if (nameState === "transform1") {
               alert("-222--")
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

touch.addEvent((value) => {
   const opcionesDeTemporizacion = {
      duration: 1000,
      iterations: 1,
      easing: 'ease-in-out',
      fill: 'forwards'
   };

   let keyframesDeAnimacion = [];

   if (pj.x < 4 && rightAnimation === true) {
      rightAnimation = false;
      console.log("--- rigth")
      if (verify('left')) {
         movePrompt();
         keyframesDeAnimacion = pj.state.moves.right();
         pj.x += 1;
      }
   }
   else if (pj.x > 0 && leftAnimation === true) {
      leftAnimation = false;
      console.log("--- left")
      if (verify('right')) {
         movePrompt();
         keyframesDeAnimacion = pj.state.moves.left();
         pj.x -= 1;
      }
   }
   else if (pj.y < 3 && topAnimation === true) {
      topAnimation = false;
      console.log("--- top")
      if (verify('bottom')) {
         movePrompt();
         keyframesDeAnimacion = pj.state.moves.bottom();
         pj.y += 1;
      }
   }
   else if (pj.y > 0 && bottomAnimation === true) {
      bottomAnimation = false;
      if (verify('top')) {
         movePrompt();
         keyframesDeAnimacion = pj.state.moves.top();
         pj.y -= 1;
      }
   }

   pj.obj.animate(keyframesDeAnimacion, opcionesDeTemporizacion);

   if (isNextLevel) {
      isNextLevel = false;
      nextLevel();
   }
}, 'end');

touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerX(value);
   } else {
      place.right = value;
   }
}, 'right');

touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerX(value);
   } else {
      place.left = value;
   }
}, 'left');

touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerY(value);
   } else {
      place.top = value;
   }
}, 'top');

touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerY(value);
   } else {
      place.bottom = value;
   }
}, 'bottom');
