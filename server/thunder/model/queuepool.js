module.export = QueuePool;

function QueuePool() {
    this.pool = new Array();
}

QueuePool.prototype.add = function(queue) {
    this.pool.push(queue);
}

QueuePool.prototype.clear = function() {
    for(var i = this.pool.length - 1; i >= 0; i--) {
        this.pool.splice(i, 1);
    };
}

QueuePool.prototype.setfindResult = function(id,result) {
    var queue = this.findById(id);
    if(queue == null){return;}
    queue.findResult = result;
}

QueuePool.prototype.setConfirmResult = function(id,result) {
    var queue = this.findById(id);
    if(queue == null){return;}
    queue.setConfirmResult = result;
}

QueuePool.prototype.findById = function(id) {
    for(var i = this.pool.length - 1; i >= 0; i--) {
        var queue = this.pool[i];
        if(queue.id == id) {
            return queue;
        }
    };
    return null;
}

QueuePool.prototype.findBumper = function(id) {
    for(var i = this.pool.length - 1; i >= 0; i--) {
        var queue = this.pool[i];
        if(queue.findResult == id) {
            return queue;
        }
    };
    return null;
}


QueuePool.prototype.debug = function() {
    console.debug(this.pool);
}



/*---------- Worker ----------*/
QueuePool.prototype.startClearWorker = function() {
    var self = this;
    this.clearWorker = setInterval(self.clear, 1000);
}
QueuePool.prototype.stopClearWorker = function() {
    clearInterval(this.clearWorker);
}