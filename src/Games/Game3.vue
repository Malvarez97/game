<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation " >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <!-- 1) Draggable -->
    <div  v-show="$store.state.gameState==gameValues.draggable">
      <Game @finishCheck="nextLocalState();" @firstLetter="gameMethods.saveValue(parseFloat(this.exerciseNumber,10),'start interacting',this.intentWord+1)" :id="this.id" ></Game>
      <v-btn outline @click="gameMethods.changeDragEnd(true); changeValues();" rounded class="btn-global nextposition" color="#E74C3C" >
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
    <div  v-show="$store.state.gameState==gameValues.correctTransition">
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
import '../assets/common.scss'
import * as GameMethods from './gamemethods.js';
import * as GameValues from './gamevalues.js';

export default {
  name: 'MyGame3',
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
      explicationWord_introduction: "Modifique las letras en los cuadrantes acomodándolas como eran en los ejercicios anteriores.",
      explicationWord_outcome: "",
      explicationWord_end: "",
      gameValues:GameValues,
      gameMethods:GameMethods,
      limitAttemps:5,
    }
  },
  methods: {
    //avanzar a siguiente estado, se usa para estados correctos
    nextLocalState() {
      this.intentWord += 1;
      GameMethods.changeDragEnd(false);
      //Si la respuesta es correcta
      if (GameMethods.getCorrectResponse()){
        GameMethods.reproduceAudio('success');
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish correct",this.intentWord);
        this.intentWord = 0;
        //Si el usuario contesta correctamente se pasa al ejercicio siguiente
        this.transitionGame(GameValues.correctTransition,GameValues.firstPartExplanation);
        //GameMethods.changeGeneralState(GameMethods.getGeneralState() + 1);
        GameMethods.setNextGeneralState(GameMethods.getGeneralState() + 1);
        //Reordeno las ids por si se vuelve a hacer el ejercicio aparezcan en orden aleatorio
        this.$emit('restoreExercise');
      }
      //Si fue incorrecta
      else {
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish failure",this.intentWord);
        GameMethods.reproduceAudio('error');
        //Si no fue el ultimo intento
        if (this.intentWord < this.limitAttemps)
        {
          this.transitionQuadrant(GameValues.highlightWrongValues,GameValues.draggable);
        }
        //Si es el ultimo intento
        else
        {
          console.log("Quinta incorrecta")
          this.intentWord = 0;
          this.transitionGame(GameValues.incorrectTransition,GameValues.firstPartExplanation);
          //this.changeGeneralState(GameValues.loseGame5);
          GameMethods.setNextGeneralState(GameValues.loseGame5);
          GameMethods.setAlert(GameValues.errorIcon,GameValues.defaultErrorTitle+GameValues.loseGame5,"");
          //Reordeno las ids por si se vuelve a hacer el ejercicio aparezcan en orden aleatorio
          this.$emit('restoreExercise');
        }
      }
    },
    transitionGame : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
          //Estado de arrastrar ids
        case GameValues.draggable:
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          break;
      }
    },
    transitionQuadrant : function(waitingState,nextQuadrantState){
      switch(GameMethods.getQuadrantState()){
          //Estado de arrastrar ids
        case GameValues.draggable:
          GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          GameMethods.waitAndNextQuadrantState(waitingState,nextQuadrantState);
          break;
      }
    },
    changeValues: function () {
      switch (GameMethods.getGameState()) {
          //Descripcion inicial del ejercicio
        case GameValues.firstPartExplanation:
          GameMethods.changeState(GameValues.draggable);
          GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          GameMethods.setTypeExercise(GameValues.game3Type);
          break;
        default:
          GameMethods.checkExercise();
      }
    },
  },
}
</script>

<style lang="scss" scoped>

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
