define(["jquery",  "widget"], function ($, w) {
    function Scroll() {
        this.cfg = {

        }
    }
    Scroll.prototype = $.extend({}, new w.Widget, {
        renderUI: function () {
            this.box = $("#scrollBox");
            this.boxCon1 = this.box.find("#con1");
            this.boxCon2 = this.box.find("#con2");
            this.boxCon2.html(this.boxCon1.html());//con2的内容与con1的相同

        },
        styleUI: function () {
            if (this.cfg.scrollType == ""){
                this.box.find($(" #mooc ul li")).css({
                    "display": "inline-block"
                })
            }


        },
        bindUI: function () {

            var that = this;

            that.scrollTop = 0;
       //     that.box.scrollTop = 0;
        //    that.box.scrollTop(0);

            function scroll() {
        //        that.box[0].scrollTop;
                if (that.box.scrollTop() >= 2 * that.boxCon1.height()-that.box.height()) {
                    console.log(that.boxCon1.height());
                    console.log(that.boxCon1[0].scrollHeight);
                    that.scrollTop = 0;
                } else {
                    that.scrollTop++;
                    if (that.cfg.scrollStyle == "ladder_scroll") {
                        if (that.box.scrollTop()!=0&&that.box.scrollTop() % 24 == 0 ) {
                    //        console.log(that.box.scrollTop());
                            clearInterval(that.t);
                           setTimeout(function () {
                               interval();
                           },100)
                        }
                    }
                }
                that.box.scrollTop(that.scrollTop);
            }
            function interval() {
                that.speed = 10;
                that.t = setInterval(scroll, that.speed);
            }

            this.box.hover(function () {
                clearInterval(that.t);
                that.t = null;
            },function () {
                clearInterval(that.t);
                that.t = null;
                interval(that);
            });
            interval();

        },
        scrollUp:function (cfg) {
            $.extend(this.cfg, cfg, {"scrollType": "scrollUp"});
            this.render();
        }

    });
    return {Scroll:Scroll}
});


