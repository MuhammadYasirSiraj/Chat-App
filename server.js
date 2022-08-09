const express = require('express')
const app = express()
const http = require('http').createServer(app)

const port = process.env.port || 3000

http.listen(port, () => {
    console.log('Listening on Port: ' + port)
})

app.use(express.static(__dirname + '/'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//Socket.io

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})