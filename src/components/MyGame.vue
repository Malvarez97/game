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
  created() {
    this.getCorrectWords();
    this.getCorrectIds();
  },
  data() {
    return {
      secondOportunity:false,
       idCorrect : 0,
      wordCorrect:0,
       quadrantId : "",
       word : "",
      writeLetters:0,
    }
  },
  methods: {
    getCorrectWords :function (){
      for (let i=0; i<this.quadrants.length; i++)
      {
        if (!this.quadrants[i].showWord)
        {
          this.wordCorrect++;
        }
      }
    },
    getCorrectIds :function (){
      for (let i=0; i<this.quadrants.length; i++)
      {
        if (!this.quadrants[i].showId)
        {
          this.idCorrect++;
        }
      }
    },
    addLetter: function(){
      this.writeLetters=this.writeLetters+1;
     // console.log(this.writeLetters);
        if(this.writeLetters==1) {
          this.$emit('firstLetter');
        }
    },
    addWordCorrect: function () {
      this.wordCorrect = this.wordCorrect + 1;
      console.log('este es el id'+this.wordCorrect)
      if (this.wordCorrect === 4) {
        // agregar sonido de audio
        this.$emit('finishWord');
      }
    },
    addIdCorrect: function () {
      this.idCorrect = this.idCorrect + 1;
      console.log('este es el id'+this.idCorrect)
      if (this.idCorrect === 4) {
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
