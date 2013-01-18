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