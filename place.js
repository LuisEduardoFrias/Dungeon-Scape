export class Place {
   _rx = 0;
   _ry = 0;
   _rz = 0;
   _placeRotationSensitivity = 0.009;
   _tait = null;
   _place = null;

   constructor(tait) {
      this._place = document.querySelector("#place");
      this._tait = tait;
      
      for (let i = 1; i <= 25; i++) {
         const div = document.createElement('div');
         div.style.width = "50px";
         div.style.height = "50px";
         div.style.boxShadow = "inset 2px 2px 3px 2px #2e2e2e, inset -2px -2px 3px 2px #777777";
         div.style.backgroundImage = "url('./images/floor.png')";
         div.style.backgroundSize = "cover";

         div.classList.add('tail');
         div.setAttribute('id', `tail-${i}`);
         tait.appendChild(div);
      }

      this._place.appendChild(tait);
      this._tait.style.transform = `rotateZ(0deg) rotateY(0deg) rotateX(0deg)`;
   }

addChild(element) {
      if (!element) return this._place;
      this._tait.appendChild(element);
   }

   set right(rx) {
      this._rx += rx * this._placeRotationSensitivity;
      this._tait.style.transform = `rotateZ(${this._rz}deg) rotateY(${this._rx}deg) rotateX(${this._ry}deg)`;
   }
   set left(rx) {
      this._rx += rx * this._placeRotationSensitivity;
      this._tait.style.transform = `rotateZ(${this._rz}deg) rotateY(${this._rx}deg) rotateX(${this._ry}deg)`;
   }
   set top(ry) {
      this._ry -= ry * this._placeRotationSensitivity;
      this._tait.style.transform = `rotateZ(${this._rz}deg) rotateY(${this._rx}deg) rotateX(${this._ry}deg)`;
   }
   set bottom(ry) {
      this._ry -= ry * this._placeRotationSensitivity;
      this._tait.style.transform = `rotateZ(${this._rz}deg) rotateY(${this._rx}deg) rotateX(${this._ry}deg)`;
   }
}
