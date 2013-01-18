module.export = QueuePool;

function QueuePool() {
    this.pool = new Array();
}

QueuePool.prototype.add = function(queue) {
    this.pool.push(queue);
}

QueuePool.prototype.findAPair = function () {
    var arr = [];
    for (var i = 0; i < this.pool.length; i ++ ) {
        if(pool[i].confimStatus == "no"
          || pool[i].findResult == "error") continue;
        arr.push(pool[i]);
    }
    var result=[];
    for(var i = 0; i< arr.length; i++ )
    {
        for( var j = i+1; j < arr.length; j++)
        {
            if(arr[i].id == arr[j].findResult) {
                result.push(arr[i]);
                result.push(arr[j]);
                break;
            }
        }
    }
    return result;
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

QueuePool.prototype.serialOperateStatus = function (serial) {
    var status = [];
    for(var i=0; i<serial.length; i++){
        status.push(serial[i] + ", " + function () {
            return Math.random() < 0.5 ? "成功" : "失败";
        }();
    }
    return status;
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

