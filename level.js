import { Article } from "./article.js";
import { Box } from "./box.js";

const place = document.querySelector("#place");
const tait = document.createElement('div');
tait.setAttribute('id', 'content-tail');

const enemy = new Article('enemy', null, tait, false, 'enemy.png');
const rock1 = new Article('rock1', null, tait, false, 'rock.png');
const rock2 = new Article('rock2', null, tait, false, 'rock.png');
const key = new Article('key', null, tait, false, 'key.png');
const sword = new Article('sword', null, tait, true, ['sword1.png', 'sword2.png', 'sword3.png', 'sword4.png']);
const shield = new Article('shield', null, tait, true, 'shield.png');
const hole1 = new Article('hole1', null, tait, false, 'hole.png');
const hole2 = new Article('hole2', null, tait, false, 'hole.png');
const openLock = new Article('openLock', null, tait, true, 'lock.png');
const closedLock = new Article('closedLock', null, tait, false, 'lock.png');
const box1 = new Box("box1", tait, null);
const box2 = new Box("box2", tait, null);

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
const levels = [
   {
      point: { x: 2, y: 3 },
      fn: "setBottomPosition",
      objs: () => {
         enemy.point = { x: 0, y: 0, };
         rock1.point = { x: 1, y: 0, };
         rock2.point = { x: 2, y: 0, };
         key.point = { x: 3, y: 0, };
         sword.point = { x: 4, y: 0, };
         shield.point = { x: 0, y: 1, };
         hole1.point = { x: 1, y: 1, };
         hole2.point = { x: 2, y: 1, };
         openLock.point = { x: 3, y: 1, };
         closedLock.point = { x: 4, y: 1, };
         box1.point = { x: 2, y: 3 };
         box2.point = { x: 3, y: 3 };
      }
   },
   {
      point: { x: 1, y: 3 },
      fn: 'setRightPosition',
      objs: () => {
         enemy.point = { x: 2, y: 2, };
         rock2.point = { x: 3, y: 0, };
         key.point = { x: 3, y: 3, };
         sword.point = { x: 3, y: 2, };
         shield.point = { x: 1, y: 4, };
         hole1.point = { x: 3, y: 3, };
         hole2.point = { x: 4, y: 2, };
         openLock.point = { x: 2, y: 4, };
         closedLock.point = { x: 2, y: 3, };
         box1.point = { x: 4, y: 1 };
         box2.point = { x: 1, y: 0 };
      }
   }
];

export { levels, articles, place, tait };