
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
            this._state = this.#transform61;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(45deg) rotateX(0deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform41;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform21;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(45deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform31;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
            ];
         },
      }
   };
   #transform12 = {
      name: "transform12",
      key: `rotateZ(90deg) rotateY(0deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform22;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(45deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform32;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform42;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg)   rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform62;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(45deg) rotateX(0deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
      }
   };
   #transform13 = {
      name: "transform13",
      key: `rotateZ(180deg) rotateY(0deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform43;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform63;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(45deg) rotateX(0deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform33;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform23;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(45deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
      }
   };
   #transform14 = {
      name: "transform14",
      key: `rotateZ(270deg) rotateY(0deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform34;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform24;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(45deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform64;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY45deg) rotateX(0deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform44;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)` },
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
            this._state = this.#transform64;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(45deg) rotateX(90deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(90deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform42;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform53;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(135deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(180deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform11;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(45deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
      }
   };
   #transform22 = {
      name: "transform22",
      key: `rotateZ(90deg) rotateY(0deg) rotateX(90deg)`,
      moves: {
         right: () => {
            this._state = this.#transform54;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(135deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(180deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform12;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(45deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform43;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform61;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(45deg) rotateX(90deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(90deg) rotateX(90deg)` },
            ];
         },
      }
   };
   #transform23 = {
      name: "transform23",
      key: `rotateZ(180deg) rotateY(0deg) rotateX(90deg)`,
      moves: {
         right: () => {
            this._state = this.#transform44;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform62;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(45deg) rotateX(90deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(90deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform13;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(45deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform51;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(135deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(180deg)` },
            ];
         },
      }
   };
   #transform24 = {
      name: "transform24",
      key: `rotateZ(270deg) rotateY(0deg) rotateX(90deg)`,
      moves: {
         right: () => {
            this._state = this.#transform14;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-135deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-180deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform52;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-45deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform63;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(45deg) rotateX(90deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(90deg) rotateX(90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform41;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(90deg)` },
            ];
         },
      }
   };

   ////////////////

   #transform31 = {
      name: "transform31",
      key: `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)`,
      moves: {
         right: () => {
            this._state = this.#transform62;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(45deg) rotateX(-90deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(90deg) rotateX(-90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform44;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(-90deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(-90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform11;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform53;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-135deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(-180deg)` },
            ];
         },
      }
   };
   #transform32 = {
      name: "transform32",
      key: `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)`,
      moves: {
         right: () => {
            this._state = this.#transform12;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform54;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-135deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-180deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform41;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(-90deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(-90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform63;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(45deg) rotateX(-90deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(90deg) rotateX(-90deg)` },
            ];
         },
      }
   };
   #transform33 = {
      name: "transform33",
      key: `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)`,
      moves: {
         right: () => {
            this._state = this.#transform42;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(-90deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(-90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform64;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(45deg) rotateX(-90deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(90deg) rotateX(-90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform51;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-135deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-180deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform13;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
      }
   };
   #transform34 = {
      name: "transform34",
      key: `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)`,
      moves: {
         right: () => {
            this._state = this.#transform52;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-135deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-180deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform14;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-45deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform61;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(45deg) rotateX(-90deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(90deg) rotateX(-90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform43;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(-90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-45deg) rotateX(-90deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(-90deg)` },
            ];
         },
      }
   };

   ////////////////

   #transform41 = {
      name: "transform41",
      key: `rotateZ(0deg) rotateY(-90deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform11;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg)   rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform51;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-90deg)  rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-135deg) rotateX(0deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-180deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform24;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(-90deg) rotateY(-90deg) rotateX(90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(-90deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(-90deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform32;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(-90deg) rotateY(-90deg) rotateX(90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(-90deg) rotateY(-135deg) rotateX(90deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(-90deg) rotateY(-180deg) rotateX(90deg)` },
            ];
         },
      }
   };
   #transform42 = {
      name: "transform42",
      key: `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform21;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform33;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-90deg) rotateX(90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-135deg) rotateX(90deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(-180deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform52;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-135deg) rotateX(0deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-180deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform12;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
      }
   };
   #transform43 = {
      name: "transform43",
      key: `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform53;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-135deg) rotateX(0deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-180deg) rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform13;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(0deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform34;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-135deg) rotateX(90deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-180deg) rotateX(90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform22;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-90deg) rotateX(90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
      }
   };
   #transform44 = {
      name: "transform44",
      key: `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform31;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-135deg) rotateX(90deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-180deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform23;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-90deg) rotateX(90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(-45deg) rotateX(90deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform14;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-55deg)rotateX(0deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform54;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-90deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-135deg) rotateX(0deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(-180deg) rotateX(0deg)` },
            ];
         },
      }
   };

   ////////////////

   #transform51 = {
      name: "transform51",
      key: `rotateZ(0deg) rotateY(180deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform41;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(225deg) rotateX(0deg )` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(270deg) rotateX(0deg )` },
            ];
         },
         left: () => {
            this._state = this.#transform61;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(135deg) rotateX(0deg )` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform23;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(180deg) rotateX(-45deg )` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(180deg) rotateX(-90deg )` },
            ];
         },
         bottom: () => {
            this._state = this.#transform33;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg )` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(180deg) rotateX(45deg )` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(180deg) rotateX(90deg )` },
            ];
         },
      }
   };
   #transform52 = {
      name: "transform52",
      key: `rotateZ(90deg) rotateY(180deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform24;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-45deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform34;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(45deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform62;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(135deg) rotateX(0deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform42;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(225deg) rotateX(0deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(270deg) rotateX(0deg)` },
            ];
         },
      }
   };
   #transform53 = {
      name: "transform53",
      key: `rotateZ(180deg) rotateY(180deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform63;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(135deg) rotateX(0deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform43;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(225deg) rotateX(0deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(270deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform31;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(180deg) rotateX(45deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(180deg) rotateX(90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform21;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(180deg) rotateX(-45deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(180deg) rotateX(-90deg)` },
            ];
         },
      }
   };
   #transform54 = {
      name: "transform54",
      key: `rotateZ(270deg) rotateY(180deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform32;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(180deg) rotateX(45deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(180deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform22;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(180deg) rotateX(-45deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(180deg) rotateX(-90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform44;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(225deg) rotateX(0deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(270deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform64;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(135deg) rotateX(0deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
            ];
         },
      }
   };

   ////////////////

   #transform61 = {
      name: "transform61",
      key: `rotateZ(0deg) rotateY(90deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform51;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(135deg) rotateX(0deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(180deg) rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform11;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(90deg) rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(45deg) rotateX(0deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform22;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(90deg) rotateX(90deg )` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(45deg) rotateX(90deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform34;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(90deg) rotateX(90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(135deg) rotateX(90deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(90deg)` },
            ];
         },
      }
   };
   #transform62 = {
      name: "transform62",
      key: `rotateZ(90deg) rotateY(90deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform23;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(90deg) rotateX(90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(45deg) rotateX(90deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform31;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(90deg) rotateX(90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(135deg) rotateX(90deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(180deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform12;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(45deg) rotateX(0deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform52;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(90deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(130deg) rotateX(0deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(0deg)` },
            ];
         },
      }
   };
   #transform63 = {
      name: "transform63",
      key: `rotateZ(180deg) rotateY(90deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform13;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(45deg) rotateX(0deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform53;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(90deg) rotateX(0deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(135deg) rotateX(0deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(180deg) rotateY(180deg) rotateX(0deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform32;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(90deg) rotateX(-90deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(45deg) rotateX(-90deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(0deg) rotateX(-90deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform24;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(90deg) rotateX(-90deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(135deg) rotateX(-90deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(90deg) rotateY(180deg) rotateX(-90deg)` },
            ];
         },
      }
   };
   #transform64 = {
      name: "transform64",
      key: `rotateZ(270deg) rotateY(90deg) rotateX(0deg)`,
      moves: {
         right: () => {
            this._state = this.#transform33;
            return [
               { transform: right1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(90deg) rotateX(90deg)` },
               { transform: right2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(135deg) rotateX(90deg)` },
               { transform: right3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(180deg) rotateX(90deg)` },
            ];
         },
         left: () => {
            this._state = this.#transform21;
            return [
               { transform: left1(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(90deg) rotateX(90deg)` },
               { transform: left2(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(45deg) rotateX(90deg)` },
               { transform: left3(this._point.x, this._point.y) + `rotateZ(0deg) rotateY(0deg) rotateX(90deg)` },
            ];
         },
         top: () => {
            this._state = this.#transform54;
            return [
               { transform: top1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
               { transform: top2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(135deg) rotateX(0deg)` },
               { transform: top3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(180deg) rotateX(0deg)` },
            ];
         },
         bottom: () => {
            this._state = this.#transform14;
            return [
               { transform: bottom1(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(90deg) rotateX(0deg)` },
               { transform: bottom2(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(45deg) rotateX(0deg)` },
               { transform: bottom3(this._point.x, this._point.y) + `rotateZ(270deg) rotateY(0deg) rotateX(0deg)` },
            ];
         },
      }
   };

   ////////////////

   constructor(parentElement) {
      const mainCubeDiv = document.createElement('div');
      mainCubeDiv.setAttribute('id', 'player-main-cube');
      mainCubeDiv.style.position = 'absolute';
      mainCubeDiv.style.width = '50px';
      mainCubeDiv.style.height = '50px';
      mainCubeDiv.style.top = '0px';
      mainCubeDiv.style.left = '0px';
      mainCubeDiv.style.display = 'flex';
      mainCubeDiv.style.justifyContent = 'center';
      mainCubeDiv.style.alignItems = 'center';
      mainCubeDiv.style.transformOrigin = 'center center';
      mainCubeDiv.style.transformStyle = 'preserve-3d';
      mainCubeDiv.style.transform = 'translateZ(27px) rotateY(0deg) rotateZ(0deg) rotateX(0deg)';

      this._createFaces(mainCubeDiv);

      parentElement.appendChild(mainCubeDiv);

      this._obj = mainCubeDiv;
   }

   _createFaces(cubeDiv) {
      for (let i = 1; i <= 6; i++) {
         const nDiv = document.createElement('div');
         nDiv.style.backgroundSize = 'cover';
         nDiv.style.width = '50px';
         nDiv.style.height = '50px';
         nDiv.style.position = 'absolute';
         nDiv.style.backgroundColor = '#979797';
         nDiv.style.transformStyle = 'preserve-3d';

         if (i === 1) {
            /***   side sword  ****/
            nDiv.style.backgroundImage = 'url("./images/pj-side.png")';
            nDiv.style.transform = 'rotateX(90deg) translateZ(25px)';

            const n2Div = document.createElement('div');
            n2Div.setAttribute('id', 'sword-shadow');
            n2Div.innerHTML = '🗡';

            const n1Div = document.createElement('div');
            n1Div.setAttribute('id', 'sword-content-shadow');
            n1Div.appendChild(n2Div);
            nDiv.appendChild(n1Div);

            const n3Div = document.createElement('div');
            n3Div.setAttribute('id', 'sword-on');
            n3Div.style.backgroundImage = 'url("./images/sword.png")';
            n3Div.dataset.isAdd = "false";
            n3Div.style.transform = 'rotateZ(45deg)';

            this._swordOn = n3Div;
            nDiv.appendChild(n3Div);
         } else if (i === 2) {
            /***   top  ****/
            nDiv.style.backgroundImage = 'url("./images/pj-top.png")';
            nDiv.style.transform = 'rotateZ(-90deg) translateZ(25px)';
         } else if (i === 3) {
            /***   pj-from.png  ****/
            nDiv.style.backgroundImage = 'url("./images/pj-from.png")';
            nDiv.style.transform = 'rotatey(90deg) rotateZ(-90deg) translatez(25px)';
         } else if (i === 4) {
            /***   drown  ****/
            //nDiv.style.backgroundImage = 'url("./images/pj-drown.png")';
            nDiv.style.transform = 'rotatey(180deg) translatez(25px)';
         } else if (i === 5) {
            /***   bottom  ****/
            nDiv.style.backgroundImage = 'url("./images/pj-bottom.png")';
            nDiv.style.transform = 'rotatey(-90deg) rotateZ(90deg) translatez(25px)';
         } else if (i === 6) {
            /***   side shild  ****/
            nDiv.style.backgroundImage = 'url("./images/shield.png")';
            nDiv.style.transform = 'rotatey(0deg) rotatex(-90deg) translatez(25px)';

            const n2Div = document.createElement('div');
            n2Div.setAttribute('id', 'shield-shadow');
            //  n2Div.innerHTML = '🗡';

            const n1Div = document.createElement('div');
            n1Div.setAttribute('id', 'shield-content-shadow');
            n1Div.appendChild(n2Div);
            nDiv.appendChild(n1Div);

            const n3Div = document.createElement('div');
            n3Div.setAttribute('id', 'shield-on');
            n3Div.dataset.isAdd = "false";
            //  n3Div.innerHTML = '🗡';
            this._shieldOn = n3Div;
            nDiv.appendChild(n3Div);
         }
         cubeDiv.appendChild(nDiv);
      }
   }

   get hasKey() {
      return this._hasKey;
   }

   set hasKey(hasKey) {
      this._hasKey = hasKey;
   }

   get state() {
      return this._state;
   }

   set state(state) {
      this._state = state;
   }

   get obj() {
      return this._obj;
   }

   get point() {
      return this._point;
   }

   get x() {
      return this._point.x;
   }

   get y() {
      return this._point.y;
   }

   set point(point) {
      this._point = point;

      const opcionesDeTemporizacion = {
         duration: 1000,
         iterations: 1,
         easing: 'ease-in-out',
         fill: 'forwards'
      };

      const keyframesDeAnimacion = [{ transform: `translateZ(27px) translateY(${50 * point.y}px) translateX(${50 * point.x}px) ${this._state.key}` }];
      this._obj.animate(keyframesDeAnimacion, opcionesDeTemporizacion);
   }

   set x(x) {
      this._point = { ...this._point, x };
   }

   set y(y) {
      this._point = { ...this._point, y };
   }

   set shieldOn(activate) {
      this._shieldOn.dataset.isAdd = activate;
      this._shieldOn.style.opacity = activate ? '1' : '0';
   }

   set swordOn(activate) {
      this._swordOn.dataset.isAdd = activate;
      this._swordOn.style.opacity = activate ? '1' : '0';
   }

   setBottomPosition() { this._state = this.#transform12; }
   setLeftPosition() { this._state = this.#transform13; }
   setTopPosition() { this._state = this.#transform14; }
   setRightPosition() { this._state = this.#transform11; }

   setBottomRotate() {
      this._state = this.#transform32;
      this._obj.style.transition = 'transform 1s ease';
      this._obj.style.transform = `translateZ(27px) ${this._state.key}`;
   }
   setLeftRotate() {
      this._state = this.#transform33;
      this._obj.style.transition = 'transform 1s ease';
      this._obj.style.transform = `translateZ(27px) ${this._state.key}`;
   }
   setTopRotate() {
      this._state = this.#transform34;
      this._obj.style.transition = 'transform 1s ease';
      this._obj.style.transform = `translateZ(27px) ${this._state.key}`;
   }
   setRightRotate() {
      this._state = this.#transform31;
      this._obj.style.transition = 'transform 1s ease';
      this._obj.style.transform = `translateZ(27px) ${this._state.key}`;
   }
}