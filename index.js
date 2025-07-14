
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
//const wd2 = document.querySelector("#//wd2");
const swordOn = document.querySelector("#sword-on");
const shieldOn = document.querySelector("#shield-on");
const count = document.querySelector("#count");
const playerInput = document.querySelector("#player-input");
let level = 0;
let isNextLevel = false;

const pj = {
   hasKey: false,
   obj: document.querySelector("#pj"),
   x: 2,
   y: 3,
   state: null,
};


shieldOn.style.opacity = "0";
swordOn.style.opacity = "0";

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
         pj.state = transform61;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(45deg) rotateX(0deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         pj.state = transform41;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform21;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(45deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform31;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
         ];
      },
   }
};
let transform12 = {
   na: "transform12",
   key: `rotateZ(90deg) rotateY(0deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform22;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(45deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         pj.state = transform32;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
         ];
      },
      top: () => {
         pj.state = transform42;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg)   rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform62;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(45deg) rotateX(0deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform13 = {
   na: "transform13",
   key: `rotateZ(180deg) rotateY(0deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform43;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         pj.state = transform63;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(45deg) rotateX(0deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform33;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform23;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(45deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
   }
};
let transform14 = {
   na: "transform14",
   key: `rotateZ(270deg) rotateY(0deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform34;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
         ];
      },
      left: () => {
         pj.state = transform24;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(45deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         pj.state = transform64;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(270deg) rotateY45deg) rotateX(0deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform44;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(270deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)` },
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
         pj.state = transform64;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(45deg) rotateX(90deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         pj.state = transform42;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         pj.state = transform53;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(135deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(180deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform11;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(45deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform22 = {
   na: "transform22",
   key: `rotateZ(90deg) rotateY(0deg) rotateX(90deg)`,
   moves: {
      right: () => {
         pj.state = transform54;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(135deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(180deg)` },
         ];
      },
      left: () => {
         pj.state = transform12;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(45deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform43;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform61;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(45deg) rotateX(90deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(90deg)` },
         ];
      },
   }
};
let transform23 = {
   na: "transform23",
   key: `rotateZ(180deg) rotateY(0deg) rotateX(90deg)`,
   moves: {
      right: () => {
         pj.state = transform44;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         pj.state = transform62;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(45deg) rotateX(90deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         pj.state = transform13;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(45deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform51;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(135deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(180deg)` },
         ];
      },
   }
};
let transform24 = {
   na: "transform24",
   key: `rotateZ(270deg) rotateY(0deg) rotateX(90deg)`,
   moves: {
      right: () => {
         pj.state = transform14;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-135deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-180deg)` },
         ];
      },
      left: () => {
         pj.state = transform52;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-45deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform63;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(270deg) rotateY(45deg) rotateX(90deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(270deg) rotateY(90deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform41;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(270deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(90deg)` },
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
         pj.state = transform62;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(45deg) rotateX(-90deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(-90deg)` },
         ];
      },
      left: () => {
         pj.state = transform44;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(-90deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(-90deg)` },
         ];
      },
      top: () => {
         pj.state = transform11;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform53;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-135deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-180deg)` },
         ];
      },
   }
};
let transform32 = {
   na: "transform32",
   key: `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)`,
   moves: {
      right: () => {
         pj.state = transform12;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         pj.state = transform54;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-135deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-180deg)` },
         ];
      },
      top: () => {
         pj.state = transform41;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(-90deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(-90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform63;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(45deg) rotateX(-90deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(-90deg)` },
         ];
      },
   }
};
let transform33 = {
   na: "transform33",
   key: `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)`,
   moves: {
      right: () => {
         pj.state = transform42;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(-90deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(-90deg)` },
         ];
      },
      left: () => {
         pj.state = transform64;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(45deg) rotateX(-90deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(-90deg)` },
         ];
      },
      top: () => {
         pj.state = transform51;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-135deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-180deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform13;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform34 = {
   na: "transform34",
   key: `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)`,
   moves: {
      right: () => {
         pj.state = transform52;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-135deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-180deg)` },
         ];
      },
      left: () => {
         pj.state = transform14;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-45deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform61;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(270deg) rotateY(45deg) rotateX(-90deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(270deg) rotateY(90deg) rotateX(-90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform43;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(270deg) rotateY(-45deg) rotateX(-90deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(-90deg)` },
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
         pj.state = transform11;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg)   rotateX(0deg)` },
         ];
      },
      left: () => {
         pj.state = transform51;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(-90deg)  rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(-135deg) rotateX(0deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(-180deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform24;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(-90deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(-90deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(-90deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform32;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(-90deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(-90deg) rotateY(-135deg) rotateX(90deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(-90deg) rotateY(-180deg) rotateX(90deg)` },
         ];
      },
   }
};
let transform42 = {
   na: "transform42",
   key: `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform21;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         pj.state = transform33;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(-135deg) rotateX(90deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(-180deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         pj.state = transform52;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(-135deg) rotateX(0deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(-180deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform12;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform43 = {
   na: "transform43",
   key: `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform53;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(-135deg) rotateX(0deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(-180deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         pj.state = transform13;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(0deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform34;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(-135deg) rotateX(90deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(-180deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform22;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
   }
};
let transform44 = {
   na: "transform44",
   key: `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform31;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(-135deg) rotateX(90deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(-180deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         pj.state = transform23;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(90deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         pj.state = transform14;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(270deg) rotateY(-55deg)rotateX(0deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform54;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(270deg) rotateY(-135deg) rotateX(0deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(270deg) rotateY(-180deg) rotateX(0deg)` },
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
         pj.state = transform41;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
            { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(225deg) rotateX(0deg )` },
            { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(270deg) rotateX(0deg )` },
         ];
      },
      left: () => {
         pj.state = transform61;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
            { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(135deg) rotateX(0deg )` },
            { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform23;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
            { transform: top2(pj.x, pj.y) + `rotateZ(0deg) rotateY(180deg) rotateX(-45deg )` },
            { transform: top3(pj.x, pj.y) + `rotateZ(0deg) rotateY(180deg) rotateX(-90deg )` },
         ];
      },
      bottom: () => {
         pj.state = transform33;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(0deg) rotateY(180deg) rotateX(45deg )` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(0deg) rotateY(180deg) rotateX(90deg )` },
         ];
      },
   }
};
let transform52 = {
   na: "transform52",
   key: `rotateZ(90deg) rotateY(180deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform24;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-45deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
         ];
      },
      left: () => {
         pj.state = transform34;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(45deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         pj.state = transform62;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(135deg) rotateX(0deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform42;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(225deg) rotateX(0deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(270deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform53 = {
   na: "transform53",
   key: `rotateZ(180deg) rotateY(180deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform63;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(135deg) rotateX(0deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         pj.state = transform43;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(225deg) rotateX(0deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(270deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform31;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(180deg) rotateY(180deg) rotateX(45deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(180deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform21;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(180deg) rotateY(180deg) rotateX(-45deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(180deg) rotateY(180deg) rotateX(-90deg)` },
         ];
      },
   }
};
let transform54 = {
   na: "transform54",
   key: `rotateZ(270deg) rotateY(180deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform32;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(270deg) rotateY(180deg) rotateX(45deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(270deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         pj.state = transform22;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(270deg) rotateY(180deg) rotateX(-45deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(270deg) rotateY(180deg) rotateX(-90deg)` },
         ];
      },
      top: () => {
         pj.state = transform44;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(270deg) rotateY(225deg) rotateX(0deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(270deg) rotateY(270deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform64;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(270deg) rotateY(135deg) rotateX(0deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
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
         pj.state = transform51;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(135deg) rotateX(0deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         pj.state = transform11;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(45deg) rotateX(0deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform22;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(90deg )` },
            { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(45deg) rotateX(90deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform34;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(135deg) rotateX(90deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
   }
};
let transform62 = {
   na: "transform62",
   key: `rotateZ(90deg) rotateY(90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform23;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(45deg) rotateX(90deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         pj.state = transform31;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(135deg) rotateX(90deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         pj.state = transform12;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(45deg) rotateX(0deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform52;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(130deg) rotateX(0deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
         ];
      },
   }
};
let transform63 = {
   na: "transform63",
   key: `rotateZ(180deg) rotateY(90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform13;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(45deg) rotateX(0deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
      left: () => {
         pj.state = transform53;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(135deg) rotateX(0deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
         ];
      },
      top: () => {
         pj.state = transform32;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(-90deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(45deg) rotateX(-90deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform24;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(-90deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(135deg) rotateX(-90deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
         ];
      },
   }
};
let transform64 = {
   na: "transform64",
   key: `rotateZ(270deg) rotateY(90deg) rotateX(0deg)`,
   moves: {
      right: () => {
         pj.state = transform33;
         return [
            { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(90deg)` },
            { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(135deg) rotateX(90deg)` },
            { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(180deg) rotateX(90deg)` },
         ];
      },
      left: () => {
         pj.state = transform21;
         return [
            { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(90deg)` },
            { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(45deg) rotateX(90deg)` },
            { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
         ];
      },
      top: () => {
         pj.state = transform54;
         return [
            { transform: top1(pj.x, pj.y) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
            { transform: top2(pj.x, pj.y) + `rotateZ(270deg) rotateY(135deg) rotateX(0deg)` },
            { transform: top3(pj.x, pj.y) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
         ];
      },
      bottom: () => {
         pj.state = transform14;
         return [
            { transform: bottom1(pj.x, pj.y) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
            { transform: bottom2(pj.x, pj.y) + `rotateZ(270deg) rotateY(45deg) rotateX(0deg)` },
            { transform: bottom3(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
         ];
      },
   }
};

const levels = [
   {
      point: { x: 2, y: 3 },
      state: transform12,
      objs: [
         {
            x: 1,
            y: 2,
            name: "enemy",
            disable: true,
            obj: document.querySelector("#enemy")
         },
         {
            x: 2,
            y: 1,
            name: "rock1",
            disable: false,
            obj: document.querySelector("#rock1")
         },
         {
            x: 3,
            y: 1,
            name: " rock2",
            disable: false,
            obj: document.querySelector("#rock2")
         },
         {
            x: 1,
            y: 2,
            name: "box1",
            disable: false,
            obj: document.querySelector("#box1")
         },
         {
            x: 4,
            y: 2,
            name: "box2",
            disable: false,
            obj: document.querySelector("#box2")
         },
         {
            x: 3,
            y: 3,
            name: "key",
            disable: false,
            obj: document.querySelector("#key")
         },
         {
            x: 2,
            y: 2,
            name: "sword",
            disable: true,
            obj: document.querySelector("#sword")
         },
         {
            x: 1,
            y: 4,
            name: "shield",
            disable: true,
            obj: document.querySelector("#shield")
         },
         {
            x: 1,
            y: 3,
            name: "diamon1",
            disable: false,
            obj: document.querySelector("#diamon1")
         },
         {
            x: 1,
            y: 3,
            name: "diamon2",
            disable: false,
            obj: document.querySelector("#diamon2")
         },
         {
            x: 2,
            y: 4,
            name: "openLock",
            disable: true,
            obj: document.querySelector("#open-lock")
         },
         {
            x: 2,
            y: 3,
            name: "closedLock",
            disable: false,
            obj: document.querySelector("#closed-lock")
         },
      ]
   },
   {
      point: { x: 1, y: 3 },
      state: transform11,
      objs: [
         {
            x: 2,
            y: 2,
            name: "enemy",
            disable: false,
            obj: document.querySelector("#enemy")
         },
         {
            x: 1,
            y: 2,
            name: "rock1",
            disable: false,
            obj: document.querySelector("#rock1")
         },
         {
            x: 3,
            y: 0,
            name: " rock2",
            disable: false,
            obj: document.querySelector("#rock2")
         },
         {
            x: 4,
            y: 1,
            name: "box1",
            disable: false,
            obj: document.querySelector("#box1")
         },
         {
            x: 1,
            y: 0,
            name: "box2",
            disable: false,
            obj: document.querySelector("#box2")
         },
         {
            x: 1,
            y: 1,
            name: "key",
            disable: false,
            obj: document.querySelector("#key")
         },
         {
            x: 3,
            y: 2,
            name: "sword",
            disable: false,
            obj: document.querySelector("#sword")
         },
         {
            x: 1,
            y: 4,
            name: "shield",
            disable: true,
            obj: document.querySelector("#shield")
         },
         {
            x: 3,
            y: 3,
            name: "diamon1",
            disable: false,
            obj: document.querySelector("#diamon1")
         },
         {
            x: 4,
            y: 2,
            name: "diamon2",
            disable: false,
            obj: document.querySelector("#diamon2")
         },
         {
            x: 2,
            y: 4,
            name: "openLock",
            disable: true,
            obj: document.querySelector("#open-lock")
         },
         {
            x: 2,
            y: 3,
            name: "closedLock",
            disable: false,
            obj: document.querySelector("#closed-lock")
         },
      ]
   }
];

let points = levels[level].objs;
function nextLevel() {
   level++;
   const obj_level = levels[level];
   pj.x = obj_level.point.x;
   pj.y = obj_level.point.y;
   pj.state = obj_level.state;
   points = obj_level.objs;
   count.innerHTML = `Level ${level + 1}`;

   pj.obj.style.top = `-4px`;
   pj.obj.style.left = `-4px`;
   pj.obj.style.transform = `translateZ(27px) translateX(${50 * pj.x}px) translateY(${50 * pj.y}px) ${pj.state.key} `;

   points.forEach((ele) => {
      ele.obj.style.top = `0px`;
      ele.obj.style.left = `0px`;
      ele.obj.style.opacity = ele.disable ? "0" : "1";
      ele.obj.style.transform = `translateX(${50 * ele.x}px) translateY(${50 * ele.y}px)`;
   })
}
count.innerHTML = `Level ${level + 1}`;

pj.state = transform12;
pj.obj.style.top = `-4px`;
pj.obj.style.left = `-4px`;
pj.obj.style.transform = `translateZ(27px) translateX(${50 * pj.x}px) translateY(${50 * pj.y}px) ${pj.state.key} `;

points.forEach((ele) => {
   ele.obj.style.top = `0px`;
   ele.obj.style.left = `0px`;
   ele.obj.style.opacity = ele.disable ? "0" : "1";
   ele.obj.style.transform = `translateX(${50 * ele.x}px) translateY(${50 * ele.y}px)`;
})

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
   for (let ele of points) {
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

      if (ele.x === x && ele.y === y && ele.disable === false) {
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

               shieldOn.style.opacity = "1";
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

               swordOn.style.opacity = "2";

               return true;
            } else if (ele.disable === true) {
               return true;
            }
         }
         else if (ele.name === 'diamon1' || ele.name === 'diamon2') {
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
}, 'end');

// Notas adicionales:
// - Añade `touch - action: none; ` en el CSS del elemento que rotas para evitar el scroll del navegador.
touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerX(value);
   } else {
      platformX += value * placeRotationSensitivity;
      wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${platformY}deg) rotateZ(${platformX}deg)`;
      //wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
   }
}, 'right');

touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerX(value);
   } else {
      platformX += value * placeRotationSensitivity;
      wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${platformY}deg) rotateZ(${platformX}deg)`;
      //wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
   }
}, 'left');

touch.addEvent((value) => {
   if (playerInput.checked) {
      moverPlayerY(value);
   } else {
      platformY += value * placeRotationSensitivity;

      if (platformY > -20 && platformY < 0) {
         // wd.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
         //          //wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
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
         //          //wd2.style.transform = `perspective(750px) rotateX(70deg) rotateY(${ platformY }deg) rotateZ(${ platformX }deg)`;
      }
   }
}, 'bottom');





