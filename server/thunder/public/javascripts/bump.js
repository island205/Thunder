var ifBumpThreshold = 2.5;
var speedArray = new Array();
var timeSpan = 50;
var watchID = null;
var geoWatchID = null;
var onBumpToDo;
var latitude = 0;
var longitude = 0;
var altitude = 0;

function startBump(onBump) {
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
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

function onGeoSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    altitude = position.coords.altitude;
}

function onSuccess(acceleration) {
    addSpeed(acceleration.x, acceleration.y, acceleration.z);
    if(isBump()) {
        onBumpToDo(latitude,longitude,new Date());
    }
}

function onError() {}

function mean(a) {
    var sum = eval(a.join(" + "));
    return sum / a.length;
}

function stdDev() {
    var a = speedArray;
    var m = mean(a);
    var sum = 0;
    var l = a.length;
    for(var i = 0; i < l; i++) {
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
    if(speedArray.length > 10) {
        speedArray.shift();
    }
}

function isBump() {
    var s = stdDev();
    var bump = s > ifBumpThreshold;
    if(bump) {
        speedArray = new Array();
    }
    return bump;
}