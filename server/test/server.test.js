const assert = require("assert");
const io = require("socket.io-client");
const serverURL = "ws://localhost:3000";
const timeRoRuntest = 1;

for (i = 0; i < timeRoRuntest; i++) {
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


        it("Should switch x to o", (done) => {
            const socket = io(serverURL);
            socket.on("play", (body) => {
                assert(body);
                socket.disconnect();
                done();
            })

        })

        it("Should disable grid for player 2 on first move", (done) => {
            const socket = io(serverURL);
            socket.on("disaple grid for other player", (body) => {

                assert(body);
                socket.disconnect();
                done();
            })
        })

        it("Should have a winner when game is over", (done) => {

            const socket = io(serverURL);
            socket.on("Winner", (body) => {

                assert(body);
                socket.disconnect();
                done();

            })

        })



        // it("Should have a tie game if there is no winner", (done) => {


        //     const socket = io(serverURL);
        //     socket.on("Is a tie", (body) => {

        //         assert(body);
        //         socket.disconnect();
        //         done();
        //     })

        // })

        it("Should be able to reset both play grids", (done) => {
            const socket = io(serverURL);
            socket.on("resetOtherGrid", (body) => {
                assert(body);
                socket.disconnect();
                done();
            })

        })

    })


}




