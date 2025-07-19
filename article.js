export class Article {
   _point = { x: 0, y: 0 };
   _disable = false;
   _obj = null;
   _name = "";

   constructor(name, point, element, disable, img) {
      const _element = this.createElement(name, img);

      const content = document.createElement('div');
      content.style.position = `absolute`;
      content.style.display = `flex`;
      content.style.justifyContent = `center`;
      content.style.alignItems = `center`;
      content.style.transform = `rotateZ(-90deg)`;
      content.style.zIndex = `9`;
      content.style.top = `0px`;
      content.style.left = `0px`;
      content.appendChild(_element);

      element.appendChild(content);

      this.display = disable;
      this._obj = content;
      this.point = point;
      this._name = name;
   }

   createElement(name, img) {
      const div = document.createElement('div');

      div.setAttribute('id', name);
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.transformOrigin = 'center';

      if (Array.isArray(img)) {
         let currentImageIndex = 0;

         function changeImage() {
            div.style.backgroundImage = `url("./images/${img[currentImageIndex]}")`;
            currentImageIndex++;

            if (currentImageIndex >= img.length) {
               currentImageIndex = 0;
            }

            setTimeout(changeImage, 500);
         }

         changeImage();
      } else {
         div.style.backgroundImage = `url("./images/${img}")`;
      }
      div.style.backgroundSize = 'cover';

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
      // console.log(this._obj);
   }
}