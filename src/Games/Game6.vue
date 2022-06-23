<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <!-- 1) Jugar categorias -->
    <div  v-show="$store.state.gameState==gameValues.showWordsCompleteCategories">
      <Game @finishCheck="nextLocalState();" @firstLetter="gameMethods.saveValue(parseFloat(this.exerciseNumber,10),'start interacting',this.intentWord+1)" :id="this.id" ></Game>
      <v-btn  outline @click="changeValues(); saveValue((this.exerciseNumber),'show',intentWord+1);" rounded class="btn-global nextposition" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Transicion de correcto  -->
    <div v-show="$store.state.gameState==gameValues.correctTransition">
      <Transition :css="false" >
        <div>
          <MyResponse :pause="false" :correct="true"></MyResponse>
        </div>
      </Transition>
    </div>
    <!-- Transicion de incorrecto -->
    <div  v-show="$store.state.gameState==gameValues.incorrectTransition">
      <MyResponse :pause="false" :correct="false" ></MyResponse>
    </div>
    <!-- Estado de pausa -->
    <div  v-show="$store.state.gameState==gameValues.pauseScreen">
      <MyResponse :correct=null :pause="true" ></MyResponse>
    </div>
  </v-app>
</template>
<script>

import Game from "@/components/MyGame";
import ExerciseInstruction from "@/components/ExcesiceInstruction";
import MyResponse from "@/components/Response";
import * as GameMethods from './gamemethods.js';
import * as GameValues from './gamevalues.js';

export default {
  name: 'MyGame6',
  components: {
    MyResponse,
    Game,
    ExerciseInstruction,
  },
  props: {
    time: {
      default: 20,
      type: Number,
    },
    category: {
      default: "Categoriarandom "
    },
    exerciseNumber: Number,
    id: String,
  },
  data() {
    return {
      intentWord: 0,
      explicationWord_introduction: "En los ejercicios anteriores se presentaron palabras pertenecientes a dos categorías",
      explicationWord_outcome: "A continuación escriba la categoría que falta en los lugares donde se encontraba la palabra",
      explicationWord_end: "Debe escribir el nombre de la categoria, NO de la palabra. Las categorías posibles son: "+this.$store.state.firstCategory+", "+this.$store.state.secondCategory,
      limitAttempts:3,
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
  methods: {
    nextLocalState() {
      this.intentWord += 1;
      //Si la respuesta es correcta
      if (GameMethods.getCorrectResponse()){
        GameMethods.reproduceAudio('success');
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish correct",this.intentWord);
        GameMethods.showCorrect();
        this.intentWord = 0;
        //Si el usuario contesta correctamente se pasa al ejercicio siguiente
        this.transition(GameValues.correctTransition,GameValues.firstPartExplanation);
        GameMethods.changeGeneralState(GameMethods.getGeneralState() + 1);
      }
      //Si fue incorrecta
      else {
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish failure",this.intentWord);
        //Si no fue el ultimo intento
        if (this.intentWord < this.limitAttempts)
        {
          if (this.intentWord < this.limitAttempts - 1){
            GameMethods.reproduceAudio('mistake');
            this.transition(GameValues.incorrectTransition,GameValues.showWordsCompleteCategories);
          }
          if (this.intentWord == this.limitAttempts - 1){
            GameMethods.reproduceAudio('hint');
            GameMethods.showWarning('Último intento.');
            this.transition(GameValues.incorrectTransition,GameValues.showWordsCompleteCategories);
            GameMethods.changeHelp();
          }
        }
        //Si es el ultimo intento
        else{
          GameMethods.showError(GameValues.loseGame9);
          GameMethods.reproduceAudio('error');
          this.intentWord = 0;
          this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation);
          GameMethods.changeGeneralState(GameValues.loseGame9);
        }
      }
    },
    transition : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
          //Estado de completar ids
        case GameValues.showWordsCompleteCategories:
          GameMethods.restore();
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          if(nextGameState == GameValues.showWordsCompleteCategories) {
            GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          }
          break;
      }
    },
    changeValues: function () {
      switch (GameMethods.getGameState()) {
          //Descripcion inicial del ejercicio
        case GameValues.firstPartExplanation:
          GameMethods.changeState(GameValues.showWordsCompleteCategories);
          GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          GameMethods.setTypeExercise("category");
          break;
        default:
          GameMethods.checkExercise();
      }
    },
  },
}
</script>

<style scoped>

.btn-finish{
  font-size: 3rem;
  color: white;
  padding: 2rem;
  text-transform: none;
  position:absolute;
  left: 70%;
  top:3%;
  width:25%;
  height:8%;
}
</style>
