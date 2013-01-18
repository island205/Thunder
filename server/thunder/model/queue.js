module.export = Queue;

function Queue(id, lat, lon, type, serial, handle) {
    this.id = id; //唯一的ID
    this.latitude = lat; //经度
    this.longtitude = lon; //纬度
    this.time = new Date(); //接收时间
    this.type = type; //客户端类型 customer,shop
    this.serial = serial; //团购券 Array()
    this.socketHandle = handle; //SocketIoHandle
    this.findResult = null; //[id]:other id, "error":find error
    this.confirmStatus = null; //"yes", "no"
    this.confirmResult = null; //"ok"
}


Queue.prototype.getDistance = function(queue) {
    var FINAL = 6378137.0;
    var calcDegree = function(d) {
            return d * Math.PI / 180.0;
        }

    var calcDistance = function(f, t) {
            var flat = calcDegree(f[0]);
            var flng = calcDegree(f[1]);
            var tlat = calcDegree(t[0]);
            var tlng = calcDegree(t[1]);

            var result = Math.sin(flat) * Math.sin(tlat);
            result += Math.cos(flat) * Math.cos(tlat) * Math.cos(flng - tlng);
            return Math.acos(result) * FINAL;
        }
    return calcDistance([this.latitude, this.longtitude], [queue.latitude, queue.longtitude]);
}
