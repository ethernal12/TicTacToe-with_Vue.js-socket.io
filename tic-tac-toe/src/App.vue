<template>
  <div class="container">
    <div id="boarder">
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

      <h2 class="playerReady">{{ playerReady }}</h2>
      <h2 id="winner" v-if="gameOver">The winner is {{ winner }}</h2>
      <h2 id="tie" v-if="isTie">The game is a tie!</h2>
      <h2 id="boardReseted">{{ displayBoardReset }}</h2>
      <button @click="resetBoard()" v-if="gameOver || isTie">RESET GRID</button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:3000");
//disable grid before pressing start onload
window.addEventListener('load', () => {

  for (let index = 0; index <= 8; index++) {
    document.getElementById(`block_${index}`).style.pointerEvents = "none";
  }

});

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

          for (let index = 0; index <= 8; index++) {
            document.getElementById(`block_${index}`).style.pointerEvents = "visibleFill";
            socket.emit("disaple grid for other player", false);
          }

        } else {

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

          for (let index = 0; index <= 8; index++) {
            document.getElementById(`block_${index}`).style.pointerEvents = "none";
            socket.emit("disaple grid for other player", false);
          }

        } else {

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
        // diagonals winning conditions
        [2, 4, 6], [0, 4, 8]

      ]

      for (let i = 0; i < WINNNING_CONDITIONS.length; i++) {
        let firstIndex = WINNNING_CONDITIONS[i][0];
        let secondIndex = WINNNING_CONDITIONS[i][1];
        let thirdIndex = WINNNING_CONDITIONS[i][2];


        if (this.content[firstIndex] == this.content[secondIndex] &&
          this.content[firstIndex] == this.content[thirdIndex] &&
          this.content[firstIndex] != "") {
          socket.emit("Winner", "Game over");
          this.gameOver = true;
          this.winner = this.content[firstIndex];
          // if game is over player1 can reset his board
          this.player1Ready = true;
          // when game is over make grid disable for both players
          for (let index = 0; index <= 8; index++) {
            document.getElementById(`block_${index}`).style.pointerEvents = "none";
          }

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
        // when game is a tie make grid disable for both players
          for (let index = 0; index <= 8; index++) {
            document.getElementById(`block_${index}`).style.pointerEvents = "none";
          }
      }
    },
    resetBoard() {


      //reset board for player 1
      if (this.player1Ready) {
        for (let index = 0; index <= 8; index++) {
          this.content[index] = "";
          this.gameOver = false;
          this.winner = null;
          this.isTie = false;
          this.player1Ready = false;
          this.player2Ready = false;

        }

        document.getElementById('start').style.visibility = 'visible';

        //emit that player 1 has reseted board

        socket.emit("startGameButton", "visible");
        socket.emit("boardReseted", true);

        this.displayTurn = "";

      }
      if (this.player2Ready) {
        for (let index = 0; index <= 8; index++) {
          this.content[index] = "";
          this.gameOver = false;
          this.winner = null;
          this.isTie = false;
          this.player1Ready = false;
          this.player2Ready = false;

        }

        document.getElementById('start').style.visibility = 'visible';

        //emit that player 1 has reseted board



        this.displayTurn = "";

      }



    },
    startgame() {

      if (!this.player1Ready) {

        this.playerReady = "Waiting for other player..";
        //hide start button for player 1
        document.getElementById('start').style.visibility = 'hidden';
        //notify that this player is ready to other player
        socket.emit("player 1 ready", true);
        //potential bug?
        socket.emit("disaple grid for other player", true);

        for (let index = 0; index <= 8; index++) {
          document.getElementById(`block_${index}`).style.pointerEvents = "none";
        }

      }
      // returns from player 1 pressing start button 
      if (this.player1Ready) {

        document.getElementById('start').style.visibility = 'hidden';
        //make grid interactable
        for (let index = 0; index <= 8; index++) {
          document.getElementById(`block_${index}`).style.pointerEvents = "visibleFill";
        }
        // emit that player 2 is ready too, start game
        socket.emit("Player 2 ready start game", true);
        //delete player msg on player 2
        this.displayTurn = "YOUR TURN";
        this.disableGrid = false;
        this.playerReady = "";

      }

    },



  },
  created() {
    // the other player draws X or O 
    socket.on("play", (index) => {

      this.draw(index, true);
    })
    // displays turn switches
    socket.on("turn", (turn) => {
      this.displayTurn = turn;
    })
    // receiving msg that player 1  is ready
    socket.on("player 1 ready", bool => {

      this.player1Ready = bool; // is equal true

      if (this.player1Ready) {

        this.playerReady = "Other player is ready, press start!";


      }
    })
    // player two responds that he is ready for a game
    socket.on("Player 2 ready start game", bool => {
      this.playerReady = "";
      this.player2Ready = bool;

      this.displayTurn = "HIS TURN";



    })
    socket.on("startGameButton", buttonVisible => {
      console.log(buttonVisible);
      this.resetBoard()

    })


    socket.on("boardReseted", bool => {
      // player2 can reset his board


      this.player2Ready = bool;
      // player 2 emiting he has reseted the board and a new game can start

      socket.emit("other player has reseted board", true);
    })
    // palyer has reseted board
    socket.on("other player has reseted board", bool => {

      this.displayBoardReset = "";
      this.boardReseted = bool; // must equal true

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

#boarder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid rgb(250, 249, 249);
  padding: 10px;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(10, 9, 9);
  color: aliceblue;
  border: 3px solid rgb(250, 249, 249);
}

.playerReady {
  color: #0ff30f;
  text-shadow: 1px 1px 4px #4fafeb, 1px 1px 10px #02ff46;
}

#winner {
  color: #ff3a3a;
  text-shadow: 1px 1px 4px #4fafeb, 1px 1px 15px #f70e1d;
}

h1 {
  font-size: 5rem;
  margin-bottom: 0.5em;
  text-shadow: 1px 1px 4px #4fafeb, 1px 1px 10px #28e428;
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
  background: #0abc0a;
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
