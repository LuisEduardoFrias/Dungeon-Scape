export class Box {
   _point = { x: 0, y: 0 };
   _disable = false;
   _obj = null;
   _name = "";

   constructor(name, parentElement, point) {
      const mainCubeDiv = document.createElement('div');
      mainCubeDiv.setAttribute('id', `${name}-cube`);
      mainCubeDiv.style.position = 'absolute';
      mainCubeDiv.style.width = '50px';
      mainCubeDiv.style.height = '50px';
      mainCubeDiv.style.display = 'flex';
      mainCubeDiv.style.justifyContent = 'center';
      mainCubeDiv.style.alignItems = 'center';
      mainCubeDiv.style.transformOrigin = 'center center -25px';
      mainCubeDiv.style.transformStyle = 'preserve-3d';
      mainCubeDiv.style.transform = 'translateZ(27px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)';

      this._createFaces(mainCubeDiv);

      parentElement.appendChild(mainCubeDiv);

      this._name = name;
      this._obj = mainCubeDiv;
      this.point = point;
   }

   _createFaces(cubeDiv) {
      for (let i = 1; i <= 6; i++) {
         const nDiv = document.createElement('div');
         nDiv.style.backgroundImage = 'url("./images/box.png")';
         nDiv.style.backgroundSize = 'cover';
         nDiv.style.width = '50px';
         nDiv.style.height = '50px';
         nDiv.style.position = 'absolute';
         nDiv.style.transformStyle = 'preserve-3d';

         if (i === 1) {
            nDiv.style.transform = 'translateZ(25px)';
         } else if (i === 2) {
            nDiv.style.transform = 'rotateY(180deg) translateZ(25px)';
         } else if (i === 3) {
            nDiv.style.transform = 'rotateX(90deg) translateZ(25px)';
         } else if (i === 4) {
            nDiv.style.transform = 'rotateX(-90deg) translateZ(25px)';
         } else if (i === 5) {
            nDiv.style.transform = 'rotateY(90deg) translateZ(25px)';
         } else if (i === 6) {
            nDiv.style.transform = 'rotateY(-90deg) translateZ(25px)';
         }
         cubeDiv.appendChild(nDiv);
      }
   }

   set disable(disable) {
      this._disable = disable;
      this._obj.style.opacity = disable ? "0" : "1";
   }

   get point() {
      return this._point;
}

   set point(point) {
      if (!point) return;

      this._point = point;
      this._obj.style.top = `${50 * point.y}px`;
      this._obj.style.left = `${50 * point.x}px`;
   }
}
