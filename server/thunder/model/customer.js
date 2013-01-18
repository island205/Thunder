module.export = QueuePool;

function QueuePool() {
    this.pool = new Array();
}

QueuePool.prototype.add = function (queue) {
    this.pool.push(queue);
}