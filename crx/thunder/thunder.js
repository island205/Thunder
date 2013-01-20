// socket.io
var
socket, loginTime = ""

socket = io.connect("http://192.168.1.90:3000/")

socket.on('connected', function (data) {
    console.log('connected')
    loginTime = new Date(data)
})

function onBump() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var data = {
            id: "" + loginTime.getTime() + Date.now(),
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            type: 'shop'
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

