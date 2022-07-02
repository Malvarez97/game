<template>
  <v-app >
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="gameMethods.changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" ></ExerciseInstruction>
    </div>
    <!-- Explicacion del id -->
    <div v-show="$store.state.gameState==gameValues.secondPartExplanation" >
      <ExerciseInstruction @finishExplanation="gameMethods.changeValues();" :introduction="explicationid" ></ExerciseInstruction>
    </div>
    <!-- 2)Mostrar palabras e ids 3)Completar palabras 4)Completar ids -->
    <div  v-show="$store.state.gameState==gameValues.showWordsAndIds || $store.state.gameState==gameValues.completeWords || $store.state.gameState==gameValues.completeIds">
      <Game @finishCheck="gameMethods.nextLocalState();" @firstLetter="gameMethods.saveTime($store.state.currentExercise,gameValues.actionStartInteracting,$store.state.intent+1)" :id="this.id" ></Game>
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
  name: 'MyGame1',
  components: {
    MyResponse,
    Game,
    ExerciseInstruction,
  },
  props: {
    id: String,
  },
  data() {
    return {
      //Explicaciones de los ejercicios que se enviaran como prop a ExerciseInstruction
      explicationWord_introduction: " Se divide la pantalla en 4 cuadrantes.",
      explicationWord_outcome: " A continuacion trate de recordar la palabra perteneciente a la categoria " + this.category + " y los cuadrantes (letra identificatoria) donde se halla.",
      explicationWord_end: "Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes.",
      explicationid: "Escriba las letras que identifican a cada cuadrante.",
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
}
</script>

<style scoped>

</style>
