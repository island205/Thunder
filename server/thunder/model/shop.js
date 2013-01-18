module.export = Shop


function Shop(lat, lon, bt) {
    this.latitude = lat;
    this.longtitude = lon;
    this.bumpTime = bt;
}

Shop.prototype.setLocation = function (lat, lon) {
    this.latitude = lat;
    this.longtitude = lon;
}
Shop.prototype.setBumpTime = function (bt) {
    this.bumpTime = bt;
}

Shop.prototype.getCustomer = function (customers) {
    var max = 10000, short = -1;
    for( var k = 0; k < shops.length; k++ ) {
        if( Math.abs(customers[k].bumpTime - this.bumpTime) > span ) continue;
        var dist = Math.sqrt(Math.pow(customers[k].latitude - this.latitude, 2)
                             + Math.pow(customers[k].longtitude - this.longtitude, 2));
        if( dist < max ) {
            max = dist;
            short = k;
        }
    }
    return customers[short];
}


