<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <!-- 2) Show words complete ids -->
    <div  v-show="$store.state.gameState==gameValues.showWordsCompleteIds">
      <Game @finishCheck="nextLocalState();" @firstLetter="gameMethods.saveValue(parseFloat(this.exerciseNumber,10),'start interacting',this.intentWord+1)" :id="this.id" ></Game>
      <v-btn  outline @click="changeValues();" rounded class="btn-global nextposition" color="#E74C3C" >
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
    <!-- Pantalla de felicitaciones  -->
    <div v-show="$store.state.gameState==gameValues.congratulationsScreen" >
      <ExerciseInstruction :win="true" @finishExplanation="changeGameState(0); changeGeneralState(1); saveValue(this.exerciseNumber+this.subExerciseNumber,'nose');" :introduction="congratulations_introduction" :outcome="congratulations_outcome" :exerciseNumber="congratulations_title" :subExerciseNumber=".1"  ></ExerciseInstruction>
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
  name: 'MyGame8',
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
      explicationWord_introduction: "Complete las letras que identifican cada cuadrante como estaban en los últimos ejercicios.",
      explicationWord_outcome: "",
      explicationWord_end: "",
      congratulations_title:"¡Felicitaciones!",
      congratulations_introduction:"¡Ha completado con éxito los ejercicios!.",
      congratulations_outcome:"A continuación debe presionar el botón si quiere comenzar una nueva partida",
      gameValues:GameValues,
      gameMethods:GameMethods,
      hintAttempt:2,
      limitAttempts:3,
    }
  },
  methods: {
    nextLocalState() {
      this.intentWord += 1;
      //Si la respuesta es correcta
      if (GameMethods.getCorrectResponse()){
        GameMethods.reproduceAudio('victory');
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish correct",this.intentWord);
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish work",this.intentWord);
        this.intentWord = 0;
        //Si el usuario contesta correctamente se pasa al ejercicio siguiente
        this.transition(GameValues.correctTransition,GameValues.congratulationsScreen);
      }
      //Si fue incorrecta
      else {
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish failure",this.intentWord);
        if (this.intentWord < this.hintAttempt) {
          GameMethods.reproduceAudio('mistake');
          this.transition(GameValues.incorrectTransition, GameValues.showWordsCompleteIds);
        }
        else{
          if (this.intentWord == this.hintAttempt){
            //GameMethods.reproduceAudio('hint');
            //GameMethods.showWarning();
            this.transition(GameValues.incorrectTransition, GameValues.showWordsCompleteIds);
            GameMethods.changeHelp();
            GameMethods.setAlert(GameValues.warningIcon,GameValues.defaultWarningTitle,"");
          }
          //Si es el error numero 3
          else {
            GameMethods.reproduceAudio('error');
            //GameMethods.showError(GameValues.loseGame14);
            this.intentWord = 0;
            this.transition(GameValues.incorrectTransition, GameValues.firstPartExplanation);
            //GameMethods.changeGeneralState(GameValues.loseGame14);
            GameMethods.setNextGeneralState(GameValues.loseGame14);
            GameMethods.setAlert(GameValues.errorIcon,GameValues.defaultErrorTitle+GameValues.loseGame14,"");
          }
        }
      }
    },
    transition : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
        case GameValues.showWordsCompleteIds:
          if (nextGameState==GameValues.showWordsCompleteIds){
            GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          }
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          break;
      }
    },
    changeValues: function () {
      switch (GameMethods.getGameState()) {
          //Descripcion inicial del ejercicio
        case GameValues.firstPartExplanation:
          GameMethods.changeState(GameValues.showWordsCompleteIds);
          GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          GameMethods.setTypeExercise(GameValues.game9Type);
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
