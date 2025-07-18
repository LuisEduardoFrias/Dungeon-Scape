export class Player {
   _point = { x: 0, y: 0 };
   _obj = null;
   _hasKey = false;
   _state = null;
   _shieldOn = null;
   _swordOn = null;

   constructor(element) {
      element.appendChild(this.createElement());
      element.style.top = `0px`;
      element.style.left = `0px`;
      this._obj = element;
      // this.shieldOn = true;
      //       this.swordOn = true;

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
}