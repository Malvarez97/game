<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation " >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <!-- 1) Draggable -->
    <div  v-show="$store.state.gameState==gameValues.draggable">
      <Game @finishCheck="nextLocalState();" @firstLetter="gameMethods.saveValue(parseFloat(this.exerciseNumber,10),'start interacting',this.intentWord+1)" :id="this.id" ></Game>
      <v-btn outline @click="changeDragEnd(true); changeValues();" rounded class="btn-global nextposition" color="#E74C3C" >
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
    <div  v-show="$store.state.gameState==gameValues.correctTransition">
      <MyResponse :correct="false" ></MyResponse>
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
      explicationWord_introduction: "Modifique las letras en los cuadrantes acomodándolas como eran en los ejercicios anteriores",
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
        GameMethods.changeGeneralState(GameMethods.getGeneralState() + 1);
      }
      //Si fue incorrecta
      else {
        GameMethods.saveValue(parseInt(this.exerciseNumber,10),"finish failure",this.intentWord);
        //Si no fue el ultimo intento
        if (this.intentWord < this.limitAttemps)
        {
          GameMethods.reproduceAudio('mistake');
          this.transitionQuadrant(GameValues.highlightWrongValues,GameValues.draggable);
          // guardo el valor del tiempo del error  del primer fallo de Id
          //this.saveValue('Incorrect Word Intent ' + (parseInt(this.intentWord, 10) + 1), this.exerciseNumber + 'a');
        }
        //Si es el ultimo intento
        else
        {
          console.log("Quinta incorrecta")
          this.intentWord = 0;
          GameMethods.reproduceAudio('error');
          this.transitionGame(GameValues.incorrectTransition,GameValues.firstPartExplanation);
          this.showError(GameValues.loseGame5);
          this.changeGeneralState(GameValues.loseGame5);
        }
      }
    },
    transitionGame : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
          //Estado de arrastrar ids
        case GameValues.draggable:
          GameMethods.restore();
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          break;
      }
    },
    transitionQuadrant : function(waitingState,nextQuadrantState){
      switch(GameMethods.getQuadrantState()){
          //Estado de arrastrar ids
        case GameValues.draggable:
          GameMethods.saveValue(parseInt(this.exerciseNumber,10),"show",this.intentWord+1);
          GameMethods.restore();
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
          GameMethods.setTypeExercise("drag");
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
