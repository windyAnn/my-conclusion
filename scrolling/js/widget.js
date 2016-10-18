define(function () {
    function Widget() {
        this.box = null;
        this.boxCon1 = null;
        this.boxCon2 = null;
        this.t = null;


    }
    Widget.prototype = {
        render: function () {
            this.renderUI();
            this.styleUI();
            this.bindUI();
        }
    };
    return {Widget:Widget}
});
