export class Box {
   _point = { x: 0, y: 0 };
   _disable = false;
   _obj = null;
   _name = "";

   constructor(name, element, point) {
      const _element = this.createElement();

      const content = document.createElement('div');
      content.setAttribute('id', name);
      content.style.position = `absolute`;
      content.style.zIndex = `9`;
      content.style.width = '50px';
      content.style.height = '50px';
      content.style.top = `0px`;
      content.style.left = `0px`;
      content.appendChild(_element);


      element.appendChild(content);

      this._name = name;
      this._obj = content;
      this.point = point;
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

         if (i === 1) {
            nDiv.style.transform = 'rotateX(90deg) translateZ(Calc(50 / 2))';
         } else if (i === 2) {
            nDiv.style.transform = 'rotateZ(-90deg) translateZ(Calc(50 / 2))';
         } else if (i === 3) {
            nDiv.style.transform = 'rotatey(90deg) rotateZ(-90deg) translatez(Calc(50 / 2))';
         } else if (i === 4) {
            nDiv.style.transform = 'rotatey(180deg) translatez(Calc(50 / 2))';
         } else if (i === 5) {
            nDiv.style.transform = 'rotatey(-90deg) rotateZ(90deg) translatez(Calc(50 / 2))';
         } else if (i === 6) {
            nDiv.style.transform = 'rotatey(0deg) rotatex(-90deg) translatez(Calc(50 / 2))';
         }

         div.appendChild(nDiv);
      }

      return div;
   }

   set disable(disable) {
      this._disable = disable;
      this._obj.style.opacity = disable ? "0" : "1";
   }

   set point(point) {
      if (!point) return;

      this._point = point;
      this._obj.style.top = `${50 * point.x}px`;
      this._obj.style.left = `${50 * point.y}px`;
   }
}