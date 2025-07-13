
class touchMove {
   events = { left: [], right: [], top: [], bottom: [], end: [] };
   static instance = null;

   static getInstance() {
      if (!this.instance) {
         this.instance = new touchMove();
      }
      return this.instance;
   }

   constructor() {
      let startX = 0;
      let startY = 0;
      const threshold = 1;

      document.addEventListener('touchstart', (event) => {
         startX = event.touches[0].clientX;
         startY = event.touches[0].clientY;
      });

      document.addEventListener('touchmove', (event) => {
         event.preventDefault();

         const currentX = event.touches[0].clientX;
         const currentY = event.touches[0].clientY;

         const totalDeltaX = currentX - startX;
         const totalDeltaY = currentY - startY;

         if (Math.abs(totalDeltaX) > Math.abs(totalDeltaY) && Math.abs(totalDeltaX) > threshold) {
            if (totalDeltaX > 0) {
               this.events.right.forEach(eventCallback => eventCallback(totalDeltaX));
            } else {
               this.events.left.forEach(eventCallback => eventCallback(totalDeltaX));
            }
         } else if (Math.abs(totalDeltaY) > Math.abs(totalDeltaX) && Math.abs(totalDeltaY) > threshold) {
            if (totalDeltaY > 0) {
               this.events.bottom.forEach(eventCallback => eventCallback(totalDeltaY));
            } else {
               this.events.top.forEach(eventCallback => eventCallback(totalDeltaY));
            }
         }
      });

      document.addEventListener('touchend', (event) => {
         this.events.end.forEach(eventCallback => eventCallback());
      });
   }

   addEvent(fn, type) {
      const eventsType = this.events[type];
      if (eventsType) {
         eventsType.push(fn);
      }
   }

   removeEvent(fn, type) {
      const eventsType = this.events[type];
      if (eventsType) {
         const index = eventsType.findIndex((event) => event === fn);
         if (index > -1) {
            eventsType.splice(index, 1);
         }
      }
   }
}

const touch = touchMove.getInstance();

const wd = document.querySelector("#wd");
const wd2 = document.querySelector("#wd2");
const pj = document.querySelector("#pj");
const swordOn = document.querySelector("#sword-on");
const shieldOn = document.querySelector("#shield-on");
const count = document.querySelector("#count");
const playerInput = document.querySelector("#player-input");

const enemy = document.querySelector("#enemy");
const rock1 = document.querySelector("#rock1");
const rock2 = document.querySelector("#rock2");
const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const key = document.querySelector("#key");
const sword = document.querySelector("#sword");
const shield = document.querySelector("#shield");
const diamon = document.querySelector("#diamon");
const openLock = document.querySelector("#open-lock");
const closedLock = document.querySelector("#closed-lock");

shieldOn.style.opacity = "0";
swordOn.style.opacity = "0";

let positionX = 0;
let positionY = 0;
let state = null;

const right1 = (pX, pY) => `translateZ(27px) translateY(${50 * pY}px) translateX(${50 * pX}px)`;
const right2 = (pX, pY) => `translateZ(35px) translateY(${50 * pY}px) translateX(${(50 * pX) + 25}px)`;
const right3 = (pX, pY) => `translateZ(27px) translateY(${50 * pY}px) translateX(${(50 * pX) + 50}px)`;

const left1 = (pX, pY) => `translateZ(27px) translateY(${50 * pY}px) translateX(${50 * pX}px)`;
const left2 = (pX, pY) => `translateZ(35px) translateY(${50 * pY}px) translateX(${(50 * pX) - 25}px)`;
const left3 = (pX, pY) => `translateZ(27px) translateY(${50 * pY}px) translateX(${(50 * pX) - 50}px)`;

const top1 = (pX, pY) => `translateZ(27px) translateY(${50 * pY}px) translateX(${50 * pX}px)`;
const top2 = (pX, pY) => `translateZ(35px) translateY(${(50 * pY) - 25}px) translateX(${50 * pX}px)`;
const top3 = (pX, pY) => `translateZ(27px) translateY(${(50 * pY) - 50}px) translateX(${50 * pX}px)`;

const bottom1 = (pX, pY) => `translateZ(27px) translateY(${50 * pY}px) translateX(${50 * pX}px)`;
const bottom2 = (pX, pY) => `translateZ(35px) translateY(${(50 * pY) + 25}px) translateX(${50 * pX}px)`;
const bottom3 = (pX, pY) => `translateZ(27px) translateY(${(50 * pY) + 50}px) translateX(${50 * pX}px)`;

let transform11 = {
   na: "transform11",
   key: `rotateZ(0deg) rotateY(0deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform61;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(0deg) rotateY(45deg) rotateX(0deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         state = transform41;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(0deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(0deg) rotateY(-90deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         state = transform21;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(45deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         state = transform31;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
         ];
      },
   }
};
let transform12 = {
   na: "transform12",
   key: `rotateZ(90deg) rotateY(0deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform22;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(45deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         state = transform32;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
         ];
      },
      top: () => {
         state = transform42;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg)   rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(90deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         state = transform62;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(90deg) rotateY(45deg) rotateX(0deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform13 = {
   na: "transform13",
   key: `rotateZ(180deg) rotateY(0deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform43;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(180deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         state = transform63;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(180deg) rotateY(45deg) rotateX(0deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         state = transform33;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
         ];
      },
      bottom: () => {
         state = transform23;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(45deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
   }
};
let transform14 = {
   na: "transform14",
   key: `rotateZ(270deg) rotateY(0deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform34;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
         ];
      },
      left: () => {
         state = transform24;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(45deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         state = transform64;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(270deg) rotateY45deg) rotateX(0deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         state = transform44;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(270deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)` },
         ];
      },
   }
};

////////////////

let transform21 = {
   na: "transform21",
   key: `rotateZ(0deg) rotateY(0deg) rotateX(90deg)`,
   moves: {
      right: () => {
         state = transform64;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(0deg) rotateY(45deg) rotateX(90deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(0deg) rotateY(90deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         state = transform42;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(0deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(0deg) rotateY(-90deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         state = transform53;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(135deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(180deg)` },
         ];
      },
      bottom: () => {
         state = transform61;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(45deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform22 = {
   na: "transform22",
   key: `rotateZ(90deg) rotateY(0deg) rotateX(90deg)`,
   moves: {
      right: () => {
         state = transform54;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(135deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(180deg)` },
         ];
      },
      left: () => {
         state = transform12;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(45deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         state = transform43;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(90deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(90deg) rotateY(-90deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         state = transform61;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(90deg) rotateY(45deg) rotateX(90deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(90deg) rotateY(90deg) rotateX(90deg)` },
         ];
      },
   }
};
let transform23 = {
   na: "transform23",
   key: `rotateZ(180deg) rotateY(0deg) rotateX(90deg)`,
   moves: {
      right: () => {
         state = transform44;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(180deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(180deg) rotateY(-90deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         state = transform62;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(180deg) rotateY(45deg) rotateX(90deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(180deg) rotateY(90deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         state = transform13;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(45deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         state = transform51;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(135deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(180deg)` },
         ];
      },
   }
};
let transform24 = {
   na: "transform24",
   key: `rotateZ(270deg) rotateY(0deg) rotateX(90deg)`,
   moves: {
      right: () => {
         state = transform14;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(-135deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(-180deg)` },
         ];
      },
      left: () => {
         state = transform52;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(-45deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         state = transform63;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(270deg) rotateY(45deg) rotateX(90deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(270deg) rotateY(90deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         state = transform41;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(270deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(270deg) rotateY(-90deg) rotateX(90deg)` },
         ];
      },
   }
};

////////////////

let transform31 = {
   na: "transform31",
   key: `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)`,
   moves: {
      right: () => {
         state = transform62;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(0deg) rotateY(45deg) rotateX(-90deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(0deg) rotateY(90deg) rotateX(-90deg)` },
         ];
      },
      left: () => {
         state = transform44;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(0deg) rotateY(-45deg) rotateX(-90deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(0deg) rotateY(-90deg) rotateX(-90deg)` },
         ];
      },
      top: () => {
         state = transform11;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         state = transform53;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(-135deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(-180deg)` },
         ];
      },
   }
};
let transform32 = {
   na: "transform32",
   key: `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)`,
   moves: {
      right: () => {
         state = transform12;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         state = transform54;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(-135deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(-180deg)` },
         ];
      },
      top: () => {
         state = transform41;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(90deg) rotateY(-45deg) rotateX(-90deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(90deg) rotateY(-90deg) rotateX(-90deg)` },
         ];
      },
      bottom: () => {
         state = transform63;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(90deg) rotateY(45deg) rotateX(-90deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(90deg) rotateY(90deg) rotateX(-90deg)` },
         ];
      },
   }
};
let transform33 = {
   na: "transform33",
   key: `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)`,
   moves: {
      right: () => {
         state = transform42;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(180deg) rotateY(-45deg) rotateX(-90deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(180deg) rotateY(-90deg) rotateX(-90deg)` },
         ];
      },
      left: () => {
         state = transform64;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(180deg) rotateY(45deg) rotateX(-90deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(180deg) rotateY(90deg) rotateX(-90deg)` },
         ];
      },
      top: () => {
         state = transform51;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(-135deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(-180deg)` },
         ];
      },
      bottom: () => {
         state = transform13;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform34 = {
   na: "transform34",
   key: `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)`,
   moves: {
      right: () => {
         state = transform52;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(-135deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(-180deg)` },
         ];
      },
      left: () => {
         state = transform14;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         state = transform61;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(270deg) rotateY(45deg) rotateX(-90deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(270deg) rotateY(90deg) rotateX(-90deg)` },
         ];
      },
      bottom: () => {
         state = transform43;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(270deg) rotateY(-45deg) rotateX(-90deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(270deg) rotateY(-90deg) rotateX(-90deg)` },
         ];
      },
   }
};

////////////////

let transform41 = {
   na: "transform41",
   key: `rotateZ(0deg) rotateY(-90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform11;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(0deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(0deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(0deg) rotateY(0deg)   rotateX(0deg)` },
         ];
      },
      left: () => {
         state = transform51;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(0deg) rotateY(-90deg)  rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(0deg) rotateY(-135deg) rotateX(0deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(0deg) rotateY(-180deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         state = transform24;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(-90deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(-90deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(-90deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         state = transform32;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(-90deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(-90deg) rotateY(-135deg) rotateX(90deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(-90deg) rotateY(-180deg) rotateX(90deg)` },
         ];
      },
   }
};
let transform42 = {
   na: "transform42",
   key: `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform21;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(0deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(0deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         state = transform33;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(0deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(0deg) rotateY(-135deg) rotateX(90deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(0deg) rotateY(-180deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         state = transform52;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(90deg) rotateY(-135deg) rotateX(0deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(90deg) rotateY(-180deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         state = transform12;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(90deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform43 = {
   na: "transform43",
   key: `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform53;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(180deg) rotateY(-135deg) rotateX(0deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(180deg) rotateY(-180deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         state = transform13;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(180deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         state = transform34;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(90deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(90deg) rotateY(-135deg) rotateX(90deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(90deg) rotateY(-180deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         state = transform22;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(90deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(90deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
   }
};
let transform44 = {
   na: "transform44",
   key: `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform31;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(180deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(180deg) rotateY(-135deg) rotateX(90deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(180deg) rotateY(-180deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         state = transform23;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(180deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(180deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         state = transform14;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(270deg) rotateY(-55deg)rotateX(0deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         state = transform54;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(270deg) rotateY(-135deg) rotateX(0deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(270deg) rotateY(-180deg) rotateX(0deg)` },
         ];
      },
   }
};

////////////////

let transform51 = {
   na: "transform51",
   key: `rotateZ(0deg) rotateY(180deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform41;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
            { transform: right2(positionX, positionY) + `rotateZ(0deg) rotateY(225deg) rotateX(0deg )` },
            { transform: right3(positionX, positionY) + `rotateZ(0deg) rotateY(270deg) rotateX(0deg )` },
         ];
      },
      left: () => {
         state = transform61;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
            { transform: left2(positionX, positionY) + `rotateZ(0deg) rotateY(135deg) rotateX(0deg )` },
            { transform: left3(positionX, positionY) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg )` },
         ];
      },
      top: () => {
         state = transform23;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
            { transform: top2(positionX, positionY) + `rotateZ(0deg) rotateY(180deg) rotateX(-45deg )` },
            { transform: top3(positionX, positionY) + `rotateZ(0deg) rotateY(180deg) rotateX(-90deg )` },
         ];
      },
      bottom: () => {
         state = transform33;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
            { transform: bottom2(positionX, positionY) + `rotateZ(0deg) rotateY(180deg) rotateX(45deg )` },
            { transform: bottom3(positionX, positionY) + `rotateZ(0deg) rotateY(180deg) rotateX(90deg )` },
         ];
      },
   }
};
let transform52 = {
   na: "transform52",
   key: `rotateZ(90deg) rotateY(180deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform24;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(-45deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
         ];
      },
      left: () => {
         state = transform34;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(45deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         state = transform62;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(90deg) rotateY(135deg) rotateX(0deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         state = transform42;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(90deg) rotateY(225deg) rotateX(0deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(90deg) rotateY(270deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform53 = {
   na: "transform53",
   key: `rotateZ(180deg) rotateY(180deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform63;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(180deg) rotateY(135deg) rotateX(0deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         state = transform43;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(180deg) rotateY(225deg) rotateX(0deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(180deg) rotateY(270deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         state = transform31;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(180deg) rotateY(180deg) rotateX(45deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(180deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         state = transform21;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(180deg) rotateY(180deg) rotateX(-45deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(180deg) rotateY(180deg) rotateX(-90deg)` },
         ];
      },
   }
};
let transform54 = {
   na: "transform54",
   key: `rotateZ(270deg) rotateY(180deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform32;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(270deg) rotateY(180deg) rotateX(45deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(270deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         state = transform22;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(270deg) rotateY(180deg) rotateX(-45deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(270deg) rotateY(180deg) rotateX(-90deg)` },
         ];
      },
      top: () => {
         state = transform44;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(270deg) rotateY(225deg) rotateX(0deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(270deg) rotateY(270deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         state = transform64;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(270deg) rotateY(135deg) rotateX(0deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
   }
};

////////////////

let transform61 = {
   na: "transform61",
   key: `rotateZ(0deg) rotateY(90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform51;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(0deg) rotateY(135deg) rotateX(0deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         state = transform11;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(0deg) rotateY(45deg) rotateX(0deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         state = transform22;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(90deg) rotateY(90deg) rotateX(90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(90deg) rotateY(45deg) rotateX(90deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         state = transform34;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(90deg) rotateY(90deg) rotateX(90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(90deg) rotateY(135deg) rotateX(90deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
   }
};
let transform62 = {
   na: "transform62",
   key: `rotateZ(90deg) rotateY(90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform23;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(180deg) rotateY(90deg) rotateX(90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(180deg) rotateY(45deg) rotateX(90deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         state = transform31;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(180deg) rotateY(90deg) rotateX(90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(180deg) rotateY(135deg) rotateX(90deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(180deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         state = transform12;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(90deg) rotateY(45deg) rotateX(0deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         state = transform52;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(90deg) rotateY(130deg) rotateX(0deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform63 = {
   na: "transform63",
   key: `rotateZ(180deg) rotateY(90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform13;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(180deg) rotateY(45deg) rotateX(0deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         state = transform53;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(180deg) rotateY(135deg) rotateX(0deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         state = transform32;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(90deg) rotateY(90deg) rotateX(-90deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(90deg) rotateY(45deg) rotateX(-90deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
         ];
      },
      bottom: () => {
         state = transform24;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(90deg) rotateY(90deg) rotateX(-90deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(90deg) rotateY(135deg) rotateX(-90deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
         ];
      },
   }
};
let transform64 = {
   na: "transform64",
   key: `rotateZ(270deg) rotateY(90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         state = transform33;
         return [
            { transform: right1(positionX, positionY) + `rotateZ(0deg) rotateY(90deg) rotateX(90deg)` },
            { transform: right2(positionX, positionY) + `rotateZ(0deg) rotateY(135deg) rotateX(90deg)` },
            { transform: right3(positionX, positionY) + `rotateZ(0deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         state = transform21;
         return [
            { transform: left1(positionX, positionY) + `rotateZ(0deg) rotateY(90deg) rotateX(90deg)` },
            { transform: left2(positionX, positionY) + `rotateZ(0deg) rotateY(45deg) rotateX(90deg)` },
            { transform: left3(positionX, positionY) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         state = transform54;
         return [
            { transform: top1(positionX, positionY) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
            { transform: top2(positionX, positionY) + `rotateZ(270deg) rotateY(135deg) rotateX(0deg)` },
            { transform: top3(positionX, positionY) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         state = transform14;
         return [
            { transform: bottom1(positionX, positionY) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
            { transform: bottom2(positionX, positionY) + `rotateZ(270deg) rotateY(45deg) rotateX(0deg)` },
            { transform: bottom3(positionX, positionY) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
   }
};

state = transform11;

pj.style.top = `-4px`;
pj.style.left = `-4px`;
pj.style.transform = `translateZ(27px) translateX(${50 * positionX}px) translateY(${50 * positionY}px) ${state.key}`;

enemy.style.top = `10px`;
enemy.style.left = `18px`;
enemy.style.transform = `translateZ(27px) translateX(${50 * 4}px) translateY(${50 * 0}px)`;

rock1.style.top = `10px`;
rock1.style.left = `18px`;
rock1.style.transform = `translateZ(27px) translateX(${50 * 0}px) translateY(${50 * 2}px)`;

rock2.style.top = `10px`;
rock2.style.left = `18px`;
rock2.style.transform = `translateZ(27px) translateX(${50 * 0}px) translateY(${50 * 3}px)`;

box1.style.top = `10px`;
box1.style.left = `10px`;
box1.style.transform = `translateZ(27px) translateX(${50 * 2}px) translateY(${50 * 0}px)`;

box2.style.top = `10px`;
box2.style.left = `10px`;
box2.style.transform = `translateZ(27px) translateX(${50 * 1}px) translateY(${50 * 0}px)`;

key.style.top = `10px`;
key.style.left = `18px`;
key.style.transform = `translateZ(27px) translateX(${50 * 1}px) translateY(${50 * 3}px)`;

sword.style.top = `10px`;
sword.style.left = `18px`;
sword.style.transform = `translateZ(27px) translateX(${50 * 2}px) translateY(${50 * 2}px)`;

shield.style.top = `10px`;
shield.style.left = `18px`;
shield.style.transform = `translateZ(27px) translateX(${50 * 1}px) translateY(${50 * 4}px)`;

diamon.style.top = `10px`;
diamon.style.left = `18px`;
diamon.style.transform = `translateZ(27px) translateX(${50 * 1}px) translateY(${50 * 3}px)`;

openLock.style.top = `10px`;
openLock.style.left = `18px`;
openLock.style.transform = `translateZ(27px) translateX(${50 * 2}px) translateY(${50 * 3}px)`;

closedLock.style.top = `10px`;
closedLock.style.left = `18px`;
closedLock.style.transform = `translateZ(27px) translateX(${50 * 2}px) translateY(${50 * 3}px)`;

count.innerHTML = `x = ${positionX} y = ${positionY} st: ${state.na} `;

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


touch.addEvent((value) => {
   const opcionesDeTemporizacion = {
      duration: 1000,
      iterations: 1,
      easing: 'ease-in-out',
      fill: 'forwards'
   };
   let keyframesDeAnimacion = [];


   if (positionX < 4 && rightAnimation === true) {
      rightAnimation = false;
      keyframesDeAnimacion = state.moves.right();
      positionX += 1;
   }

   if (positionX > 0 && leftAnimation === true) {
      leftAnimation = false;
      keyframesDeAnimacion = state.moves.left();
      positionX -= 1;
   }

   if (positionY < 3 && topAnimation === true) {
      topAnimation = false;
      keyframesDeAnimacion = state.moves.bottom();
      positionY += 1;
   }

   if (positionY > 0 && bottomAnimation === true) {
      bottomAnimation = false;
      keyframesDeAnimacion = state.moves.top();
      positionY -= 1;
   }

   count.innerHTML = `x = ${positionX} y = ${positionY} st: ${state.na} `;

   pj.animate(keyframesDeAnimacion, opcionesDeTemporizacion);
}, 'end');

// Notas adicionales:
// - Añade `touch - action: none; ` en el CSS del elemento que rotas para evitar el scroll del navegador.
touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerX(value);
   } else {
      platformX += value * placeRotationSensitivity;
      wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${platformY}deg) rotateZ(${platformX}deg)`;
      wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${platformY}deg) rotateZ(${platformX}deg)`;
   }
}, 'right');

touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerX(value);
   } else {
      platformX += value * placeRotationSensitivity;
      wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${platformY}deg) rotateZ(${platformX}deg)`;
      wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${platformY}deg) rotateZ(${platformX}deg)`;
   }
}, 'left');

touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerY(value);
   } else {
      platformY += value * placeRotationSensitivity;

      if (platformY > -20 && platformY < 0) {
         // wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
         //          wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
      }
   }
}, 'top');

touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerY(value);
   } else {
      platformY += value * placeRotationSensitivity;

      if (platformY > -20 && platformY < 0) {
         // wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
         //          wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
      }
   }
}, 'bottom');





