<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="gameMethods.changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" ></ExerciseInstruction>
    </div>
    <div v-show="$store.state.gameState==gameValues.secondPartExplanation" >
      <ExerciseInstruction @finishExplanation="gameMethods.changeValues();" :introduction="explication_nextGames" ></ExerciseInstruction>
    </div>
    <!-- 1) Mostrar palabras -->
    <div  v-show="$store.state.gameState == gameValues.showAll">
      <Game :id="this.id" ></Game>
      <v-btn  outline @click="gameMethods.changeValues();" rounded class="btn-global nextposition" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- 2) Completar palabra 6)Completar palabra con ayuda -->
    <div  v-show="$store.state.gameState==gameValues.showIdsShowWordsCompleteWords ">
      <Game @finishCheck="gameMethods.nextLocalState();" @firstLetter="gameMethods.saveTime(parseFloat($store.state.currentExercise),gameValues.actionStartInteracting,$store.state.intent+1)" :id="this.id" ></Game>
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
    id: String,
  },
  data() {
    return {
      explicationWord_introduction: "Trate de recordar lo escrito en cada cuadrante.",
      explicationWord_outcome: "Tenga en cuenta con que letra se identifica cada cuadrante.",
      explicationWord_end: "A continuación debe escribir el nombre faltante.",
      explication_nextGames: "Escriba el nombre que desaparece en la pantalla.",
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
}
</script>

<style scoped>


</style>
