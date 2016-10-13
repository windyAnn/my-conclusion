define(['wedget','jquery' ,'jquery-ui'],function (wedget,$, $ui) { //wedget是js的名字
    function Window() {
        this.cfg = {  //这里一定要用this，指向window这个对象，window的prototype才能继承该属性
            width: 200,
            height: 200,
            content: '',
            handler: null,
            title: '系统提示',
            hasCloseBtn: true,
            closeBtnHandler: null,
            boxSkin: true,
            hasMask: false,
            draggable: true,
            handleDraggle: null,
            skinClassName: 'skin_a'
        };
    }
    Window.prototype=$.extend({}, new wedget.Widget,{ //new wedget.Widget,Widget是暴露出来的接口
        renderUI: function () {
            if(this.cfg.hasMask){
                this.mask = $('<div class="window-mask"></div>');
                $("body").append(this.mask );
            }
            var footerContent = '';

            switch (this.cfg.winType){
                case 'alert':
                    footerContent = '<input class="alertBtn" type="button" value='+ this.cfg.alertBtnValue +'>';
                    break;
                case 'confirm':
                    footerContent = '<input class="confirmAlert" type="button" value='+ this.cfg.confirmAlertBtnValue +'>'+
                        ' <input class="confirmCancelBtn" type="button" value='+ this.cfg.confirmCancelBtnValue +'>';
                    break;
                case 'prompt':
                    this.cfg.content += '<p><input class="promptInput" '+
                        'type='+(this.cfg.isPromptPassword?"password":"text")+
                        ' placeholder='+ this.cfg.defaultValue4PromptInput+ //' placeholder='这里一定要空格谁为什么
                        ' ></p>' ;
                    footerContent = '<input class="promptAlert" type="button" value='+ this.cfg.confirmAlertBtnValue +'>'+
                        '<input class="promptCancelBtn" type="button" value='+ this.cfg.confirmCancelBtnValue +'>';
                    break;
                case 'common':
                    this.boudingBox = $('<div class="box-banding">' +
                        '<div class="window-content">' + this.cfg.content + '</div>'+
                        '</div>');
                    break;

            }

            if(this.cfg.winType!='common'){
                this.boudingBox = $('<div class="box-banding">' +
                    '<div class="window-title">'+ this.cfg.title + '</div>'  +
                    '<div class="window-content">' + this.cfg.content + '</div>'+
                    '<div class="footer">' + footerContent + '</div>'   +
                    '</div>');
            }

            $("body").append(this.boudingBox);
            if(this.cfg.hasCloseBtn){
                this.boudingBox.append( $('<div class="close-btn"> X </div>'))
            }
            this._promptInputVal = this.boudingBox.find('.promptInput');
        },
        bindUI: function () {
            var that = this;
           this.boudingBox.delegate('.btn', 'click',function () {
                that.fire('alert');
                that.destroy();
            }).delegate('.close-btn', 'click', function () {
                that.fire('close');
                that.destroy();
            }).delegate('.confirmAlert', 'click', function () {
               that.fire('confirm');
               that.destroy();
           }).delegate('.confirmCancelBtn', 'click', function () {
               that.fire('cancel');
               that.destroy();
           }).delegate('.promptAlert', 'click', function () {
               that.fire('promptAlert',that._promptInputVal.val());
               that.destroy();
           });
         /*   if(this.cfg.handler4PromptBtn){
                this.on('prompt', this.cfg.handler4PromptBtn)
            }*/
        },
        syncUI: function () {
            this.boudingBox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                top: this.cfg.y||(window.innerHeight-this.cfg.height)/2 + 'px',
                left: this.cfg.x||(window.innerWidth-this.cfg.width)/2 + 'px'
            });
            $('.window-title').css({
                width: this.cfg.width + 'px'
            });
            if(this.cfg.boxSkin){
                this.boudingBox.addClass(this.cfg.skinClassName);
            }
            //弹框是否可拖动
            if(this.cfg.draggable){
                if(this.cfg.handleDraggle){
                    this.boudingBox.draggable({
                        handle: this.cfg.handleDraggle
                    });
                } else {
                    this.boudingBox.draggable();
                }
            }

        },
        destructor:function () {
            this.mask&&this.mask.remove();
        },
        alert: function (cfg) {
            $.extend(this.cfg,cfg,{winType:'alert'});
            this.render();
            return this;
        },
        confirm: function (cfg) {
            $.extend(this.cfg,cfg,{winType:'confirm'});
            this.render();
            return this;
        },
        prompt: function (cfg) {
            $.extend(this.cfg,cfg,{winType:'prompt'});
            this.render();
            this._promptInputVal.focus();
            return this;
        },
        common: function (cfg) {
            $.extend(this.cfg,cfg,{winType:'common'});
            this.render();

            return this;
        }
    });
    return  {Window: Window};
});
