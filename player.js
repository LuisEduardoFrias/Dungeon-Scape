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


export class Player {
   _point = { x: 0, y: 0 };
   _obj = null;
   _hasKey = false;
   _state = null;
   _shieldOn = null;
   _swordOn = null;

   #transform11 = {
      name: "transform11",
      key: `rotateZ(0deg) rotateY(0deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = transform61;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(45deg) rotateX(0deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = transform41;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = transform21;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(45deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         bottom: () => {
            this._state = transform31;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
            ];
         },
      }
   };
   #transform12 = {
      name: "transform12",
      key: `rotateZ(90deg) rotateY(0deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = transform22;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(45deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = transform32;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            ];
         },
         top: () => {
            this._state = transform42;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg)   rotateX(0deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = transform62;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(45deg) rotateX(0deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
      }
   };
   #transform13 = {
      name: "transform13",
      key: `rotateZ(180deg) rotateY(0deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = transform43;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = transform63;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(45deg) rotateX(0deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = transform33;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
            ];
         },
         bottom: () => {
            this._state = transform23;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(45deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
      }
   };
   #transform14 = {
      name: "transform14",
      key: `rotateZ(270deg) rotateY(0deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = transform34;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
            ];
         },
         left: () => {
            this._state = transform24;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(45deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = transform64;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(270deg) rotateY45deg) rotateX(0deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = transform44;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(270deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)` },
            ];
         },
      }
   };

   ////////////////

   #transform21 = {
      name: "transform21",
      key: `rotateZ(0deg) rotateY(0deg) rotateX(90deg)`,
      moves: {
         right: () => {
            this._state = transform64;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(45deg) rotateX(90deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = transform42;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = transform53;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(135deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(180deg)` },
            ];
         },
         bottom: () => {
            this._state = transform11;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(45deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
      }
   };
   #transform22 = {
      name: "transform22",
      key: `rotateZ(90deg) rotateY(0deg) rotateX(90deg)`,
      moves: {
         right: () => {
            this._state = transform54;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(135deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(180deg)` },
            ];
         },
         left: () => {
            this._state = transform12;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(45deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = transform43;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(90deg)` },
            ];
         },
         bottom: () => {
            this._state = transform61;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(45deg) rotateX(90deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(90deg)` },
            ];
         },
      }
   };
   #transform23 = {
      name: "transform23",
      key: `rotateZ(180deg) rotateY(0deg) rotateX(90deg)`,
      moves: {
         right: () => {
            this._state = transform44;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = transform62;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(45deg) rotateX(90deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = transform13;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(45deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = transform51;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(135deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(180deg)` },
            ];
         },
      }
   };
   #transform24 = {
      name: "transform24",
      key: `rotateZ(270deg) rotateY(0deg) rotateX(90deg)`,
      moves: {
         right: () => {
            this._state = transform14;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-135deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-180deg)` },
            ];
         },
         left: () => {
            this._state = transform52;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-45deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = transform63;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(270deg) rotateY(45deg) rotateX(90deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(270deg) rotateY(90deg) rotateX(90deg)` },
            ];
         },
         bottom: () => {
            this._state = transform41;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(270deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(90deg)` },
            ];
         },
      }
   };

   ////////////////

   #transform31 = {
      na: "transform31",
      key: `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)`,
      moves: {
         right: () => {
            this._state = transform62;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(0deg) rotateY(45deg) rotateX(-90deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(0deg) rotateY(90deg) rotateX(-90deg)` },
            ];
         },
         left: () => {
            this._state = transform44;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(-90deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(-90deg)` },
            ];
         },
         top: () => {
            this._state = transform11;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = transform53;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-135deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-180deg)` },
            ];
         },
      }
   };
   #transform32 = {
      na: "transform32",
      key: `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)`,
      moves: {
         right: () => {
            this._state = transform12;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = transform54;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-135deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-180deg)` },
            ];
         },
         top: () => {
            this._state = transform41;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(-90deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(-90deg)` },
            ];
         },
         bottom: () => {
            this._state = transform63;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(90deg) rotateY(45deg) rotateX(-90deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(90deg) rotateY(90deg) rotateX(-90deg)` },
            ];
         },
      }
   };
   #transform33 = {
      na: "transform33",
      key: `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)`,
      moves: {
         right: () => {
            this._state = transform42;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(-90deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(-90deg)` },
            ];
         },
         left: () => {
            this._state = transform64;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(180deg) rotateY(45deg) rotateX(-90deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(180deg) rotateY(90deg) rotateX(-90deg)` },
            ];
         },
         top: () => {
            this._state = transform51;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-135deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-180deg)` },
            ];
         },
         bottom: () => {
            this._state = transform13;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
      }
   };
   #transform34 = {
      na: "transform34",
      key: `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)`,
      moves: {
         right: () => {
            this._state = transform52;
            return [
               { transform: right1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: right2(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-135deg)` },
               { transform: right3(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-180deg)` },
            ];
         },
         left: () => {
            this._state = transform14;
            return [
               { transform: left1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: left2(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: left3(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = transform61;
            return [
               { transform: top1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: top2(pj.x, pj.y) + `rotateZ(270deg) rotateY(45deg) rotateX(-90deg)` },
               { transform: top3(pj.x, pj.y) + `rotateZ(270deg) rotateY(90deg) rotateX(-90deg)` },
            ];
         },
         bottom: () => {
            this._state = transform43;
            return [
               { transform: bottom1(pj.x, pj.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: bottom2(pj.x, pj.y) + `rotateZ(270deg) rotateY(-45deg) rotateX(-90deg)` },
               { transform: bottom3(pj.x, pj.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(-90deg)` },
            ];
         },
      }
   };

   //////////////
   
   constructor(element) {
      element.appendChild(this.createElement());
      element.style.top = `0px`;
      element.style.left = `0px`;
      this._obj = element;
      //this.shieldOn = true;
      //this.swordOn = true;

      return this._obj;
   }

   createElement() {
      const div = document.createElement('div');
      div.setAttribute('id', 'box');
      div.style.position = 'absolute';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.display = 'flex';
      div.style.justifyContent = 'center';
      div.style.alignItems = 'center';
      div.style.transformOrigin = 'center';
      div.style.transformStyle = 'preserve-3d';
      div.style.transform = 'translateZ(27px) rotateY(0deg) rotateZ(90deg) rotateX(0deg)';

      for (let i = 1; i <= 6; i++) {
         const nDiv = document.createElement('div');
         nDiv.style.backgroundImage = 'url("./images/box.png")';
         nDiv.style.backgroundSize = 'cover';
         nDiv.style.transformOrigin = 'center';
         nDiv.style.width = '50px';
         nDiv.style.height = '50px';
         nDiv.style.position = 'absolute';
         nDiv.style.transformStyle = 'preserve-3d';
         nDiv.style.backgroundColor = 'gray';

         if (i === 1) {
            /***   side sword  ****/
            nDiv.style.backgroundImage = 'url("./images/pj-side.png")';
            nDiv.style.transform = 'rotateX(90deg) translateZ(Calc(50 / 2))';

            const n2Div = document.createElement('div');
            n2Div.setAttribute('id', 'sword-shadow');
            n2Div.innerHTML = '🗡';

            const n1Div = document.createElement('div');
            n1Div.setAttribute('id', 'sword-content-shadow');
            n1Div.appendChild(n2Div);
            nDiv.appendChild(n1Div);

            const n3Div = document.createElement('div');
            n3Div.setAttribute('id', 'sword-on');
            n3Div.dataset.isAdd = false;
            n3Div.innerHTML = '🗡';
            this._swordOn = n3Div;
            nDiv.appendChild(n3Div);
         } else if (i === 2) {
            /***   top  ****/
            nDiv.style.backgroundImage = 'url("./images/pj-top.png")';
            nDiv.style.transform = 'rotateZ(-90deg) translateZ(Calc(50 / 2))';
         } else if (i === 3) {
            /***   pj-from.png  ****/
            nDiv.style.backgroundImage = 'url("./images/pj-from.png")';
            nDiv.style.transform = 'rotatey(90deg) rotateZ(-90deg) translatez(Calc(50 / 2))';
         } else if (i === 4) {
            /***   drown  ****/
            //nDiv.style.backgroundImage = 'url("./images/pj-drown.png")';
            nDiv.style.transform = 'rotatey(180deg) translatez(Calc(50 / 2))';
         } else if (i === 5) {
            /***   bottom  ****/
            nDiv.style.backgroundImage = 'url("./images/pj-bottom.png")';
            nDiv.style.transform = 'rotatey(-90deg) rotateZ(90deg) translatez(Calc(50 / 2))';
         } else if (i === 6) {
            /***   side shild  ****/
            nDiv.style.backgroundImage = 'url("./images/pj-side.png")';
            nDiv.style.transform = 'rotatey(0deg) rotatex(-90deg) translatez(Calc(50 / 2))';

            const n2Div = document.createElement('div');
            n2Div.setAttribute('id', 'shield-shadow');
            //  n2Div.innerHTML = '🗡';

            const n1Div = document.createElement('div');
            n1Div.setAttribute('id', 'shield-content-shadow');
            n1Div.appendChild(n2Div);
            nDiv.appendChild(n1Div);

            const n3Div = document.createElement('div');
            n3Div.setAttribute('id', 'shield-on');
            n3Div.dataset.isAdd = false;
            //  n3Div.innerHTML = '🗡';
            this._shieldOn = n3Div;
            nDiv.appendChild(n3Div);
         }
         div.appendChild(nDiv);
      }

      return div;
   }

   get hasKey() {
      return this._hasKey;
   }

   set hasKey(hasKey) {
      this._hasKey = hasKey;
   }

   get state() {
      return this._.state;
   }

   set state(state) {
      this._.state = state;
   }

   get point() {
      return this._.point;
   }

   set point(point) {
      this._.point = point;
      this._.obj.style.top = `${50 * point.x}px`;
      this._.obj.style.left = `${50 * point.y}px`;
      this._.obj.style.transform = `translateZ(27px) ${this._.state.key} `;
   }

   set shieldOn(activate) {
      this._shieldOn.style.opacity = activate ? '1' : '0';
   }

   set swordOn(activate) {
      this._swordOn.style.opacity = activate ? '1' : '0';
   }

   setBottomPosition() { this._state = transform12; }
   setLeftPosition() { this._state = transform13; }
   setTopPosition() { this._state = transform14; }
   setRightPosition() { this._state = transform11; }

}