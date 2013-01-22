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

                this.tpls = {
                    searching: $('#tplSearching').html(),
                    netWorkError: $('#tplNetWorkError').html(),
                    confirmInfo: $('#tplConfirmInfo').html(),
                    tip1: $('#tplTip1').html(),
                    tip2: $('#tplTip2').html(),
                    tip3: $('#tplTip3').html()
                }

                $tipWrapper.hide()
                $mask.hide()
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
            },

            clear: function () {
                serials.length = 0
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

        return socket
    })()
})(window);


