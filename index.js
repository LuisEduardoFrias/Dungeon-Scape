import { Box } from "./box.js";
import { Player } from "./player.js";
import { Article } from "./article.js";
import { TouchMove } from "./touch_move.js";


function init() {
   var touch = TouchMove.getInstance();
   touch.addEvent(end);
   touch.addEvent(right);
   touch.addEvent(left);
   touch.addEvent(top);
   touch.addEvent(bottom);

   var wd = document.querySelector("#wd");
   var pj = new Player(wd);
   var count = document.querySelector("#count");
   var playerInput = document.querySelector("#player-input");
   var level = 0;
   var isNextLevel = false;


   const enemy = new Article('enemy', null, document.querySelector("#wd"), 'shield.png');
   const rock1 = new Article('rock1', null, document.querySelector("#wd"), 'rock.png');
   const rock2 = new Article('rock2', null, document.querySelector("#wd"), 'rock.png');
   const key = new Article('key', null, document.querySelector("#wd"), 'key.png');
   const sword = new Article('sword', null, document.querySelector("#wd"), true, 'sword.gif');
   const shield = new Article('shield', null, document.querySelector("#wd"), true, 'shield.png');
   const hoyo1 = new Article('hoyo1', null, document.querySelector("#wd"), 'hoyo.png');
   const hoyo2 = new Article('hoyo2', null, document.querySelector("#wd"), 'hoyo.png');
   const openLock = new Article('openLock', null, document.querySelector("#wd"), true, 'lock.png');
   const closedLock = new Article('closedLock', null, document.querySelector("#wd"), 'lock.png');
   const box1 = new Box("box1", document.querySelector("#wd"), null);
   const box2 = new Box("box2", document.querySelector("#wd"), null);

   const objPoint = [
      enemy,
      rock1,
      rock2,
      key,
      sword,
      shield,
      hoyo1,
      hoyo2,
      openLock,
      closedLock,
      box1,
      box2,
   ];

   const levels = [
      {
         point: { x: 2, y: 3 },
         state: transform12,
         objs: () => {
            enemy.point = { x: 1, y: 2, };
            rock1.point = { x: 2, y: 1, };
            rock2.point = { x: 3, y: 1, };
            key.point = { x: 3, y: 3, };
            sword.point = { x: 2, y: 2, };
            shield.point = { x: 1, y: 4, };
            hoyo1.point = { x: 1, y: 3, };
            hoyo2.point = { x: 1, y: 3, };
            openLock.point = { x: 2, y: 4, };
            closedLock.point = { x: 2, y: 3, };
            box1.point = { x: 1, y: 3 };
            box2.point = { x: 4, y: 2 };
         }
      },
      {
         point: { x: 1, y: 3 },
         state: transform11,
         objs: () => {
            enemy.point = { x: 2, y: 2, };
            rock2.point = { x: 3, y: 0, };
            key.point = { x: 3, y: 3, };
            sword.point = { x: 3, y: 2, };
            shield.point = { x: 1, y: 4, };
            hoyo1.point = { x: 3, y: 3, };
            hoyo2.point = { x: 4, y: 2, };
            openLock.point = { x: 2, y: 4, };
            closedLock.point = { x: 2, y: 3, };
            box1.point = { x: 4, y: 1 };
            box2.point = { x: 1, y: 0 };
         }
      }
   ];
}
init();

function nextLevel() {
   level++;
   const obj_level = levels[level];
   pj.point = { x: obj_level.point.x, y: obj_level.point.y };
   pj.state = obj_level.state;
   count.innerHTML = `Level ${level + 1}`;

   pj.obj.style.top = `opx`;
   pj.obj.style.left = `opx`;
   pj.obj.style.transform = `translateZ(27px) translateX(${50 * pj.x}px) translateY(${50 * pj.y}px) ${pj.state.key} `;

   obj_level.objs();
}
count.innerHTML = `Level ${level + 1}`;

pj.state = transform12;
pj.point = { x: pj.x, y: pj.y }
//pj.state(pj.state.key);

levels[level].objs();

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
      nextLevel();
   }
};

function right(value) {
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





