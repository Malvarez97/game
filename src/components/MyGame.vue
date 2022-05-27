<template>
  <v-app fluid style="height: 100vh;">
    <v-row  :key="col" v-for="col in 2" >
      <v-col class="row" :key="row" v-for="row in 2">
        <MyQuadrantVue :quadrant="quadrants[(row-1)+(col-1)*2]"
                       :correct="!quadrants[(row-1)+(col-1)*2].showWord"
                       :check="this.check"
                       @wordCorrect="addAndCheckWords"
                       @idCorrect="addIdCorrect"
                       @writeWord="addLetter"
                       :help="this.help"
                       @wordIncorrect="addIncorrectWord"/>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import MyQuadrantVue from "./Quadrant.vue"

export default {
  name: 'MyGame',
  components: {
    MyQuadrantVue
  },
  props: {
    Correct: Number,
     help:{
      type :Boolean,
       default:false,
     },
    quadrants:Array,
    check:{
      type:Boolean,
      default:false,
    }
  },
  created() {
    this.setCorrectWords();
    this.setCorrectIds();
  },
  data() {
    return {
      incorrectWord:0,
      secondOportunity:false,
       idCorrect : 0,
      wordCorrect:0,
      writeLetters:0,
    }
  },
  methods: {
    setCorrectWords: function () {
      for (let i = 0; i < this.quadrants.length; i++) {
        if (!this.quadrants[i].showWord) {
          this.wordCorrect++;
        }
      }
    },
    setCorrectIds: function () {
      for (let i = 0; i < this.quadrants.length; i++) {
        if (!this.quadrants[i].showId) {
          this.idCorrect++;
        }
      }
    },
    addLetter: function () {
      this.writeLetters = this.writeLetters + 1;
      // console.log(this.writeLetters);
      if (this.writeLetters == 1) {
        this.$emit('firstLetter');
      }
    },
    addAndCheckWords: function () {
      this.wordCorrect = this.wordCorrect + 1;
      this.checkWords();
    },
    addIncorrectWord: function () {
      //this.incorrectWord++;
      //if (this.incorrectWord==3){
      //console.log("emiti incorrecto"+this.incorrectWord);
      //this.incorrectWord=0;
      console.log("estoy añadiendo incorrect word");
      this.$store.commit('changeCorrectResponse', false);
      this.$emit('finishCheck');
      //}
    },
    addIdCorrect: function () {
      this.idCorrect = this.idCorrect + 1;
      console.log("Estoy miradno cuantas correct hay "+this.idCorrect);
      if (this.idCorrect === 4) {
        // agregar sonido de audio
        this.$store.commit('changeCorrectResponse',true);
        this.$emit('finishCheck');
      }
    },
    checkWords: function () {
      if (this.wordCorrect === 4) {
        // agregar sonido de audio
        this.$store.commit('changeCorrectResponse', true);
        this.$emit('finishCheck');
      }
    },
  }
}
</script>

<style  scoped>
.row {
  background-color: #2C3E50;
  border:white;
  border:2px solid greenyellow;
}
</style>
