/*
 * GET customer app.
 */
var
util = require('../util/util')
var
data = require('../database/data')
exports.customer = function (req, res) {
    var
    ticketCount = util.getRandomInt(1, 15),
    i,
    tickets = []
    for (i = 0; i < ticketCount; i++) {
        tickets.push(data.getTicket())
    }
    res.render('customer', {
        title: 'Customer',
        tickets: tickets
    });
};

