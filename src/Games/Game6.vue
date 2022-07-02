<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="gameMethods.changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" ></ExerciseInstruction>
    </div>
    <!-- 1) Jugar categorias -->
    <div  v-show="$store.state.gameState==gameValues.showWordsCompleteCategories">
      <Game @finishCheck="gameMethods.nextLocalState();" @firstLetter="gameMethods.saveTime(parseFloat($store.state.currentExercise),gameValues.actionStartInteracting,$store.state.intent + 1)" :id="this.id" ></Game>
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
  name: 'MyGame6',
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
      explicationWord_introduction: "En los ejercicios anteriores se presentaron palabras pertenecientes a dos categorías.",
      explicationWord_outcome: "A continuación escriba la categoría que falta en los lugares donde se encontraba la palabra.",
      explicationWord_end: "Debe escribir el nombre de la categoria, NO de la palabra. Las categorías posibles son: "+this.$store.state.firstCategory+", "+this.$store.state.secondCategory+".",
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
}
</script>

<style scoped>

</style>
