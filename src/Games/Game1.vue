<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber="1" ></ExerciseInstruction>
    </div>
    <!-- Explicacion del id -->
    <div v-show="$store.state.gameState==gameValues.secondPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationid" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber="2" ></ExerciseInstruction>
    </div>
    <!-- 2)Mostrar palabras e ids 3)Completar palabras 4)Completar ids -->
    <div  v-show="$store.state.gameState==gameValues.showWordsAndIds || $store.state.gameState==gameValues.completeWords || $store.state.gameState==gameValues.completeIds">
      <Game @finishCheck="nextLocalState();" @firstLetter="gameMethods.saveValue(this.getExerciseNumber,'start interacting',this.intentWord+1)" :id="this.id" ></Game>
      <v-btn  outline @click="changeValues();"  class="btn-global nextposition" color="#E74C3C" >
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
  name: 'MyGame1',
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
      explicationWord_introduction: " Se divide la pantalla en 4 cuadrantes.",
      explicationWord_outcome: " A continuacion trate de recordar la palabra perteneciente a la categoria " + this.category + " y los cuadrantes (letra identificatoria) donde se halla.",
      explicationWord_end: "Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes",
      explicationid: "Escriba las letras que identifican a cada cuadrante",
      subExerciseNumber: 1,
      limitAttemptsWords:3,
      limitAttemptsIds:2,
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
  methods: {
    //Logica de los ejercicios 1 y 2 para avanzar al siguiente estado
    nextLocalState() {
      //Se aniade 1 al intento actual
      this.intentWord = this.intentWord + 1;
      //Si la respuesta fue correcta
      if (GameMethods.getCorrectResponse()){
        GameMethods.reproduceAudio('success');
        GameMethods.saveValue(this.getExerciseNumber(), "finish correct",this.intentWord);
        this.intentWord = 0;
        //Si estamos en el ejercicio de las palabras
        if (GameMethods.getTypeOfExercise() == "words") {
          this.subExerciseNumber = 2;
          this.transition(GameValues.correctTransition,GameValues.secondPartExplanation);
        }
        //Si estamos en el ejercicio de los ids, pasamos al ejercicio siguiente
        else{
          this.subExerciseNumber = 1;
          this.transition(GameValues.correctTransition,GameValues.firstPartExplanation);
          GameMethods.changeGeneralState(GameMethods.getGeneralState()+1);
        }
      }
      //Si fue incorrecta (primera)
      else {
        GameMethods.saveValue(this.getExerciseNumber(),"finish failure",this.intentWord);
        //Si fue el primer intento
          if (this.intentWord == 1) {
            //Si es el ejercicio de las ids, se muestra una advertencia
            if (GameMethods.getTypeOfExercise() == "ids"){
              GameMethods.reproduceAudio('hint');
              GameMethods.showWarning('Último intento.');
              this.transition(GameValues.incorrectTransition,GameValues.completeIds);
            }
            //Si es el ejercicio de las palabras
            else{
              GameMethods.reproduceAudio('mistake');
              this.transition(GameValues.incorrectTransition,GameValues.completeWords);
            }
          }
          //Si fue la segunda incorrecta
          else {
            if (this.intentWord == 2) {
              //Si es el juego de las ids, entonces se vuelve al ej 1
              if (GameMethods.getTypeOfExercise() == 'ids'){
                GameMethods.reproduceAudio('error');
                GameMethods.showError(GameMethods.getGeneralState());
                this.intentWord = 0;
                this.subExerciseNumber = 1;
                this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation);
                GameMethods.changeGeneralState(GameValues.loseGame1);
              }
              //Si es el juego de las palabras, se muestra la ayuda
              else{
                GameMethods.saveValue(this.getExerciseNumber(),"finish failure",this.intentWord);
                GameMethods.reproduceAudio('hint');
                GameMethods.showWarning('Último intento. Recibirás una ayuda');
                this.transition(GameValues.incorrectTransition,GameValues.completeWords);
                GameMethods.changeHelp();
              }
            }
            //Tercera incorrecta. Muestro error
            else {
              GameMethods.reproduceAudio('error');
              GameMethods.showError(GameValues.loseGame1);
              this.intentWord = 0;
              this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation);
              GameMethods.changeGeneralState(GameValues.loseGame1);
            }
          }
        }
      },
    transition : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
        //Estado de completar palabras
        case GameValues.completeWords:
          GameMethods.restore();
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          switch (nextGameState) {
              //Si vuelvo a hacer el ejercicio, guardo el tiempo que comienza el ejercicio
            case GameValues.completeWords:
              GameMethods.saveValue(this.getExerciseNumber(), 'show', this.intentWord+1);
              break;
              //Si paso al siguiente enunciado, guardo el tiempo que comienzo a leer
            case GameValues.secondPartExplanation:
              GameMethods.saveValue(this.getExerciseNumber(), 'start reading', this.intentWord + 1);
              break;
          }
          break;
        //Estado de completar ids
        case GameValues.completeIds:
          GameMethods.restore();
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          if (nextGameState == GameValues.completeIds){
            GameMethods.saveValue(this.getExerciseNumber(),'show',this.intentWord+1);
          }
          break;
      }
    },
    changeValues: function () {
      switch (GameMethods.getGameState()) {
          //Descripcion inicial del ejercicio
        case GameValues.firstPartExplanation:
          GameMethods.changeState(GameValues.showWordsAndIds);
          GameMethods.saveValue(this.getExerciseNumber(),'show',this.intentWord+1);
          GameMethods.setTypeExercise("words");
          break;
        case GameValues.showWordsAndIds:
          GameMethods.changeState(GameValues.completeWords);
          break;
        case GameValues.secondPartExplanation:
          GameMethods.changeState(GameValues.completeIds);
          GameMethods.saveValue(this.getExerciseNumber(),'show',this.intentWord+1);
          GameMethods.setTypeExercise("ids");
          break;
        default:
          GameMethods.checkExercise();
      }
    },
    getExerciseNumber : function () {
      return parseFloat(this.exerciseNumber+'.'+this.subExerciseNumber,10)
    },
  },
}
</script>

<style scoped>

</style>
