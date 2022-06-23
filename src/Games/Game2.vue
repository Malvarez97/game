<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation " >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <!-- 1) Jugar solo QuadrantId -->
    <div  v-show="$store.state.gameState==gameValues.completeIds">
      <Game @finishCheck="nextLocalState();" @firstLetter="gameMethods.saveValue(parseFloat(this.exerciseNumber,10),'start interacting',this.intentWord+1)" :id="this.id" ></Game>
      <v-btn  outline @click="changeValues();"  rounded class="btn-global nextposition" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Transicion de correcto  -->
    <div v-show="$store.state.gameState==gameValues.correctTransition">
      <Transition :css="false" >
        <div>
          <MyResponse :correct="true"></MyResponse>
        </div>
      </Transition>
    </div>
    <!-- Transicion de incorrecto -->
    <div  v-show="$store.state.gameState==gameValues.incorrectTransition">
      <MyResponse :correct="false" ></MyResponse>
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
  name: 'MyGame2',
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
      correctId: false,
      correctResponse: false,
      intentWord: 0,
      explicationWord_introduction: "Escriba las letras de los cuadrantes en los que aparecieron las palabras de "+this.category,
      explicationWord_outcome: "",
      explicationWord_end: "",
      limitAttempts:3,
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
  methods: {
    nextLocalState() {
      this.intentWord = this.intentWord + 1;
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
        //Si no fue el ultimo intento
        if (this.intentWord < this.limitAttempts) {
          GameMethods.reproduceAudio('mistake');
          this.transition(GameValues.incorrectTransition,GameValues.completeIds);
        }
        //Si es el ultimo intento
        else {
          this.intentWord = 0;
          GameMethods.reproduceAudio('error');
          this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation);
          if (GameMethods.getGeneralState() == 3) {
            //Si perdi en el ejercicio 3 vuelvo al 1
            this.showError(GameValues.loseGame3);
            this.changeGeneralState(GameValues.loseGame3);
          }
          else {
            //Si perdi en el ejercicio 4 voy al 2
            this.showError(GameValues.loseGame4);
            this.changeGeneralState(GameValues.loseGame4);
          }
        }
      }
    },
    transition : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
        //Estado de completar ids
        case GameValues.completeIds:
          GameMethods.restore();
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          if (nextGameState == GameValues.completeIds){
            GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          }
          break;
      }
    },
    changeValues: function () {
      switch (GameMethods.getGameState()) {
          //Descripcion inicial del ejercicio
        case GameValues.firstPartExplanation:
          GameMethods.changeState(GameValues.completeIds);
          GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          GameMethods.setTypeExercise("ids");
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
