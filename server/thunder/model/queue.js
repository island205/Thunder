module.export = Queue;

function Queue(id, lat, lon, bt, time, type, serial, handle) {
    this.id = id; //唯一的ID
    this.latitude = lat; //经度
    this.longtitude = lon; //纬度
    this.bumpTime = bt; //碰撞时间
    this.time = time; //接收时间
    this.type = type; //客户端类型 customer,shop
    this.serial = serial; //团购券 Array()
    this.socketHandle = handle; //SocketIoHandle

    this.shopType = 'shop';
    this.customerType = 'customer';
    this.findResult = null; //[id]:other id, "error":find error
    this.confirmStatus = null; //"yes", "no"
    this.confirmResult = null; //"ok"
}