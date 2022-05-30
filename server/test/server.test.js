const assert = require("assert");
const io = require("socket.io-client");
const serverURL = "ws://localhost:3000";



describe("Testing server connection", () => {

    it("Socket connected", (done) => {

        const socket = io(serverURL);

        
          
        socket.on("connect", () => {
            
            assert(socket.connected);
            socket.disconnect();
            done();
         
        });

    })
   

})
describe("Testing game functionality", () => {

    it("Should receive true if player 1 is pressing start button", (done) =>{
        const socket = io(serverURL);
        socket.on("player 1 ready", (body) => {
            assert(body);
            socket.disconnect();
            done();
        })


    })

    it("Should receive player2 ready if other player pressed start", (done) =>{
        const socket = io(serverURL);
        socket.on("Player 2 ready start game", (body) => {
            assert(body);
            socket.disconnect();
            done();
        })


    })

    it("Should receive play msg", (done) =>{
        const socket = io(serverURL);
        socket.on("play", (body) => {
            assert(body);
           socket.disconnect();
            done();
        })


    })

    it("Should receive turn msg", (done) =>{
        const socket = io(serverURL);
        socket.on("turn", (body) => {
            assert.equal(body, "YOUR TURN");
            socket.disconnect();
            done();
        })
        

    })

})