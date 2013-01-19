
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , customer = require('./routes/customer')
  , shop = require('./routes/shop')
  , http = require('http')
  , path = require('path')
  , Queue = require('./model/queue')
  , QueuePool = require('./model/queuepool')
  , queuePool = new QueuePool()
  , server
  , io

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/customer', customer.customer)
app.get('/shop', shop.shop)

server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io = require('socket.io').listen(server)
io.set('log level', 2)

io.sockets.on('connection', function (socket) {
    socket.on('bump', function (data) {        
        var queue

        data.handle = socket 

        queue = new Queue(data)
        queuePool.add(queue)
        queuePool.debug()
    });

    socket.on('confirm', function (data) {        
        debugger
        queuePool.setConfirmResult(data.id, data.result);
    })

    socket.emit('connected', new Date())
})

queuePool.startFindBumperWorker(function(q1,q2){
    q1.socketHandle.emit('find', { id: q1.id, name: q2.id, result: true });
    q2.socketHandle.emit('find', { id: q2.id, name: q1.id, result: true });
});

queuePool.startFindAPairWorker(function(q1,q2){
    q1.socketHandle.emit('over', { serials: [{ serial: '0208999200', result: true }, { serial: '7906487473', result: true }] });
    q2.socketHandle.emit('over', { serials: [{ serial: '0208999200', result: true }, { serial: '7906487473', result: true }] });
});
