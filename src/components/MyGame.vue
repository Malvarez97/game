<template>
  <v-app fluid style="height: 100vh;">
    <v-row  :key="col" v-for="col in 2" >
      <v-col class="row" :key="row" v-for="row in 2">
        <MyQuadrantVue :state=this.state
                       :quadrant="quadrants[(row-1)+(col-1)*2]"
                       :check="this.check" @wordCorrect="addWordCorrect" @idCorrect="addIdCorrect" @writeWord="addLetter" :inputhelp="a" />
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
    state: {
      default: 0,
      type: Number,
    },
    Correct: Number,
    inputHelp:String,
    quadrants:Array,
    check:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      secondOportunity:false,
       numberCorrectWords : 2,
        numberidCorrects:4,
       quadrantId : "",
       word : "",
      wordCorrect: 0,
      idCorrect:0,
      writeLetters:0,
    }
  },
  methods: {
    addLetter: function(){
      this.writeLetters=this.writeLetters+1;
     // console.log(this.writeLetters);
        if(this.writeLetters==1) {
          this.$emit('firstLetter');
        }
    },
    addWordCorrect: function () {
      this.wordCorrect = this.wordCorrect + 1;
      console.log("se anadio "+this.wordCorrect);
      if (this.wordCorrect == this.numberCorrectWords) {
        // agregar sonido de audio
        this.$emit('finishWord');
      }
    },
    addIdCorrect: function () {
      this.idCorrect = this.idCorrect + 1;
      if (this.idCorrect == this.numberidCorrects) {
        // agregar sonido de audio
        this.$emit('finishId');
      }
    },
  }
}
</script>

<style scoped>
.row {
  background-color: #2C3E50;
  border:white;
  border:2px solid greenyellow;
}

</style>
