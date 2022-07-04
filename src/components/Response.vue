<template>
  <div class="background">
  <div v-show="!pause&&correct" class="game-container" >
      <H1 class="correct"> CORRECTA </H1>
      <v-img
          class="image"
          src="../assets/good.png"
      ></v-img>
  </div>
  <div  v-show="!pause&&!correct&&$store.state.intent<gameMethods.getLimitAttempts()-1" class="game-container">
    <H1 class=" incorrect"> INCORRECTA,AUN TE QUEDAN INTENTOS</H1>
    <v-img
        class="image"
        src="../assets/bad.png"
    ></v-img>
  </div>
    <div  v-show="!pause&&!correct&&$store.state.intent==gameMethods.getLimitAttempts()-1" class="game-container">
      <H1 class=" incorrect"> INCORRECTA VOLVERAS A UN EJERCICIO ANTERIOR </H1>
      <v-img
          class="image"
          src="../assets/bad.png"
      ></v-img>
    </div>
    <div  v-show="pause" class="game-container">
      <H1 class=" incorrect"> La sesion se encuentra en pausa </H1>
      <v-img
          class="image"
          src="../assets/pause.png"
      ></v-img>
    </div>
  </div>
</template>

<script>
import *as GameMethods from "../Games/gamemethods";
export default {
  name: "MyResponse",
  props: {
    correct:{
      Type:Boolean,
      default:null,
    },
    pause: {
      Type:Boolean,
      default:false,
    }
  },
  data(){
    return {
      gameMethods:GameMethods
    }
    },
  methods: {
    response: function () {
      this.$emit('next',)// faltaria mandar el tiempo que tardo en entender como parametro
    },
  },
}
</script>

<style scoped>
.game-container {
  height: 100vh;
  position: relative;
  display: grid;
  grid-template-columns : repeat(7,1fr);
  grid-template-rows: repeat(3,1fr);
}
.background {
  background: url("../assets/copia2.png") no-repeat
  center center;
  background-size: cover;
}
h1{
  grid-column-start: 2;
  grid-column-end: -1;
  grid-row-start: 1;
  font-size: 6REM;
}
.correct{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8REM;
  color:#3BB449;
  margin-left: -15rem;
}
.incorrect{
  color:#D1494B;
}
.image {
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: 2;
  grid-row-end: 3;
}

@media screen and (max-width: 960px) and (min-width:480px ) {
h1{
  font-size: 3.5rem;
}
}

</style>
