<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <!-- 2) Completar palabras 6) Completar palabras con ayuda -->
    <div  v-show="$store.state.gameState==gameValues.showIdsCompleteWords">
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
      explicationWord_introduction: "Escriba los nombres del ejercicio anterior en cada cuadrante.",
      explicationWord_outcome: "",
      explicationWord_end: "",
      gameValues:GameValues,
      gameMethods:GameMethods,
      limitAttempts:3,
      hintAttempt:2,
    }
  },
  methods: {
    nextLocalState() {
      this.intentWord += 1;
      //Si la respuesta es correcta
      if (GameMethods.getCorrectResponse()){
        GameMethods.showCorrect();
        GameMethods.reproduceAudio('success');
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish correct",this.intentWord);
        this.intentWord = 0;
        //Si el usuario contesta correctamente se pasa al ejercicio siguiente
        this.transition(GameValues.correctTransition,GameValues.firstPartExplanation);
        GameMethods.changeGeneralState(GameMethods.getGeneralState() + 1);
      }
      //Si fue incorrecta
      else {
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish failure",this.intentWord);
        if (this.intentWord < this.hintAttempt) {
          GameMethods.reproduceAudio('mistake');
          this.transition(GameValues.incorrectTransition, GameValues.showIdsCompleteWords);
        }
        else{
          if (this.intentWord == this.hintAttempt){
            GameMethods.reproduceAudio('hint');
            GameMethods.showWarning("Último intento. Recibirás una ayuda");
            this.transition(GameValues.incorrectTransition, GameValues.showIdsCompleteWords);
            GameMethods.changeHelp();
          }
          //Si es el error numero 3
          else {
            GameMethods.reproduceAudio('error');
            /*this.showRightAnswer("\nid: " + this.$store.state.responseExercise10.id + " respuesta: " + this.$store.state.responseExercise10.word + "\n" +
                "id: " + this.$store.state.responseExercise11.id + " respuesta: " + this.$store.state.responseExercise11.word + "\n" +
                "id: " + this.$store.state.responseExercise12.id + " respuesta: " + this.$store.state.responseExercise12.word + "\n" +
                "id: " + this.$store.state.responseExercise13.id + " respuesta: " + this.$store.state.responseExercise13.word + "\n");
            */
            this.intentWord = 0;
            this.transition(GameValues.incorrectTransition, GameValues.firstPartExplanation);
            GameMethods.changeGeneralState(GameValues.loseGame13);
          }
        }
      }
    },
    transition : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
        case GameValues.showIdsCompleteWords:
          GameMethods.restore();
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          if (nextGameState == GameValues.showIdsCompleteWords){
            GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          }
          break;
      }
    },
    changeValues: function () {
      switch (GameMethods.getGameState()) {
          //Descripcion inicial del ejercicio
        case GameValues.firstPartExplanation:
          GameMethods.changeState(GameValues.showIdsCompleteWords);
          GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          this.setTypeExercise("words");
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
