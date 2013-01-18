module.export = QueuePool;

function QueuePool() {
    this.pool = new Array();
}

QueuePool.prototype.add = function(queue) {
    this.pool.push(queue);
}

QueuePool.prototype.clear = function() {
    for(var i = this.pool.length - 1; i >= 0; i--) {
        if(this.pool[i].findResult == "error"
          || (Date.now() - this.pool[i].time) > 5*60*1000 )
      {
        this.pool.splice(i, 1);
        break;
      }
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

QueuePool.prototype.findBumperById = function(id) {
    for(var i = this.pool.length - 1; i >= 0; i--) {
        var queue = this.pool[i];
        if(queue.findResult == id) {
            return queue;
        }
    };
    return null;
}

QueuePool.prototype.serialOperateResult = function (serial) {
    var status = [];
    for(var i=0; i<serial.length; i++){

        status.push([serial[i] ,function () {
            return Math.random() < 0.5 ? "成功" : "失败";
        }()]);
    }
    return status;
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

QueuePool.prototype.findBumper = function () {
    var MIN_TIMESPAN = 60000;
    var MIN_DISTANCE = 1000;
    var FIND_MAX = 100;

    var getFindList = function(i,self){
        var queue = self.pool[i];
        var index = 0

        var findList = [];
        while(true){
            if(findList.length > FIND_MAX/2){break;}
            index++;
            var nextQueue = self.pool[i+index];
            if(nextQueue == undefined) {break;}
            var queueTime = queue.time.getTime();
            var nextQueueTime = nextQueue.time.getTime();
            if(nextQueueTime - queueTime < MIN_TIMESPAN && nextQueue.type!=queue.type){
                findList.push(nextQueue);
            }
            else{break;}
        }
        index = 0
        while(true){
            if(findList.length > FIND_MAX){break;}
            index--;
            var prevQueue = self.pool[i+index];
            if(prevQueue == undefined) {break;}
            var queueTime = queue.time.getTime();
            var prevQueueTime = prevQueue.time.getTime();
            if(queueTime - prevQueueTime < MIN_TIMESPAN&& prevQueue.type!=queue.type){
                findList.push(prevQueue);
            }
            else{break;}
        }
        return findList;
    }

    var needToProcess = function(queue){
        if(queue.findResult != null){return false;}
        return true;
    }

    var findNearestQueue = function(queue,findList){
        var nearest = null;
        var nearestDis = 0;
        for (var i = findList.length - 1; i >= 0; i--) {
            var dis = queue.getDistance( findList[i]);
            if( dis < MIN_DISTANCE){
                if(nearest == null || dis < nearestDis){
                    nearest  = findList[i];
                    nearestDis = dis;
                    continue;
                }
            }
        };
        return nearest;
    }

    for(var i = 0; i < this.pool.length; i++) {
        var queue = this.pool[i];
        if(!needToProcess(queue)){continue;}
        var findList = getFindList(i,this);
        var nearest = findNearestQueue(queue,findList);
        if(nearest == null){continue;}
        nearest.findResult = queue.id;
        queue.findResult = nearest.id;
    };
}

QueuePool.prototype.debug = function() {
    console.debug(this.pool);
}

/*---------- Worker ----------*/
QueuePool.prototype.startClearWorker = function() {
    this.clearWorker = setInterval(this.clear, 200);
}
QueuePool.prototype.stopClearWorker = function() {
    clearInterval(this.clearWorker);
}
QueuePool.prototype.startFindBumperWorker = function() {
    this.clearWorker = setInterval(this.clear, 1000);
}
QueuePool.prototype.stopFindBumperWorker = function() {
    clearInterval(this.findBumper);
}
// QueuePool.prototype.startClearWorker = function() {
//     this.clearWorker = setInterval(this.clear, 200);
// }
// QueuePool.prototype.stopClearWorker = function() {
//     clearInterval(this.clearWorker);
// }
