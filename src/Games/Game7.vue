<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <div v-show="$store.state.gameState==gameValues.secondPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explication_nextGames" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <!-- 1) Mostrar palabras -->
    <div  v-show="$store.state.gameState == gameValues.showAll">
      <Game :id="this.id" ></Game>
      <v-btn  outline @click="changeValues();" rounded class="btn-global nextposition" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- 2) Completar palabra 6)Completar palabra con ayuda -->
    <div  v-show="$store.state.gameState==gameValues.showIdsShowWordsCompleteWords ">
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
  name: 'MyGame7',
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
      explicationWord_introduction: "Trate de reocrdar lo escrito en cada cuadrante.",
      explicationWord_outcome: "Tenga en cuenta con que letra se identifica cada cuadrante.",
      explicationWord_end: "A continuación debe escribir el nombre faltante.",
      explication_nextGames: "Escriba el nombre que desaparece en la pantalla.",
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
        GameMethods.showCorrect();
        GameMethods.reproduceAudio('success');
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish correct",this.intentWord);        this.intentWord = 0;
        //Si el usuario contesta correctamente se pasa al ejercicio siguiente
        if (GameMethods.getGeneralState() == 10 || GameMethods.getGeneralState() == 11){
          this.transition(GameValues.correctTransition,GameValues.secondPartExplanation);
        }
        else{
          this.transition(GameValues.correctTransition,GameValues.firstPartExplanation);
        }
        GameMethods.changeGeneralState(GameMethods.getGeneralState() + 1);
      }
      //Si fue incorrecta
      else {
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish failure",this.intentWord);
        if (this.intentWord == 1) {
            if (GameMethods.getGeneralState() == 12) {
              GameMethods.reproduceAudio('hint');
              GameMethods.showWarning("Último intento. Recibirás una ayuda");
              this.transition(GameValues.incorrectTransition, GameValues.showIdsShowWordsCompleteWords);
              GameMethods.changeHelp();
            }
            else{
              GameMethods.reproduceAudio('mistake');
              this.transition(GameValues.incorrectTransition, GameValues.showIdsShowWordsCompleteWords);
            }
        }
        else{
          if (this.intentWord == 2){
            if (GameMethods.getGeneralState() == 12){
              //this.showRightAnswer(this.$store.state.responseExercise12.word);
              this.intentWord = 0;
              GameMethods.reproduceAudio('error');
              this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation);
              GameMethods.changeGeneralState(GameValues.loseGame12);
            }
            else{
              GameMethods.reproduceAudio('hint');
              GameMethods.showWarning("Último intento. Recibirás una ayuda");
              this.transition(GameValues.incorrectTransition, GameValues.showIdsShowWordsCompleteWords);
              GameMethods.changeHelp();
            }
          }
          //Si es el error numero 3
          else{
            if (GameMethods.getGeneralState() == 10){
              GameMethods.showError(GameValues.loseGame10);
              GameMethods.reproduceAudio('error');
              this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation);
              GameMethods.changeGeneralState(GameValues.loseGame10);
            }
            else{
              //this.showRightAnswer(this.$store.state.responseExercise11.word);
              GameMethods.reproduceAudio('error');
              this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation);
              GameMethods.changeGeneralState(GameValues.loseGame11);
            }
            this.intentWord = 0;
          }
        }
      }
    },
    transition : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
          //Estado de completar ids
        case GameValues.showIdsShowWordsCompleteWords:
          GameMethods.restore();
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          if (nextGameState==GameValues.showIdsShowWordsCompleteWords){
            GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          }
          break;
      }
    },
    changeValues: function () {
      switch (GameMethods.getGameState()) {
          //Descripcion inicial del ejercicio
        case GameValues.firstPartExplanation:
          GameMethods.changeState(GameValues.showAll);
          GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          GameMethods.setTypeExercise("words");
          break;
        case GameValues.showAll:
          GameMethods.changeState(GameValues.showIdsShowWordsCompleteWords);
          break;
        case GameValues.secondPartExplanation:
          GameMethods.changeState(GameValues.showAll);
          GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          GameMethods.setTypeExercise("words");
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
