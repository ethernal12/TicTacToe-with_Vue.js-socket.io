
const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket)=> {
   
    socket.on("play", index => {
        
        socket.broadcast.emit("play", index);
        socket.broadcast.emit("turn", "your turn");
        
        
    })
    // broadcast hide button to other client
    socket.on("startGame", bool => {

        socket.broadcast.emit("startGame", bool);
    })
    socket.on("resetBoard", resetOnce => {
        console.log("reset");
    //broadcast reset board on other client
        socket.broadcast.emit("reset", resetOnce);
    })
    socket.on("startGameButton", buttonVisible => {
        
    //broadcast button visible after reset board
        socket.broadcast.emit("startGameButton",buttonVisible);
    })
   
  
})



server.listen(3000)
console.log("server listening on port 3000")
