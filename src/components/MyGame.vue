<template>
    <v-app fluid style="height: 100vh;">
      <v-row  :key="col" v-for="col in 2" >
        <v-col class="row" :key="row" v-for="row in 2">
          <MyQuadrantVue :quadrant="quadrants[(row-1)+(col-1)*2]"
                         :defaultCorrect="!quadrants[(row-1)+(col-1)*2].showWord"
                         :check="this.check"
                         :help="this.help"
                         @wordCorrect="addCorrectWord"
                         @idCorrect="addIdCorrect"
                         @writeWord="addLetter"
                         @wordIncorrect="addIncorrectWord"
                         @defaultWord="addDefaultWord"/>
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
      idsCorrect : 0,
      wordsCorrect:0,
      writeLetters:0,
      wordsChecked:0,
      idsChecked:0,
    }
  },
  methods: {
    //Seteo la cantidad de palabras que no son necesarias escribir
    setCorrectWords: function () {
      for (let i = 0; i < this.quadrants.length; i++) {
        if (!this.quadrants[i].showWord) {
          this.wordsCorrect++;
        }
      }
    },
    //Seteo la cantidad de ids que no son necesarios escribir
    setCorrectIds: function () {
      for (let i = 0; i < this.quadrants.length; i++) {
        if (!this.quadrants[i].showId) {
          this.idsCorrect++;
        }
      }
    },
    //Añado el tiempo de escritura de la primer letra de una palabra
    addLetter: function () {
      this.writeLetters = this.writeLetters + 1;
      // console.log(this.writeLetters);
      if (this.writeLetters == 1) {
        this.$emit('firstLetter');
      }
    },
    //Añado palabra correcta y sumo 1 a la cantidad de palabras chequeadas
    addCorrectWord: function () {
      this.wordsCorrect = this.wordsCorrect + 1;
      this.wordsChecked +=1;
      console.log("words correct = "+this.wordsCorrect+" \nwords Checked = "+this.wordsChecked);
      if (this.wordsChecked != 4 && this.wordsCorrect == 4){
        this.finishCheck(true);
      }
    },
    //Añado palabra chequeada
    addIncorrectWord: function () {
      console.log("añado incorrecta");
      this.wordsChecked+=1;
    },
    //Añado id correcto y una palabra chequeada
    addIdCorrect: function () {
      this.idsCorrect += 1;
      // agregar sonido de audio
      this.idsChecked += 1;
      console.log("ids correct = "+this.idsCorrect+" \nids Checked = "+this.idsChecked);
      if (this.idsChecked != 4 && this.idsCorrect == 4){
        this.finishCheck(true);
      }
    },
    addDefaultWord: function(){
      //Añado la palabra por defecto solo si no todas estan bien, para no tener problemas de hacer chequeos dobles
      if (this.wordsCorrect !== 4){
        console.log("add default word");
        this.wordsChecked +=1;
      }
    },
    finishCheck : function(response) {
      this.$store.commit('changeCorrectResponse',response);
      this.restoreVariables();
      this.$emit('finishCheck');
    },
    restoreVariables: function() {
      this.wordsCorrect = 0;
      this.setCorrectWords();
      this.idsCorrect = 0;
      this.setCorrectIds();
      console.log("Se restauraron las x variables \n correct words = "+this.wordsCorrect+" \n ids correct = "+this.idsCorrect);
      this.wordsChecked = 0;
    },
  },

  watch:{
    //Se fija constantemente si las 4 palabras ya fueron chequeadas y si las 4 son correctas, la response es true
    wordsChecked(){
      if (this.wordsChecked == 4){
        if (this.wordsCorrect == 4){
          this.finishCheck(true);
        }
        else{
          this.finishCheck(false);
        }
      }
    },
    idsChecked(){
      console.log("ids checked = "+this.idsChecked);
      if (this.idsChecked == 4){
        if (this.idsCorrect == 4){
          this.finishCheck(true);
        }
        else{
          this.finishCheck(false);
        }
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
