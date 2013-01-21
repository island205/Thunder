(function (WIN, UDF){
    var B = WIN.B = WIN.B || {}
    
    B.overlay = (function () {
        var
        $tipWrapper,
        $tipInfo,
        $mask,
        __show

        __show = function () {
            $mask.show()
            $tipWrapper.slideDown()
        }

        return {
            init: function () {
                $tipWrapper = $('.tip-wrapper')
                $tipInfo = $('.tip-info')
                $mask = $('.overlay')

                $tipWrapper.hide()
                $mask.hide()
            },

            tpls: {
                searching: $('#tplSearching').html(),
                netWorkError: $('#tplNetWorkError').html(),
                confirmInfo: $('#tplConfirmInfo').html(),
                tip1: $('#tplTip1').html(),
                tip2: $('#tplTip2').html(),
                tip3: $('#tplTip3').html()
            },
            
            hide: function () {
                $tipWrapper.hide()
                $mask.hide()
            },

            show: function (tpl, data) {
                if (data) {
                    $tipInfo.html(Mustache.to_html(this.tpls[tpl], data))
                } else {
                    $tipInfo.html(this.tpls[tpl])
                }
                
                __show()
            }
        }
    })()

    B.ticketer = (function () {
        var
        $tickets,
        serials = [],
        els = {}

        return {
            init: function () {
                $tickets = $('.ticket-item')

                $tickets.click(function () {
                    var serial = $(this).attr('data-serial')

                    $(this).toggleClass('selected')

                    if ($(this).hasClass('selected')) {
                        serials.push(serial)
                        els[serial] = this
                    } else {                        
                        serials = serials.splice(serials.indexOf(serial), 1)
                        els[serial] = UDF
                    }
                })
            },

            get: function () {
                return serials
            },

            els: function () {
                return els
            }
        }
    })()

    // connect socket server
    B.socket = (function () {
        var socket = io.connect(window.location.origin),
            key

        socket.on('connected', function (data) {
            socket.__lgt = new Date(data).getTime().toString()
        })

        // 监听自定义 socket 事件 
        for ( key in B.socketHandler) {
            socket.on(key, B.socketHandler[key])
        }        

        return socket
    })()

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
                    B.socketTrigger.confirm(true, { id: data.id, result: false })
                })
            },

            over: function (data) {
                var ticketEls = tickets.els(),
                    classMap = {
                        0: 'ico-vertify-status-ok',
                        1: 'ico-vertify-status-error'
                    }

                _.each(data.serials, function (item) {
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
        new iScroll('content-wrapper', {
            hScroll: false,
            hScrollbar: false,
            checkDOMChanges: false
        });

        B.overlay.init()
        B.ticketer.init()

        DOC.addEventListener("deviceready", B.deviceReady, false);
    })
})(window);


