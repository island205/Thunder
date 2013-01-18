Zepto(function ($) {
    var
    DOC = document,
    fNOP = function () {},
    contentScroll

    contentScroll =  new iScroll('content-wrapper', {
        hScroll: false,
        hScrollbar: false,
        checkDOMChanges: false
    });

    function onBump(accelerationSpeed) {
        alert('bump')
    }

    function onWatchAcceleration(acceleration) {
        var accelerationSpeed = Math.sqrt(Math.pow(acceleration.x, 2) + Math.pow(acceleration.y, 2) + Math.pow(acceleration.z, 2))
        if (accelerationSpeed > 20) {
            onBump(accelerationSpeed)
        }
    }

    function onDeviceReady() {
        navigator.accelerometer.watchAcceleration(onWatchAcceleration, fNOP, {
            'frequency': 200
        })
    }

    DOC.addEventListener('deviceready', onDeviceReady, false)
})

