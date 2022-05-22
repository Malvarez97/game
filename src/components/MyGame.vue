<template>
  <v-app fluid style="height: 100vh;">
    <v-row  :key="I" v-for="I in 2" >
      <v-col class="row" :key="index" v-for="index in 2">
        <MyQuadrantVue :state=this.state :word=word :quadranId=quadrantId @wordCorrect="addWordCorrect" @idCorrect="addIdCorrect" :inputhelp="a" />
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
    }
  },
  mounted() {
    if (typeof this.quadrants != "undefined") {
      if (this.quadrants.length > 0) {
        this.word=this.quadrants[0].word.valor;
        this.quadrantId=this.quadrants[0].Id;
        console.log(this.quadrants[0].word.valor);
        console.log(this.quadrants[0].Id);
      }}
  },
  methods: {
    addWordCorrect: function () {
      this.wordCorrect = this.wordCorrect + 1;
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
