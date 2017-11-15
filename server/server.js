var express = require('express'),
    app = express(),
    redis = require('redis'),
    http = require('http'),
    socketIo = require('socket.io')

var server = http.createServer(app)
var io = socketIo.listen(server)
var redisClient = redis.createClient('6379', '127.0.0.1')

io.set('origins', '*:*')
server.listen(3000)
app.use(express.static(__dirname + '/public'))
console.log("Server running on 170.0.0.1:3000")

io.on('connection', function(socket) {
    redisClient.lrange('motiflist', 0, -1, function(err, reply){
        socket.emit('init_page', { 
            page : reply 
        })
    })
    
    socket.on('draw_motif', function(data) {
        var intKey = redisClient.incr("motifId")
        var motifKey = 'motif' + intKey

        redisClient.hmset(motifKey, data.motif)
        redisClient.rpush(['motiflist', motifKey])

        io.emit('draw_motif', { motif: data.motif })
    })
    socket.on('clear_page', function(data){
        redisClient.lrange('motiflist', 0, -1, function(err, reply){
            redisClient.hdel(reply)
            redisClient.ltrim('motiflist', 0, 0)
        })
        io.emit('clear_page', {clearer: data.clearer})
    })
})
