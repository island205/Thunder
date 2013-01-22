(function (WIN, UDF){
    var B = WIN.B || {}

    B.socketHandler = (function () {
        return {
            find: function (data) {
                var $shopInfo

                B.overlay.show('confirmInfo', data)

                $shopInfo = $('.tip-info')

                $shopInfo.find('.btn-conn').bind('click', function () {
                    B.socketTrigger.confirm(true, { id: data.id, result: true })
                })

                $shopInfo.find('.btn-cancel').bind('click', function () {
                    B.socketTrigger.confirm(false, { id: data.id, result: false })
                })
            },

            over: function (data) {
                var ticketEls = B.ticketer.els(),
                    classMap = {
                        0: 'ico-vertify-status-ok',
                        1: 'ico-vertify-status-error'
                    }


                data.serials.forEach(function (item) {
                    var $el = $(ticketEls[item.serial]).find('.ticket-vertify-status')

                    $(ticketEls[item.serial]).removeClass('selected')                    

                    $el[0].className="ticket-vertify-status " + classMap[item.result ? 0 : 1]
                    $el.text(item.result ? '验证成功' : '验证失败')      
                })

                B.overlay.hide()

                setTimeout(function () {
                    B.bump.start(B.socketTrigger.bump)
                }, 2000)
            }
        }
    })()

    B.socketTrigger = (function () {
        return {
            bump: function (lat, lon, bpt) {
                var d = {
                    id: B.socket.__lgt + bpt,
                    lat: lat,
                    lon: lon,
                    type: 'customer',
                    serial: B.ticketer.get()
                }

                B.overlay.show('searching')

                // 禁用 bump
                B.bump.stop()
                B.socket.emit('bump', d)
                B.ticketer.clear()
            },

            confirm: function (flag, data) {
                if (flag) {
                    B.socket.emit('confirm', data)
                } else {
                    B.socket.emit('confirm', data)
                    B.overlay.hide()
                    B.bump.start(this.bump);
                }
            }
        }
    })()

    B.deviceReady = function () {
        // 启用 bump
        B.bump.start(B.socketTrigger.bump);
    }

    $(function () {
        var key

        new iScroll('content-wrapper', {
            hScroll: false,
            hScrollbar: false,
            checkDOMChanges: false
        });

        B.overlay.init()
        B.ticketer.init()

        // 监听自定义 socket 事件 
        for ( key in B.socketHandler) {
            B.socket.on(key, B.socketHandler[key])
        }

        document.addEventListener("deviceready", B.deviceReady, false);
    })
})(window);


