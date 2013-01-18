$(function () {
    var
    DOC = document,
    fNOP = function () {},
    contentScroll

    // dom
    var
    tipWrapper = $('.tip-wrapper'),
    infoDetails = $('.info-detail'),
    tipBtns = $('.btns'),
    overlay = $('.overlay')

    overlay.hide()

    // module
    tip = {
        show: function () {
            overlay.show()
            tipWrapper.show(700)      
        },
        hide: function () {
            tipWrapper.hide()
            overlay.hide()    
        },
        search: function () {
            infoDetails.html('<h2>搜索中 ...</h2>')
            this.show()
        }
    }

    tip.hide()

    window.tip = tip

    contentScroll = new iScroll('content-wrapper', {
        hScroll: false,
        hScrollbar: false,
        checkDOMChanges: false
    })

    $('.ticket-item').click(function () {
        $(this).toggleClass('selected')
    })

    function onBump(latitude, longitude, date) {
        tip.search()
    }

    function onDeviceReady() {
        startBump(onBump);
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    //    function onBump(accelerationSpeed) {
    //        alert('bump')
    //    }
    //
    //    function onWatchAcceleration(acceleration) {
    //        var accelerationSpeed = Math.sqrt(Math.pow(acceleration.x, 2) + Math.pow(acceleration.y, 2) + Math.pow(acceleration.z, 2))
    //        if (accelerationSpeed > 20) {
    //            onBump(accelerationSpeed)
    //        }
    //    }
    //
    //    function onDeviceReady() {
    //        navigator.accelerometer.watchAcceleration(onWatchAcceleration, fNOP, {
    //            'frequency': 200
    //        })
    //    }
    //
    //    DOC.addEventListener('deviceready', onDeviceReady, false)
})

