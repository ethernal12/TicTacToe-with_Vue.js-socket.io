
const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    
    socket.on("play", index => {

        socket.broadcast.emit("play", index);
        socket.broadcast.emit("turn", "YOUR TURN");


    })
    // broadcast hide button to other client
    socket.on("startGame", bool => {

        socket.broadcast.emit("startGame", bool);
    })
    socket.on("boardReseted", reseted => {
       
        //broadcast  board reseted from other player
        socket.broadcast.emit("boardReseted", reseted);
    })
    socket.on("startGameButton", buttonVisible => {

        //broadcast button visible after reset board
        socket.broadcast.emit("startGameButton", buttonVisible);
    })
    socket.on("player 1 ready", isReady => {

        //emit to player 2 that player 1 is ready
        socket.broadcast.emit("player 1 ready", isReady);
    })
    socket.on("Player 2 ready start game", isReady => {

        //emit to player 1 that player 2 is ready
        socket.broadcast.emit("Player 2 ready start game", isReady);
    })
   
    socket.on("other player has reseted board", isReady => {

        //emit to player 1 that player 2 is ready
        socket.broadcast.emit("other player has reseted board", isReady);
    })

    socket.on("disaple grid for other player", disable => {

        //emit to disable grid for other player
        socket.broadcast.emit("disaple grid for other player", disable);
    })


})



server.listen(3000, () => {
    console.log("is listenig at port 3000");
})

