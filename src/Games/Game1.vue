<template>
  <v-app >
    <!-- Explicaciones del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation || $store.state.gameState==gameValues.secondPartExplanation" >
      <ExerciseInstruction @finishExplanation="gameMethods.changeValues();" ></ExerciseInstruction>
    </div>
    <!-- Pantallas de juego -->
    <div  v-show="$store.state.gameState == gameValues.showAll ||
                  $store.state.gameState==gameValues.showWordsAndIds ||
                  $store.state.gameState==gameValues.completeWords ||
                  $store.state.gameState==gameValues.completeIds ||
                  $store.state.gameState==gameValues.draggable ||
                  $store.state.gameState==gameValues.highlightWrongValues ||
                  $store.state.gameState==gameValues.showIdsCompleteWords ||
                  $store.state.gameState==gameValues.buttons ||
                  $store.state.gameState==gameValues.showWordsCompleteCategories ||
                  $store.state.gameState==gameValues.showWordsCompleteIds ||
                  $store.state.gameState==gameValues.showIdsShowWordsCompleteWords">
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
    //Id de cada juego para poder cargar los cuadrantes correctamente en el store
    id: String,
  },
  data() {
    return {
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
}
</script>

<style scoped>

</style>
