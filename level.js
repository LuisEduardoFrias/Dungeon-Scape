import { Article } from "./article.js";
import { Box } from "./box.js";

const tait = document.createElement('div');
tait.setAttribute('id', 'content-tail');
tait.style.position = "relative";
tait.style.zIndex = "10";
tait.style.borderRadius = "20px";
tait.style.border = "5px solid #bab2b2";
tait.style.height = "256px";
tait.style.width = "256px";
tait.style.padding = "0px";
tait.style.display = "grid";
tait.style.placeContent = "center";
tait.style.placeItems = "center";
tait.style.gridTemplateColumns = "repeat(5, 50px)";
tait.style.gridTemplateRows = "repeat(4, 50px)";
tait.style.perspective = '750px';
tait.style.transformStyle = 'preserve-3d';
tait.style.transformOrigin = 'center center';

const enemy = new Article('enemy', null, tait, false, 'enemy2.png');
const rock1 = new Article('rock1', null, tait, false, 'rock.png');
const rock2 = new Article('rock2', null, tait, false, 'rock.png');
const rock3 = new Article('rock3', null, tait, false, 'rock.png');
const rock4 = new Article('rock4', null, tait, false, 'rock.png');
const rock6 = new Article('rock5', null, tait, false, 'rock.png');
const rock5 = new Article('rock6', null, tait, false, 'rock.png');
const sword = new Article('sword', null, tait, false, ['sword1.png', 'sword2.png', 'sword3.png', 'sword4.png']);
const shield = new Article('shield', null, tait, true, 'shield.png');
const hole1 = new Article('hole1', null, tait, false, 'hole.png');
const hole2 = new Article('hole2', null, tait, false, 'hole.png');
const openLock = new Article('openLock', null, tait, true, 'lock2.png');
const closedLock = new Article('closedLock', null, tait, false, 'lock.png');
const box1 = new Box("box1", tait, null);
const box2 = new Box("box2", tait, null);
const key = new Article('key', null, tait, false, 'key.png');

rock3.point = { x: 0, y: 4 };
rock4.point = { x: 1, y: 4 };
rock5.point = { x: 3, y: 4 };
rock6.point = { x: 4, y: 4 };


const articles = [
   enemy,
   rock1,
   rock2,
   key,
   sword,
   shield,
   hole1,
   hole2,
   openLock,
   closedLock,
   box1,
   box2,
];
/*
setRightPosition
setLeftPosition
setTopPosition
setBottomPosition
*/

function acticleActive() {
   enemy.disable = false;
   rock1.disable = false;
   rock2.disable = false;
   key.disable = false;
   sword.disable = false;
   shield.disable = false;
   hole1.disable = false;
   hole2.disable = false;
   openLock.disable = false;
   box1.disable = false;
   box2.disable = false;
   closedLock.disable = false;

   closedLock.point = { x: 2, y: 3, };
   openLock.point = { x: 2, y: 4, };
   openLock.disable = true;
}

const levels = [
   {
      point: { x: 0, y: 0, },
      moves: 9,
      fn: "setLeftPosition",
      objs: () => {
         acticleActive();

         rock1.point = { x: 4, y: 0, };
         hole1.point = { x: 0, y: 1, };
         rock2.point = { x: 1, y: 1, };
         box1.point = { x: 2, y: 1 };
         key.point = { x: 4, y: 1, };
         box2.point = { x: 3, y: 2 };

         enemy.disable = true;
         sword.disable = true;
         shield.disable = true;
         hole2.disable = true;
      }
   },
   {
      point: { x: 4, y: 0, },
      moves: 9,
      fn: "setBottomPosition",
      objs: () => {
         acticleActive();
         key.point = { x: 0, y: 0, };
         box1.point = { x: 1, y: 1 };
         rock1.point = { x: 2, y: 1, };
         box2.point = { x: 3, y: 1 };
         rock2.point = { x: 4, y: 3, };

         hole1.disable = true;
         hole2.disable = true;
         enemy.disable = true;
         sword.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 2, y: 3, },
      moves: 5,
      fn: "setBottomPosition",
      objs: () => {
         acticleActive();
         rock1.point = { x: 2, y: 1, };
         rock2.point = { x: 3, y: 1, };
         key.point = { x: 3, y: 3, };
         hole1.point = { x: 1, y: 3, };
         box1.point = { x: 1, y: 2 };
         box2.point = { x: 4, y: 2 };

         enemy.disable = true;
         sword.disable = true;
         shield.disable = true;
         hole2.disable = true;
      }
   },
   {
      point: { x: 1, y: 3 },
      moves: 10,
      fn: 'setRightPosition',
      objs: () => {
         acticleActive();
         box1.point = { x: 1, y: 0 };
         rock1.point = { x: 3, y: 0, };
         key.point = { x: 1, y: 1, };
         box2.point = { x: 4, y: 1 };
         rock2.point = { x: 1, y: 2, };
         enemy.point = { x: 2, y: 2, };
         sword.point = { x: 3, y: 2, };
         hole1.point = { x: 4, y: 2, };
         hole2.point = { x: 3, y: 3, };

         shield.point = { x: 1, y: 4, };
         shield.disable = true;
      }
   },
   {
      point: { x: 0, y: 1 },
      moves: 10,
      fn: 'setRightPosition',
      objs: () => {
         acticleActive();
         sword.point = { x: 0, y: 0, };
         rock1.point = { x: 1, y: 0, };
         enemy.point = { x: 1, y: 1, };
         box1.point = { x: 2, y: 1 };
         rock2.point = { x: 0, y: 2, };
         box2.point = { x: 3, y: 2 };
         key.point = { x: 1, y: 3, };
         hole1.point = { x: 3, y: 3, };

         hole2.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 2, y: 0 },
      moves: 19,
      fn: 'setBottomPosition',
      objs: () => {
         acticleActive();
         rock1.point = { x: 0, y: 1, };
         sword.point = { x: 1, y: 1, };
         enemy.point = { x: 2, y: 1, };
         key.point = { x: 4, y: 1, };
         box1.point = { x: 1, y: 2 };
         box2.point = { x: 3, y: 2 };
         rock2.point = { x: 4, y: 2, };

         hole1.disable = true;
         hole2.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 0, y: 3 },
      moves: 29,
      fn: 'setTopPosition',
      objs: () => {
         acticleActive();
         key.point = { x: 4, y: 0, };
         enemy.point = { x: 0, y: 1, };
         box1.point = { x: 1, y: 1 };
         box2.point = { x: 2, y: 1 };
         rock1.point = { x: 3, y: 1 };
         rock2.point = { x: 4, y: 1 };
         hole1.point = { x: 3, y: 3, };
         sword.point = { x: 4, y: 3, };

         hole2.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 1, y: 1 },
      moves: 23,
      fn: 'setBottomPosition',
      objs: () => {
         acticleActive();
         key.point = { x: 0, y: 0, };
         sword.point = { x: 1, y: 0, };
         enemy.point = { x: 3, y: 0, };
         rock1.point = { x: 3, y: 1 };
         box1.point = { x: 0, y: 2 };
         hole1.point = { x: 1, y: 2, };
         rock2.point = { x: 2, y: 2 };

         box2.disable = true;
         hole2.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 1, y: 1 },
      moves: 34,
      fn: 'setRightPosition',
      objs: () => {
         acticleActive();
         enemy.point = { x: 3, y: 0, };
         key.point = { x: 4, y: 0, };
         rock1.point = { x: 2, y: 1 };
         sword.point = { x: 3, y: 1, };
         rock2.point = { x: 4, y: 1 };
         hole1.point = { x: 0, y: 2, };
         box1.point = { x: 2, y: 2 };
         hole2.point = { x: 1, y: 3, };

         box2.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 4, y: 1 },
      moves: 30,
      fn: 'setBottomPosition',
      objs: () => {
         acticleActive();
         enemy.point = { x: 1, y: 0, };
         key.point = { x: 2, y: 0, };
         rock1.point = { x: 1, y: 1 };
         box1.point = { x: 2, y: 2 };
         box2.point = { x: 3, y: 2 };
         hole1.point = { x: 4, y: 2, };
         sword.point = { x: 0, y: 3, };

         rock2.disable = true;
         hole2.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 2, y: 1 },
      moves: 30,
      fn: 'setRightPosition',
      objs: () => {
         acticleActive();
         hole1.point = { x: 3, y: 0, };
         enemy.point = { x: 1, y: 1, };
         rock1.point = { x: 3, y: 2 };
         key.point = { x: 4, y: 2, };
         sword.point = { x: 0, y: 3, };
         box1.point = { x: 1, y: 3 };

         box2.disable = true;
         rock2.disable = true;
         hole2.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 2, y: 0 },
      moves: 26,
      fn: 'setBottomPosition',
      objs: () => {
         acticleActive();
         sword.point = { x: 4, y: 0, };
         box1.point = { x: 1, y: 1 };
         key.point = { x: 2, y: 1, };
         rock1.point = { x: 3, y: 1 };
         enemy.point = { x: 2, y: 2, };
         box2.point = { x: 0, y: 3 };
         hole1.point = { x: 4, y: 3, };

         rock2.disable = true;
         hole2.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 2, y: 2 },
      moves: 38,
      fn: 'setBottomPosition',
      objs: () => {
         acticleActive();
         sword.point = { x: 0, y: 0, };
         enemy.point = { x: 1, y: 0, };
         hole1.point = { x: 0, y: 1, };
         key.point = { x: 1, y: 1, };
         box1.point = { x: 2, y: 1 };
         rock1.point = { x: 1, y: 2 };
         rock2.point = { x: 3, y: 2 };

         box2.disable = true;
         hole2.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 4, y: 3 },
      moves: 30,
      fn: 'setTopPosition',
      objs: () => {
         acticleActive();
         key.point = { x: 4, y: 0, };
         sword.point = { x: 0, y: 1, };
         box1.point = { x: 1, y: 1 };
         rock1.point = { x: 3, y: 1 };
         enemy.point = { x: 4, y: 1, };
         hole1.point = { x: 0, y: 2, };
         box2.point = { x: 1, y: 2 };
         hole2.point = { x: 2, y: 2, };

         rock2.disable = true;
         shield.disable = true;
      }
   },
   {
      point: { x: 4, y: 2 },
      moves: 49,
      fn: 'setTopPosition',
      objs: () => {
         acticleActive();
         sword.point = { x: 2, y: 0, };
         box1.point = { x: 1, y: 1 };
         key.point = { x: 2, y: 1, };
         box2.point = { x: 3, y: 1 };
         hole1.point = { x: 0, y: 2, };
         rock1.point = { x: 2, y: 2 };
         enemy.point = { x: 4, y: 3, };

         rock2.disable = true;
         hole2.disable = true;
         shield.disable = true;
      }
   },
];

export { levels, articles, tait };