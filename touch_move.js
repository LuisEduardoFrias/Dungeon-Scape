export class TouchMove {
   events = { left: [], right: [], top: [], bottom: [], end: [] };
   static instance = null;

   static getInstance() {
      if (!this.instance) {
         this.instance = new TouchMove();
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