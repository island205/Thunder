(function (WIN) {
    var B = WIN.B || {};

    $(function () {
        var
        overlay

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
                        tipInfo.html(Mustache.to_html(this.tpls[tpl], data))
                    } else {
                        tipInfo.html(this.tpls[tpl])
                    }
                    
                    this.__show()
                }
            };
        })();

        // socket.io
        var
        loginTime

        socket = io.connect(window.location.origin)

        socket.on('connected', function (data) {
            loginTime = new Date(data)
        })

        socket.on('find', function (data) {
            var $userInfo

            overlay.show('confirmInfo', data)

            $userInfo = $('.tip-info')

            $userInfo.find('.btn-conn').bind('click', function () {
                socket.emit('confirm', { id: data.id, result: true })                
            })

            $userInfo.find('.btn-cancel').bind('click', function () {
                socket.emit('confirm', { id: data.id, result: false })
                overlay.hide()
                B.startBump(onBump);
            })
        })

        socket.on('over', function (data) {            
            var 
            tplTicketInfo = $('#tplTicketInfo').html(),
            classMap = {
                0: 'ico-vertify-status-ok',
                1: 'ico-vertify-status-error'
            }

            _.each(data.serials, function(item) {
                item.statusClass = classMap[item.result ? 0: 1]
                item.resultInfo = item.result ? '验证成功' : '验证失败'
            })

            $('#tickets').prepend(Mustache.to_html(tplTicketInfo, data));
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
                type: 'shop'
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


