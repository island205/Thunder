(function (WIN) {
    var B = WIN.B = WIN.B || {}

    var ifBumpThreshold = 2.5;
    var speedArray = new Array();
    var arrayLength = 20;
    var timeSpan = 20;
    var watchID = null;
    var geoWatchID = null;
    var onBumpToDo;
    var latitude = 0;
    var longitude = 0;
    var altitude = 0;

    function initArray(){
        speedArray = new Array();
    }

    function startBump(onBump) {
        onBumpToDo = onBump;
        initArray();
        var options = {
            frequency: timeSpan
        };

        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        geoWatchID = navigator.geolocation.watchPosition(onGeoSuccess, onError, {
            timeout: 1000
        });
    }

    function stopBump() {
        initArray();
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID)
            navigator.geolocation.clearWatch(geoWatchID);
            watchID = null;
            geoWatchID = null;
        }
    }

    function onGeoSuccess(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        altitude = position.coords.altitude;
    }

    function onSuccess(acceleration) {
        addSpeed(acceleration.x, acceleration.y, acceleration.z);
        if (isBump()) {
            onBumpToDo(latitude, longitude, '' + Date.now());
        }
    }

    function onError() {}

    function mean(a) {
        if (a.length === 0) {
            return 0
        }
        var sum = eval(a.join(' + '));
        return sum / a.length;
    }

    function stdDev() {
        var a = speedArray;
        var m = mean(a);
        var sum = 0;
        var l = a.length;
        for (var i = 0; i < l; i++) {
            var dev = a[i] - m;
            sum += (dev * dev);
        }
        return Math.sqrt(sum / (l - 1));
    }

    function getSpeed(x, y, z) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    }

    function addSpeed(x, y, z) {
        var speed = getSpeed(x, y, z);
        speedArray.push(speed);
        if (speedArray.length > arrayLength) {
            speedArray.shift();
        }
    }

    function isBump() {
        var s = stdDev();
        var bump =(speedArray.length >= arrayLength) && (s > ifBumpThreshold) && (latitude != 0) && (longitude != 0);
        return bump;
    }

    B.bump = {
        start: startBump,
        stop: stopBump
    }
})(window);

