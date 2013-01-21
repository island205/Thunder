(function(WIN) {
    var
    B = {}
    WIN.B = B
    var ifBumpThreshold = 2.5;
    var timeSpan = 20;
    var watchID = null;
    var geoWatchID = null;
    var onBumpToDo;
    var latitude = 0;
    var longitude = 0;
    var altitude = 0;

    var lastSpeed = 9.8;
    var pointCount = 0;

    function startBump(onBump) {
        pointCount = 0;
        onBumpToDo = onBump;
        var options = {
            frequency: timeSpan
        };

        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        geoWatchID = navigator.geolocation.watchPosition(onGeoSuccess, onError, {
            timeout: 1000
        });
    }

    function stopBump() {
        if(watchID) {
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
        if(pointCount < 100) {
            pointCount++;
        }
        var speed = getSpeed(acceleration.x, acceleration.y, acceleration.z);
        if(Math.abs(lastSpeed - speed) > 4 && pointCount > 20) {
            onBumpToDo(latitude, longitude, '' + Date.now());
            pointCount = 0;
        }

        lastSpeed = speed;
    }

    function onError() {}

    function getSpeed(x, y, z) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    }

})(window);