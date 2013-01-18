(function (WIN){
    var B = WIN.B || {};

    $(function () {
        var
        DOC = document,
        fNOP = function () {},
        overlay,
        tickets

        // socket.io
        var
        socket

        var
        loginTime

        socket = io.connect(window.location.origin)

        socket.on('connected', function (data) {
            loginTime = new Date(data)
        })

        // socket.on('bump', function (data) {
        //     console.log(data)
        // })
        
        // socket.emit('bump', {id: 54365 })

        overlay = (function () {
            var
            tipWrapper = $('.tip-wrapper'),
            tipInfo = $('.tip-info'),
            overlay = $('.overlay')

            tipWrapper.hide()
            overlay.hide()

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
        })();
        

        function onBump(latitude, longitude, bumpTime) {
            var d = {
                id: '' + loginTime + bumpTime,
                lat: latitude,
                lon: longitude,
                type: 'customer',
                serial: tickets.get()
            }

            overlay.show('searching')

            socket.emit('bump', d)

            // TODO:
            // 1. 获取选择的数据发送给服务器
            
        }

        function onDeviceReady() {
            B.bump(onBump);
        }

        DOC.addEventListener("deviceready", onDeviceReady, false);
    })
})(window);


