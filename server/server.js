var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io')

var server = http.createServer(app)
var io = socketIo.listen(server)
io.set('origins', '*:*')
server.listen(3000)
app.use(express.static(__dirname + '/public'))
console.log("Server running on 170.0.0.1:3000")

var motif_history = []

io.on('connection', function(socket) {
    for (var i in motif_history) {
        socket.emit('draw_motif', { motif: motif_history[i] })
    }
    socket.on('draw_motif', function(data) {
        motif_history.push(data.motif)
        io.emit('draw_motif', { motif: data.motif })
    })
})
