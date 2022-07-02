<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="gameMethods.changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" ></ExerciseInstruction>
    </div>
    <!-- 2) Show words complete ids -->
    <div  v-show="$store.state.gameState==gameValues.showWordsCompleteIds">
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
    <!-- Pantalla de felicitaciones  -->
    <div v-show="$store.state.gameState==gameValues.congratulationsScreen" >
      <ExerciseInstruction :win="true" @finishExplanation="gameMethods.changeGeneralState(1); gameMethods.saveTime($store.state.currentExercise,gameValues.actionFinishExercise,$store.state.intent + 1);" :introduction="congratulations_introduction" :outcome="congratulations_outcome" :exerciseNumber="congratulations_title" ></ExerciseInstruction>
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
  name: 'MyGame8',
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
      explicationWord_introduction: "Complete las letras que identifican cada cuadrante como estaban en los últimos ejercicios.",
      explicationWord_outcome: "",
      explicationWord_end: "",
      congratulations_title:"¡Felicitaciones!",
      congratulations_introduction:"¡Ha completado con éxito los ejercicios!.",
      congratulations_outcome:"A continuación debe presionar el botón si quiere comenzar una nueva partida",
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
}
</script>

<style scoped>

</style>
