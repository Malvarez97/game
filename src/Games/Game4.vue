<template>
  <v-app fluid style="height: 100vh;">
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <div v-show="$store.state.gameState==gameValues.secondPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationSecondGame" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
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
  name: 'MyGame4',
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
      explicationWord_introduction: "Escriba en los cuadrantes las palabras pertenecientes a las categorias "+this.category+", anteriormente memorizadas.",
      explicationWord_outcome: "Tenga en cuenta que cambió la posición de las letras.",
      explicationWord_end: "Debe poner las palabras de acuerdo a las letras identificatorias, sin importar la posición de las mismas.",
      explicationSecondGame: "Al igual que en el ejercicio anterior, escriba las palabras pertenecientes a las categorias "+this.category+" anteriormente memorizadas.",
      gameValues:GameValues,
      gameMethods:GameMethods,
      limitAttempts:2,
    }
  },
  methods: {
    nextLocalState() {
      this.intentWord += 1;
      //Si la respuesta es correcta
      if (GameMethods.getCorrectResponse()){
        //Si el usuario contesta correctamente se pasa al ejercicio siguiente
        GameMethods.reproduceAudio('success');
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish correct",this.intentWord);
        this.intentWord = 0;
        if (GameMethods.getGeneralState() == 6){
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
        //Si no fue el ultimo intento
        if (this.intentWord < this.limitAttempts-1)
        {
          GameMethods.reproduceAudio('mistake');
          this.transition(GameValues.incorrectTransition,GameValues.showIdsCompleteWords);
        }
        //Si es el ultimo intento
        else {
          if (this.intentWord == this.limitAttempts-1){
            GameMethods.reproduceAudio('hint');
            GameMethods.showWarning("Último intento. Recibirás una ayuda");
            this.transition(GameValues.incorrectTransition,GameValues.showIdsCompleteWords);
            GameMethods.changeHelp();
          }
          else{
            this.intentWord = 0;
            this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation);
            GameMethods.reproduceAudio('error');
            if (GameMethods.getGeneralState() == 6) {
              //Si perdi en el juego 6 vuelvo al 1
              GameMethods.showError(GameValues.loseGame6);
              GameMethods.changeGeneralState(GameValues.loseGame6);
            }
            else {
              //Si perdi en el juego 7 voy al 6
              GameMethods.showError(GameValues.loseGame7);
              GameMethods.changeGeneralState(GameValues.loseGame7);
            }
          }
        }
      }
    },
    transition : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
          //Estado de completar ids
        case GameValues.showIdsCompleteWords:
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          //Si voy al estado de ayuda
          if(nextGameState==GameValues.showIdsCompleteWords){
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
          GameMethods.setTypeExercise("words");
          break;
        case GameValues.secondPartExplanation:
          GameMethods.changeState(GameValues.showIdsCompleteWords)
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
