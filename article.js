export class Article {
   _point = { x: 0, y: 0 };
   _disable = false;
   _obj = null;
   _name = "";

   constructor(name, point, element, disable) {
      element.appendChild(this.createElement());
      element.style.top = `0px`;
      element.style.left = `0px`;
      this.display = disable;
      this.point = point;
      this._name = name;
      this._obj = element;

      return this._obj;
   }

   createElement() {
      const div = document.createElement('div');
      div.setAttribute('id', th._name);
      div.style.position = 'absolute';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.display = 'flex';
      div.style.justifyContent = 'center';
      div.style.alignItems = 'center';
      div.style.transformOrigin = 'center';

      if (thid._name === "enemy") {
         div.innerHTML = '😈';
      }
      if (thid._name === "sword") {
         div.innerHTML = ' 🗡';
      }

      return div;
   }

   set disable(disable) {
      this._disable = disable;
      this._obj.style.opacity = disable ? "0" : "1";
   }

   set point(point) {
      this._point = point;
      this._obj.style.top = `${50 * point.x}px`;
      this._obj.style.left = `${50 * point.y}px`;
   }
}