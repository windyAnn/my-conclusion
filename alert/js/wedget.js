define(function () {
   function Widget() {
       this.boudingBox = null;
   }
   Widget.prototype = {
       on: function (type, handler) {
           if (typeof this.handlers[type] == 'undefined'){
               this.handlers[type] = [];
           }
           this.handlers[type].push(handler);
           return this;  //这里return this; 可以使得调用on函数结束后变成this
       },
       fire: function (type, data) {
           if (this.handlers[type] instanceof Array){
               var handlers = this.handlers[type];
               for (var i=0;i<handlers.length;i++){
                   handlers[i](data);//调用this.handlers[type]［i］函数
               }
           }
       },
       render: function (container) {
           this.handlers={};
           this.renderUI();
           this.syncUI();
           this.bindUI();
           $(container||document.body).append(this.boudingBox);
       },
       destroy: function () {
           this.destructor();
           this.boudingBox.remove();
       }
   };
   return {Widget: Widget};
});
