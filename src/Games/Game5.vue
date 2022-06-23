<template>
  <v-app fluid class="container">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber"  ></ExerciseInstruction>
    </div>
    <!-- 1) Buttons -->
    <div  v-show="$store.state.gameState==gameValues.buttons">
      <Game @finishCheck="nextLocalState();" @firstLetter="gameMethods.saveValue(parseFloat(this.exerciseNumber,10),'start interacting',this.intentWord+1)" :id="this.id" ></Game>
      <v-btn  outline @click="changeValues();" class="btn-global nextposition" color="#E74C3C" >
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
  name: 'MyGame5',
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
      explicationWord_introduction: "Haga click en aquellas palabras que no aparecieron previamente",
      explicationWord_outcome: "",
      explicationWord_end: "",
      limitAttempts:3,
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
  methods: {
    nextLocalState() {
      this.intentWord += 1;
      GameMethods.changeButtonEnd(false);
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
          GameMethods.reproduceAudio('mistake');
          this.transition(GameValues.incorrectTransition,GameValues.buttons);
        }
        //Si es el ultimo intento
        else{
          GameMethods.reproduceAudio('error');
          GameMethods.showError(GameValues.loseGame8);
          this.intentWord = 0;
          this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation);
          GameMethods.changeGeneralState(GameValues.loseGame8);
          }
        }
    },
    transition : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
          //Estado de completar ids
        case GameValues.buttons:
          GameMethods.restore();
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          if (nextGameState == GameValues.buttons){
            GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          }
          break;
      }
    },
    changeValues: function () {
      switch (GameMethods.getGameState()) {
          //Descripcion inicial del ejercicio
        case GameValues.firstPartExplanation:
          GameMethods.changeState(GameValues.buttons);
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



</style>
