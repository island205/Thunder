module.export = QueuePool;

function QueuePool() {
    this.pool = new Array();
    this.syncRoot = false;
}

QueuePool.prototype.add = function(queue) {
        this.pool.push(queue);
}

QueuePool.prototype.clear = function() {
    this.async(function() {
    });
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
