
const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket)=> {
   
    socket.on("play2", index => {
        console.log("server received", index);
        socket.broadcast.emit("play", index);
    })
})

server.listen(3000)
console.log("server listening on port 3000")
