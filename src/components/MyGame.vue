<template>
    <v-app >
      <v-row  class="col" :key="col" v-for="col in 2" >
        <v-col class="row" :key="row" v-for="row in 2">
          <MyQuadrantVue :quadrant="this.$store.state.quadrantsArrangement[parseInt(this.id,10)][(row-1)+(col-1)*2]"
                         :idMyGame="this.id"
                         :idQuadrant="(row-1)+(col-1)*2"
                         @wordCorrect="addCorrectWord"
                         @idCorrect="addIdCorrect"
                         @idIncorrect="addIdIncorrect"
                         @writeLetter="addLetter"
                         @wordIncorrect="addIncorrectWord"
                         @defaultWord="addDefaultWord"
                         @setWordsAndIds="setCorrectWordsAndIds"
                         @quadrantCreated="addQuadrantCreated"
                         @correctClick="addCorrectClick"
                         @incorrectClick="addIncorrectClick"
                         @checkDrag="addDragCheck"
                         @setCorrectWord="setCorrectWord"/>
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
    id: String,
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
      quadrantsCreated:0,
      correctClick:0,
      clicks:0,
      correctDrag:0,
      dragsChecked:0,
    }
  },
  methods: {
    setPause: function(){
      this.$store.commit('setPause');
    },
    addQuadrantCreated: function(){
      this.quadrantsCreated+=1;
    },
    addCorrectClick: function(){
      this.correctClick += 1;
      if (this.correctClick == 2){
        this.finishCheck(true);
      }
    },
    addIncorrectClick: function(){
      this.clicks+=1;
      this.finishCheck(false);
    },
    //Seteo la cantidad de palabras que no son necesarias escribir
    setCorrectWordsAndIds: function () {
      if (this.quadrantsCreated == 4){
        for (let i = 0; i < 4; i++) {
          //Seteo las words
          //console.log("seteo "+this.id+" "+i);
          //console.log(this.$store.state.quadrantsMatrix[this.id*4+i].quadrant);
          if (!this.$store.state.quadrantsMatrix[this.id*4+i].quadrant.showWord) {
            //console.log("es falsa la word");
            this.wordsCorrect+=1;
            this.$store.state.quadrantsMatrix[this.id*4+i].defaultCorrect = true;
            this.$store.state.quadrantsMatrix[this.id*4+i].correct = true;
          }
          //Seteo las ids
          if (!this.$store.state.quadrantsMatrix[this.id*4+i].quadrant.showId) {
            //console.log("es falsa la id");
            this.idsCorrect+=1;
            this.$store.state.quadrantsMatrix[this.id*4+i].defaultCorrect = true;
            this.$store.state.quadrantsMatrix[this.id*4+i].correct = true;

          }
        }
      }
    },
    //Añado el tiempo de escritura de la primer letra de una palabra
    addLetter: function () {
      this.writeLetters = this.writeLetters + 1;
      console.log("Se emite write letters");
      console.log("Valor = "+this.writeLetters);
      // console.log(this.writeLetters);
      if (this.writeLetters == 1) {
        console.log("Es la primera letra");
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
    addIdIncorrect: function () {
      // agregar sonido de audio
      this.idsChecked += 1;
    },
    addDefaultWord: function(){
      //Añado la palabra por defecto solo si no todas estan bien, para no tener problemas de hacer chequeos dobles
      if (this.wordsCorrect !== 4){
        console.log("add default word");
        this.wordsChecked +=1;
      }
    },
    setCorrectWord(correct){
      if (correct){
        console.log('Seteo la palabra como correcta');
        this.wordsCorrect +=1;
      }
      else{
        console.log('Seteo la palabra como incorrecta');
        this.wordsCorrect -=1;
      }
    },
    addDragCheck : function(correctDrag){
      this.dragsChecked += 1;
      if (correctDrag){
        this.correctDrag += 1;
      }
      if (this.dragsChecked == 4){
        if (this.correctDrag == 4){
          this.finishCheck(true);
        }
        else{
          if (this.$store.state.dragEnd){
            this.finishCheck(false);
          }
          else{
            this.restoreVariables();
          }
        }
      }
    },
    finishCheck : function(response) {
      this.$store.commit('changeCorrectResponse',response);
      this.restoreVariables();
      console.log("Se emite finishcheck");
      console.log("estado actual = "+this.$store.state.gameState);
      this.$emit('finishCheck');
    },
    restoreVariables: function() {
      this.wordsCorrect = 0;
      this.idsCorrect = 0;
      this.setCorrectWordsAndIds();
      console.log("Se restauraron las x variables \n correct words = "+this.wordsCorrect+" \n ids correct = "+this.idsCorrect);
      this.wordsChecked = 0;
      this.idsChecked = 0;
      this.correctClick = 0;
      this.correctDrag = 0;
      this.dragsChecked = 0;
      this.writeLetters = 0;
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

<style scoped>
.row {
  height: 50vh;
  width: 50vw;
  background-color: #2C3E50;
  border:white;
  border:2px solid greenyellow;
}



</style>
