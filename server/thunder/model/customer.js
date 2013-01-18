module.export = Customer;


function Customer(lat, lon, bt) {
    this.latitude = lat;
    this.longtitude = lon;
    this.bumpTime = bt;
}

Customer.prototype.setLocation = function (lat, lon) {
    this.latitude = lat;
    this.longtitude = lon;
}

Customer.prototype.setBumpTime = function (bt) {
    this.bumpTime = bt;
}


Customer.prototype.getCustomer = function (shops) {
    var max = 10000, short = -1;
    for( var k = 0; k < shops.length; k++ ) {
        if( Math.abs(shops[k].bumpTime - this.bumpTime) > span ) continue;
        var dist = Math.sqrt(Math.pow(shops[k].latitude - this.latitude, 2)
                             + Math.pow(shops[k].longtitude - this.longtitude, 2));
        if( dist < max ) {
            max = dist;
            short = k;
        }
    }
    return shops[short];
}
