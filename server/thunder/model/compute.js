
var Customer = require('./customer');
var Shop = require('./shop');


// mock shop data
var shop = new Shop('23.0000', '23.0000', Date.Now()));

var span = 10*1000;

// mock customers data
var customers = [];
n = 10
while(n--) {
    customers.push(new Shop((Math.random() + 23.0000).toString(), (Math.random() + 23.0000).toString(), Date.Now() - Math.random()*10*1000));
}

