$(function () {
    var
    DOC = document,
    fNOP = function () {},
    overlay,
    tickets

    overlay = (function () {
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

    tickets = (function () {
        var $tickets = $('.ticket-item'),
            serials = []

        $tickets.click(function () {
            var serial = $(this).attr('data-serial');

            $(this).toggleClass('selected')

            if ($(this).hasClass('selected')) {
                serials.push(serial)
            } else {
                serials = _.without(serials, serial)
            }
        })

        return {
            get: function () {
                return serials;
            }
        }
    });
    

    function onBump(latitude, longitude, date) {
        var d = {
            id: '' + __loginId + date.getTime(),

        }

        overlay.show('tip1')


        // TODO:
        // 1. 获取选择的数据发送给服务器
        
    }

    function onDeviceReady() {
        startBump(onBump);
    }

    DOC.addEventListener("deviceready", onDeviceReady, false);
})

