<template>
  <div class="container">

    <h1>Tic Tac Toe</h1>
    <div class="play-area">
      <div id="block_0" class="block" @click="draw(0)">{{ content[0] }}</div>
      <div id="block_1" class="block" @click="draw(1)">{{ content[1] }}</div>
      <div id="block_2" class="block" @click="draw(2)">{{ content[2] }}</div>
      <div id="block_3" class="block" @click="draw(3)">{{ content[3] }}</div>
      <div id="block_4" class="block" @click="draw(4)">{{ content[4] }}</div>
      <div id="block_5" class="block" @click="draw(5)">{{ content[5] }}</div>
      <div id="block_6" class="block" @click="draw(6)">{{ content[6] }}</div>
      <div id="block_7" class="block" @click="draw(7)">{{ content[7] }}</div>
      <div id="block_8" class="block" @click="draw(8)">{{ content[8] }}</div>

    </div>
    <h2 id="winner" v-if="gameOver" >The winner is {{ winner }}</h2>
    <h2 id="tie" v-if ="isTie">The game is a tie!</h2>
    <button @click="resetBoard()" v-if="gameOver || isTie">RESET BOARD</button>

  </div>
</template>

<script>


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
      isTie:false
    }
  },

  methods: {
    draw(index) {
      //if this is true mark as X
      if (this.turn) {
        this.content[index] = "X"
      }
      // else mark as O
      else {
        this.content[index] = "O"
      }
      //switch turn
      this.turn = !this.turn;
      this.calculateWinner();
      this.calculateTie();
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
        console.log(WINNNING_CONDITIONS[0] +  " first index");
        console.log(WINNNING_CONDITIONS[i]+ " second index");
       
        if(this.content[firstIndex] == this.content[secondIndex] &&
          this.content[firstIndex] == this.content[thirdIndex] &&
        this.content[firstIndex] != "") {
          this.gameOver = true;
          this.winner = this.content[firstIndex];
         
        }
        
      }
    },
    calculateTie(){
      for (let index = 0; index <= 8; index++) {
        if(this.content[index] == ""){
         return
        }
       
      }
        this.isTie = true;
    },
    resetBoard(){
      for (let index = 0; index <= 8; index++) {
        this.content[index] = "";
      
        
      }
        this.gameOver = false;
        this.winner = null;
        this.isTie = false;
    }

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
  background: #eee;
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
  border: 3px solid black;
  transition: background 0.2s ease-in-out;
}

.block:hover {
  cursor: pointer;
  background: #0ff30f;
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
  background: green;
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
