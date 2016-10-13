require.config({
    paths: {
        'jquery': 'jquery-3.0.0'
    }
});
require(['jquery', 'alert', 'jquery-ui'], function ($, a, $ui) {
    // var window = new a.Window();  //这里为什么出错，原因就是你一开始加载就new了一下，他就会直接刷新就有前面的内容
    $('#alert').click(function () {
        var win = new a.Window();
        win.alert({
            title: '提示',
            content: 'welcome',
            handler: function () {
                alert("click me");
            },
            width: 250,
            height: 250,
            y: 200,
            hasCloseBtn: true,
            closeBtnHandler: function () {
                alert("close?");
            },
            alertBtnValue: 'OK',
            hasMask: true,
            draggable: true,
            handleDraggle: '.window-title'
        }).on('alert', function () {
            alert('aa');
        }).on('alert', function () {
            alert('你点击了确定按钮')
        }).on('close', function () {
            alert('你点击了close按钮')
        });
    });
    $('#confirm').click(function () {
        var win = new a.Window();
        win.confirm({
            title: '提示',
            content: 'welcome',
            confirmAlertBtnValue: 'confirm',
            confirmCancelBtnValue: 'cancel',
            width: 300,
            height: 300,
            y: 300,
            hasCloseBtn: false,
            hasMask: true,
            draggable: true,
            handleDraggle: '.window-title'
        }).on('confirm', function () {
            alert('aa');
        }).on('confirm', function () {
            alert('你点击了确定按钮')
        }).on('cancel', function () {
            alert('你点击了cancel按钮')
        })
    });
    $('#prompt').click(function () {
        var win = new a.Window();
        win.prompt({
            title: '提示',
            content: 'welcome',
            confirmAlertBtnValue: 'confirm',
            confirmCancelBtnValue: 'cancel',
            width: 300,
            height: 300,
            y: 300,
            hasCloseBtn: false,
            hasMask: true,
            draggable: true,
            handleDraggle: '.window-title',
            isPromptPassword:true,
            defaultValue4PromptInput: 'asan'


        }).on('promptAlert', function (promptInputVal) {
            alert('你点击了promptAlert按钮' + promptInputVal)
        });
    });
    $('#common').click(function () {
        var win = new a.Window();
        win.common({
            width: 250,
            height: 250,
            y: 200,
            hasCloseBtn: true,
            content: 'common alert'
        });
    });


});

