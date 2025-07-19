export class Article {
   _point = { x: 0, y: 0 };
   _disable = false;
   _obj = null;
   _name = "";

   constructor(name, point, element, disable, img) {
      const _element = this.createElement();
      _element.style.backgroundImage = `url("./images/${img}")`;
      _element.style.backgroundSize = 'cover';

      const content = document.createElement('div');
      content.appendChild(_element);

      content.style.position = `absolute`;
      content.style.top = `0px`;
      content.style.left = `0px`;

      element.appendChild(_element);

      this.display = disable;
      this._obj = content;
      this.point = point;
      this._name = name;

      return this._obj;
   }

   createElement() {
      const div = document.createElement('div');
      div.setAttribute('id', this._name);
      div.style.position = 'absolute';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.display = 'flex';
      div.style.justifyContent = 'center';
      div.style.alignItems = 'center';
      div.style.transformOrigin = 'center';

      if (this._name === "enemy") {
         div.innerHTML = '😈';
      }
      if (this._name === "sword") {
         div.innerHTML = ' 🗡';
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