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

describe("Testing client-serverss connectivity", () => {

   
})
describe("Testing game functionality", () => {



    it("Should receive true if player 1 is pressing start button", (done) => {
        const socket = io(serverURL);
        socket.on("player 1 ready", (body) => {
            assert(body);
            socket.disconnect();
            done();
        })
     


    })

 




    it("Should receive true if player 2 pressed start button", (done) => {
        const socket = io(serverURL);
        socket.on("Player 2 ready start game", (body) => {
            assert(body);
            socket.disconnect();
            done();
        })


    })

    it("Should receive turn msg when any of the player places X or O", (done) => {
        const socket = io(serverURL);
        socket.on("turn", (body) => {
            assert.equal(body, "YOUR TURN");
            socket.disconnect();
            done();
        })


    })

    it("testing the connection client1-server", (done) => {
        const socket = io(serverURL);
        socket.on("emit to the server", (body) => {
            console.log(body);
            assert.equal(body, "emited to server");

            socket.disconnect();
            done();
        })

    })

    it("testing the connection client2-server", (done) => {
        const socket = io(serverURL);
        socket.on("emit back to server", (body) => {
            assert.equal(body, "emited back to server");
            socket.disconnect();
            done();
        })

    })


    it("Should receive play msg ", (done) => {
        const socket = io(serverURL);
        socket.on("play", (body) => {
            assert(body);
            socket.disconnect();
            done();
        })

    })

    it("Should disable grid for player 2 on first move", () => {
        const socket = io(serverURL);
        socket.on("disaple grid for other player", (body) => {
            assert(body);
            socket.disconnect();
            done();
        })
    })



    it("Should have a winner before game over", (done) => {
        const socket = io(serverURL);
        socket.on("Winner", (body) => {
            assert.equal(body, "Game over");
            socket.disconnect();
            done();
        })

    })

    it("Should be able to reset both play grids", (done) => {
        const socket = io(serverURL);
        socket.on("resetOtherGrid", (body) => {
            assert(body);
            socket.disconnect();
            done();
        })

    })

    //test grid reset functionality

})