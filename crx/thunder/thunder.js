// socket.io
var
socket, loginTime = ""

socket = io.connect("http://192.168.1.90:3000/")

socket.on('connected', function (data) {
    console.log('connected')
    loginTime = new Date(data)
})

socket.on('find', function (data) {
    socket.emit('confirm', {id: data.id, result: true})
})

socket.on('verify', function (data) {
    console.log(data)
    if (data.serials.length === 1) {
        $('#txtUsername').val(data.serials[0].serial)
    } else {
        $('#coupon-number-verify').addClass('branch-more-box')
        data.serials.forEach(function (serial, index) {
            $('.branch-input-list input').get(index).value = serial.serial
        })
    }

    var
    timer

    timer = setInterval(function () {
        if ($('.Msg-box').size() > 0) {
            clearInterval(timer)
            $('.Msg-box').each(function (index, box) {
                if ($(box).hasClass('Msg-box-err')){
                    data.serials[index].result = false
                } else {
                    data.serials[index].result = true
                }
            })
            socket.emit('verify', data)
            window.location.reload()
        }
    }, 1000)
})

function onBump() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var data = {
            id: "" + loginTime.getTime() + Date.now(),
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            type: 'shop',
            isEDIANPINGCOM: true
        }
        socket.emit('bump', data)
    })
}

$(function () {
    $(document.body).keypress(function (evt) {
        if (evt.which === 32) {
            evt.preventDefault()
            onBump()
        }
    })
})

