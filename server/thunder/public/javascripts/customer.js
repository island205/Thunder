(function (WIN){
    var B = WIN.B || {};

    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };

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
                    overlay.show()                 
                    tipWrapper.slideDown()      
                },
                hide: function () {
                    tipWrapper.hide()
                    overlay.hide()    
                },
                show: function (tpl, data) {
                    if (data) {
                        tipInfo.html(_.template(this.tpls[tpl])(data))
                    } else {
                        tipInfo.html(this.tpls[tpl])
                    }
                    
                    this.__show()
                }
            };
        })();

        tickets = (function () {
            var $tickets = $('.ticket-item'),
                serials = [],
                els = {}

            $tickets.click(function () {
                var serial = $(this).attr('data-serial');

                $(this).toggleClass('selected')

                if ($(this).hasClass('selected')) {
                    serials.push(serial)
                    els[serial] = this
                } else {
                    serials = _.without(serials, serial)
                    delete els[serial]
                }
            })

            return {
                get: function () {
                    return serials
                },
                els: function () {
                    return els
                }
            }
        })();

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
        
        socket.on('find', function (data) {
            var $shopInfo

            overlay.show('confirmInfo', data)

            $shopInfo = $('.tip-info')

            $shopInfo.find('.btn-conn').bind('click', function () {
                socket.emit('confirm', { id: data.id, result: true })
            })

            $shopInfo.find('.btn-cancel').bind('click', function () {
                socket.emit('confirm', { id: data.id, result: false })
                overlay.hide()
                B.startBump(onBump);
            })
        })

        socket.on('over', function (data) {
            var 
            ticketEls = tickets.els(),
            classMap = {
                0: 'ico-vertify-status-ok',
                1: 'ico-vertify-status-error'
            }

            _.each(data.serials, function (item) {
                $(ticketEls[item.serial]).removeClass('selected');
                var $el = $(ticketEls[item.serial]).find('.ticket-vertify-status');

                $el[0].className="ticket-vertify-status " + classMap[item.result ? 0 : 1]
                $el.text(item.result ? '验证成功' : '验证失败')      
            })

            overlay.hide()
            setTimeout(function () {
                B.startBump(onBump)
            }, 2000)
        })

        new iScroll('content-wrapper', {
            hScroll: false,
            hScrollbar: false,
            checkDOMChanges: false
        });

        function onBump(latitude, longitude, bumpTime) {
            var d = {
                id: loginTime.getTime() + bumpTime,
                lat: latitude,
                lon: longitude,
                type: 'customer',
                serial: tickets.get()
            }

            overlay.show('searching')

            B.stopBump()
            socket.emit('bump', d)

            // TODO:
            // 1. 获取选择的数据发送给服务器
            
        }

        function onDeviceReady() {
            B.startBump(onBump);
        }

        DOC.addEventListener("deviceready", onDeviceReady, false);
    })
})(window);


