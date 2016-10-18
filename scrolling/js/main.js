require.config({
   paths:{"jquery": "jquery-3.0.0"}
});
require(["jquery", "scrolling"], function ($, s) {
    var scroll = new s.Scroll();
    scroll.scrollUp({
        scrollStyle: "ladder_scroll"

    })


});

