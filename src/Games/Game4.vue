<template>
  <v-app fluid style="height: 100vh;">
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="gameMethods.changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" ></ExerciseInstruction>
    </div>
    <div v-show="$store.state.gameState==gameValues.secondPartExplanation" >
      <ExerciseInstruction @finishExplanation="gameMethods.changeValues();" :introduction="explicationSecondGame" :outcome="explicationWord_outcome" :end="explicationWord_end" ></ExerciseInstruction>
    </div>
    <div  v-show="$store.state.gameState==gameValues.showIdsCompleteWords">
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
  name: 'MyGame4',
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
      explicationWord_introduction: "Escriba en los cuadrantes las palabras pertenecientes a las categorias "+this.category+", anteriormente memorizadas.",
      explicationWord_outcome: "Tenga en cuenta que cambió la posición de las letras.",
      explicationWord_end: "Debe poner las palabras de acuerdo a las letras identificatorias, sin importar la posición de las mismas.",
      explicationSecondGame: "Al igual que en el ejercicio anterior, escriba las palabras pertenecientes a las categorias "+this.category+" anteriormente memorizadas.",
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },

}
</script>

<style scoped>

</style>
