$(function () {
    var
    DOC = document,
    fNOP = function () {},
    Overlay,
    Tickets

    Overlay = (function () {
        var
        tipWrapper = $('.tip-wrapper'),
        tipInfo = $('.tip-info'),
        overlay = $('.overlay')

        tipWrapper.hide();

        return {
            tpls: {
                searching: $('#tplSearching').html(),
                netWorkError: $('#tplNetWorkError').html(),
                confirmInfo: $('#tplConfirmInfo').html(),
                tip1: $('#tplTip1').html(),
                tip2: $('#tplTip2').html(),
                tip3: $('#tplTip3').html()
            },

            __show: function () {               
                tipWrapper.slideDown()      
            },
            hide: function () {
                tipWrapper.hide()
                overlay.hide()    
            },
            show: function (tpl) {
                tipInfo.html(this.tpls[tpl])
                this.__show()
            }
        };
    })();

    new iScroll('content-wrapper', {
        hScroll: false,
        hScrollbar: false,
        checkDOMChanges: false
    });

    Tickets = (function () {
        var $tickets = $('.ticket-item')

        $tickets.click(function () {
            $(this).toggleClass('selected')
        })


    });
    

    function onBump(latitude, longitude, date) {
        Overlay.show('tip1')
        // TODO:
        // 1. 获取选择的数据发送给服务器
        
    }

    function onDeviceReady() {
        startBump(onBump);
    }

    DOC.addEventListener("deviceready", onDeviceReady, false);
})

