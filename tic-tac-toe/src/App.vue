<template>
  <div class="container">

    <h1>Tic Tac Toe</h1>
    <button id="start" @click="startgame()">Start game</button>
    <h2>{{ displayTurn }}</h2>

    <br>
    <div class="play-area">
      <div id="block_0" class="block" @click="draw(0), false">{{ content[0] }}</div>
      <div id="block_1" class="block" @click="draw(1), false">{{ content[1] }}</div>
      <div id="block_2" class="block" @click="draw(2), false">{{ content[2] }}</div>
      <div id="block_3" class="block" @click="draw(3), false">{{ content[3] }}</div>
      <div id="block_4" class="block" @click="draw(4), false">{{ content[4] }}</div>
      <div id="block_5" class="block" @click="draw(5), false">{{ content[5] }}</div>
      <div id="block_6" class="block" @click="draw(6), false">{{ content[6] }}</div>
      <div id="block_7" class="block" @click="draw(7), false">{{ content[7] }}</div>
      <div id="block_8" class="block" @click="draw(8), false">{{ content[8] }}</div>

    </div>

    <h2>{{ playerReady }}</h2>
    <h2 id="winner" v-if="gameOver">The winner is {{ winner }}</h2>
    <h2 id="tie" v-if="isTie">The game is a tie!</h2>
    <h2 id="boardReseted">{{ displayBoardReset }}</h2>
    <button @click="resetBoard()" v-if="gameOver || isTie">RESET BOARD</button>

  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:3000");



export default {
  name: 'App',
  components: {

  },
  data() {
    return {

      content: ["", "", "", "", "", "", "", ""],
      turn: true,
      gameOver: false,
      winner: null,
      isTie: false,
      displayTurn: "",
      ableToPlay: false,
      player1Ready: false,
      player2Ready: false,
      boardReseted: false,
      displayBoardReset: "",
      playerReady: ""
    }
  },

  methods: {
    draw(index, drawFromAnother) {

     
      //if this is true mark as X
      if (this.turn) {
        this.content[index] = "X";
        this.displayTurn = "HIS TURN";
        if (this.disableGrid) {
          console.log(this.disableGrid + " disabled grid x 1");
          for (let index = 0; index <= 8; index++) {
            document.getElementById(`block_${index}`).style.pointerEvents = "visibleFill";
            socket.emit("disaple grid for other player", false);
          }

        } else {
          console.log(this.disableGrid + " disabled grid x 2");
          for (let index = 0; index <= 8; index++) {
            document.getElementById(`block_${index}`).style.pointerEvents = "none";

          }
          socket.emit("disaple grid for other player", true);
        }

      




      }
      // else mark as O
      else {

        this.displayTurn = "HIS TURN";
        this.content[index] = "O";
          // if player one puts his first move it goes to o 1
          if (this.disableGrid) {
          console.log(!this.disableGrid + " disabled grid 0 1");
          for (let index = 0; index <= 8; index++) {
            document.getElementById(`block_${index}`).style.pointerEvents = "none";
            socket.emit("disaple grid for other player", false);
          }

        } else {
         console.log(this.disableGrid + " disabled grid 0 2");
          for (let index = 0; index <= 8; index++) {
            document.getElementById(`block_${index}`).style.pointerEvents = "visibleFill";

          }
          socket.emit("disaple grid for other player", false);
        }
        



      }



      //switch turn
      this.turn = !this.turn;
      this.calculateWinner();
      this.calculateTie();
      if (!drawFromAnother) {
        socket.emit("play", index);
      }

    },
    calculateWinner() {
      const WINNNING_CONDITIONS = [
        // rows winning condition
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // cols winning condition
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // diagonals winnig conditions
        [2, 4, 6], [0, 4, 8]

      ]

      for (let i = 0; i < WINNNING_CONDITIONS.length; i++) {
        let firstIndex = WINNNING_CONDITIONS[i][0];
        let secondIndex = WINNNING_CONDITIONS[i][1];
        let thirdIndex = WINNNING_CONDITIONS[i][2];


        if (this.content[firstIndex] == this.content[secondIndex] &&
          this.content[firstIndex] == this.content[thirdIndex] &&
          this.content[firstIndex] != "") {
          this.gameOver = true;
          this.winner = this.content[firstIndex];


        }

      }
    },
    calculateTie() {
      for (let i = 0; i <= 8; i++) {
        if (this.content[i] == "") {
          return
        }
      }
      if (!this.winner) {

        this.isTie = true;
      }
    },
    resetBoard() {


      //reset board for player 1
      if (!this.boardReseted) {
        for (let index = 0; index <= 8; index++) {
          this.content[index] = "";
          this.gameOver = false;
          this.winner = null;
          this.isTie = false;
          this.player1Ready = false;
          this.player2Ready = false;

        }

        //document.getElementById('start').style.visibility = 'visible';
        this.displayBoardReset = "waiting for other player to reset board";
        //emit that player 1 has reseted board
        socket.emit("boardReseted", true);
        socket.emit("startGameButton", "visible");
        this.displayTurn = "";

      }
      //board has been reseted by player 1 , able to reset for player 2
      if (this.boardReseted) {
        for (let index = 0; index <= 8; index++) {
          this.content[index] = "";
          this.gameOver = false;
          this.winner = null;
          this.isTie = false;
          this.player1Ready = false;
          this.player2Ready = false;

        }

        this.displayBoardReset = "";
        this.displayTurn = "";
        document.getElementById('start').style.visibility = 'visible';
        socket.emit("other player has reseted board", true);
      }





    },
    startgame() {
      console.log("grid disabled " + this.disableGrid )
      if (!this.player1Ready) {

        this.playerReady = "Waiting for other player..";
        //hide start button for player 1
        document.getElementById('start').style.visibility = 'hidden';
        //notify that this player is ready to other player
        socket.emit("player 1 ready", true);
        socket.emit("disaple grid for other player", true);

        for (let index = 0; index <= 8; index++) {
          document.getElementById(`block_${index}`).style.pointerEvents = "none";
        }

      }
      // returns from player 2 pressing start button 
      if (this.player1Ready) {

        document.getElementById('start').style.visibility = 'hidden';
        // emit that player 2 is ready too, start game
        socket.emit("Player 2 ready start game", true);
        //delete player msg on player 2
        this.displayTurn = "YOUR TURN";
        this.disableGrid = false;
        this.playerReady = "";

      }

      if (this.player2Ready) {

        this.displayTurn = "YOUR TURN";


      }


    },



  },
  created() {



    socket.on("play", (index) => {

      this.draw(index, true)
    })
    socket.on("turn", (turn) => {
      this.displayTurn = turn;
    })
    // receiving msg that player 1  is ready
    socket.on("player 1 ready", bool => {

      this.player1Ready = bool;

      if (this.player1Ready) {

        this.playerReady = "other player is ready, press start!";


      }
    })
    // player two responds that he is ready for a game
    socket.on("Player 2 ready start game", bool => {
      this.playerReady = "";
      this.player2Ready = bool;

      this.displayTurn = "HIS TURN";
      //diasble input if not your turn 


    })



    socket.on("boardReseted", reset => {
      // other palyer has reseted board
      this.displayBoardReset = "other player is ready for next game, reset your board to start...";
      this.boardReseted = reset;

      // player 2 emiting he has reseted teh board and a new game can start

    })
    socket.on("other player has reseted board", bool => {
      console.log(bool);
      this.displayBoardReset = "";
      document.getElementById('start').style.visibility = 'visible';


    })
    socket.on("disaple grid for other player", bool => {
      this.disableGrid = bool;



    })

  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(10, 9, 9);
  color: aliceblue;
}

h1 {
  font-size: 5rem;
  margin-bottom: 0.5em;
}

h2 {
  margin-top: 1em;
  font-size: 2rem;
  margin-bottom: 0.5em;
}

.play-area {
  display: grid;
  width: 300px;
  height: 300px;
  grid-template-columns: auto auto auto;
}

.block {
  display: flex;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  border: 3px solid rgb(250, 249, 249);
  transition: background 0.2s ease-in-out;
}

.block:hover {
  cursor: pointer;
  background: #0f3df3;
}

.occupied:hover {
  background: #ff3a3a;
}

.win {
  background: #0ff30f;
}

.win:hover {
  background: #0ff30f;
}

#block_0,
#block_1,
#block_2 {
  border-top: none;
}

#block_0,
#block_3,
#block_6 {
  border-left: none;
}

#block_6,
#block_7,
#block_8 {
  border-bottom: none;
}

#block_2,
#block_5,
#block_8 {
  border-right: none;
}

button {
  color: aliceblue;
  outline: none;
  border: 4px solid green;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  background: none;
  transition: all 0.2s ease-in-out;
}

button:hover {
  cursor: pointer;
  background: rgb(4, 230, 91);
  color: white;
}

.playerWin {
  color: green;
}

.computerWin {
  color: red;
}

.draw {
  color: orangered;
}

@media only screen and (max-width: 600px) {

  h1 {
    font-size: 3rem;
    margin-bottom: 0.5em;
  }

  h2 {
    margin-top: 1em;
    font-size: 1.3rem;
  }
}
</style>
