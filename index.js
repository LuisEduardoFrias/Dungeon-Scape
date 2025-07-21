import { levels, articles, tait } from "./level.js";
import { Player } from "./player.js";
import { TouchMove } from "./touch_move.js";
import { Place } from "./place.js";

function init() {
   let touch = TouchMove.getInstance();
   const place = new Place(tait);
   let pj = new Player(tait);

   let level = localStorage.getItem("level") ?? 0;
   const btn_reset_level = document.querySelector("#btn-reset-level");
   const btn_reset_game = document.querySelector("#btn-reset-game");

   let moves = 0;
   let start = false;
   const btn_start = document.querySelector("#btn-start");
   const btn_rotate = document.querySelector("#btn-rotate");
   const keyOn = document.querySelector("#key-on");
   const swordOn = document.querySelector("#sword-on2");
   const shieldOn = document.querySelector("#shield-on2");
   let level_label = document.querySelector("#level");
   let moves_label = document.querySelector("#moves");
   let playerInput = document.querySelector("#player-input");
   const panelStart = document.querySelector("#panel-start");
   const panelFinished = document.querySelector("#panel-finished");
   panelFinished.style.visibility = "hidden";

   let isNextLevel = false;

   btn_rotate.addEventListener('click', btnRotate);
   btn_start.addEventListener('click', btnStart);
   btn_reset_level.addEventListener('click', () => window.location.reload());
   btn_reset_game.addEventListener('click', () => { localStorage.removeItem("level"); panelFinished.style.visibility = "hidden"; window.location.reload(); });

   return { pj, touch, place, start, panelStart, panelFinished, moves, swordOn, shieldOn, keyOn, moves_label, level_label, playerInput, level, isNextLevel };
}

let { pj, touch, place, moves, start, panelStart, panelFinished, swordOn, shieldOn, keyOn, moves_label, level_label, playerInput, level, isNextLevel } = init();

function nextLevel() {

   if (level === 0) {
      nextL();
   } else {
      panelStart.style.visibility = 'visible';
      start = false;
      nextL();
   }

   function nextL() {
      localStorage.setItem("level", level);
      level++;

if(level === 16) {
   panelFinished.style.visibility = "visible";
}

      const objLevel = levels[level - 1];

      pj[objLevel.fn]();
      pj.point = { ...objLevel.point };
      pj.hasKey = false;
      keyOn.style.filter = "grayscale(100%)";
      swordOn.style.filter = "grayscale(100%)";
      shieldOn.style.filter = "grayscale(100%)";
      objLevel.objs();
      moves = 0;
      moves_label.style.color = "black";
      pj.swordOn = false;
      isNextLevel = false;

      moves_label.innerHTML = `Moves: ${objLevel.moves}`;

      level_label.innerHTML = `Level ${level}`;
   }
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
         x += 1;
      }
      else if (value === 'left') {
         x -= 1;
      }
      else if (value === 'top') {
         y -= 1;
      }
      else if (value === 'bottom') {
         y += 1;
      }

      activeShield(value);

      if (ele.point.x === x && ele.point.y === y && ele.disable === false) {

         const oldState = pj.state;
         const move = pj.state.moves[value];
         move();

         let nameState = pj.state.name;
         nameState = nameState.substring(0, nameState.length - 1);
         pj.state = oldState;

         if (ele.name === 'key') {
            if (nameState === "transform1" && ele.disable === false) {
               pj.hasKey = true;
               ele.disable = true;
               keyOn.style.filter = "grayscale(0%)";

               return true;
            } else if (ele.disable === true) {
               return true;
            }
         }
         else if (ele.name === 'shield') {
            if (nameState === "transform3" && ele.disable === false) {
               ele.disable = true;
               pj.shieldOn = true;
               return true;
            } else if (ele.disable === true) {
               return true;
            }
         }
         else if (ele.name === 'sword') {
            if (nameState === "transform2" && ele.disable === false) {
               ele.disable = true;

               const enemy = articles.find((el) => el.name === "enemy");
               enemy.disable = true;
               swordOn.style.filter = "grayscale(0%)";
               swordOn.style.filter = "grayscale(0%)";
               pj.swordOn = true;

               return true;
            } else if (ele.disable === true) {
               return true;
            }
            return true;
         }
         else if (ele.name === 'hole1' || ele.name === 'hole2') {
            if (nameState === "transform1") {
               if (pj.hasKey === true) {
                  pj.hasKey = false;
                  keyOn.style.filter = "grayscale(100%)";
                  const key = articles.find((el) => el.name === "key");
                  key.disable = false;
               }
               return true;
            }
         }
         else if (ele.name === 'closedLock') {
            if (nameState === "transform1" && pj.hasKey === true) {
               ele.disable = true;

               const openLock = articles.find((el) => el.name === "openLock");
               openLock.disable = false;

               isNextLevel = true;
            }
            return true;
         }

         return false;
      }
   }

   return true;
}

function verifyBox() {
   for (let ele of articles) {
      if (ele.name === 'box1' || ele.name === 'box2') {
         let x = pj.x;
         let y = pj.y;

         // left
         if (ele.point.x === (x - 1) && ele.point.y === y && ele.disable === false) {
            return false;
         }

         // right
         if (ele.point.x === (x + 1) && ele.point.y === y && ele.disable === false) {
            return false;
         }

         // top
         if (ele.point.x === x && ele.point.y === (y - 1) && ele.disable === false) {
            return false;
         }

         // bottom
         if (ele.point.x === x && ele.point.y === (y + 1) && ele.disable === false) {
            return false;
         }
      }
   }
   return true;
}

function btnRotate() {
   const nameState = pj.state.name;
   const nameState2 = nameState.substring(0, nameState.length - 1);

   if (nameState2 === "transform3" && verifyBox() && playerInput.checked) {
      if (nameState === 'transform31')
         pj.setBottomRotate();
      if (nameState === 'transform32')
         pj.setLeftRotate();
      if (nameState === 'transform33')
         pj.setTopRotate();
      if (nameState === 'transform34')
         pj.setRightRotate();
   }
}

function btnStart() {
   start = true;
   panelStart.style.visibility = 'hidden';
};

function activeShield(value) {
   const oldState = pj.state;
   const move = pj.state.moves[value];
   move();

   let nameState = pj.state.name;
   nameState = nameState.substring(0, nameState.length - 1);
   pj.state = oldState;

   if (nameState === "transform3") {
      shieldOn.style.filter = "grayscale(0%)";
   }
   else {
      shieldOn.style.filter = "grayscale(100%)";
   }
}


touch.addEvent((value) => {
   if (start) {
      const opcionesDeTemporizacion = {
         duration: 1000,
         iterations: 1,
         easing: 'ease-in-out',
         fill: 'forwards'
      };

      let keyframesDeAnimacion = [];

      if (pj.x < 4 && rightAnimation === true) {
         rightAnimation = false;
         if (verify('right')) {
            movePrompt();
            keyframesDeAnimacion = pj.state.moves.right();
            pj.x += 1;
         }
      }
      else if (pj.x > 0 && leftAnimation === true) {
         leftAnimation = false;
         if (verify('left')) {
            movePrompt();
            keyframesDeAnimacion = pj.state.moves.left();
            pj.x -= 1;
         }
      }
      else if (pj.y < 3 && topAnimation === true) {
         topAnimation = false;
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
   }
}, 'end');

touch.addEvent((value) => {
   if (start) {
      if (playerInput.checked) {
         moverPlayerX(value);
      } else {
         place.right = value;
      }
   }
}, 'right');

touch.addEvent((value) => {
   if (start) {
      if (playerInput.checked) {
         moverPlayerX(value);
      } else {
         place.left = value;
      }
   }
}, 'left');

touch.addEvent((value) => {
   if (start) {
      if (playerInput.checked) {
         moverPlayerY(value);
      } else {
         place.top = value;
      }
   }
}, 'top');

touch.addEvent((value) => {
   if (start) {
      if (playerInput.checked) {
         moverPlayerY(value);
      } else {
         place.bottom = value;
      }
   }
}, 'bottom');
