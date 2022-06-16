<template>
  <div>
  <div v-show="correct&&!solution">
      <H1 class="correct"> CORRECTA </H1>
      <v-img
          class="image"
          src="../assets/good.png"
      ></v-img>
  </div>
  <div v-show="!correct&&!solution">
    <H1 class=" incorrect"> INCORRECTA,AUN TE QUEDAN INTENTOS</H1>
    <v-img
        class="image"
        src="../assets/bad.png"
    ></v-img>
  </div>
    <div v-show="solution">
      <H1 class=" incorrect"> ACA VA A ESTAR LA SOLUCION</H1>
      <v-img
          class="image"
          src="../assets/bad.png"
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyResponse",
  props: {
    correct:Boolean,
    solution: {
      default: false,
      type: Boolean,
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

h1{
  margin-top:10%;
  position: absolute;
  font-size: 8REM;
}
.correct{
  color:#3BB449;
  left:32.5%;
}
.incorrect{
  font-size: 4REM;
  color:#D1494B;
  left:20%;
}
.image {
  position:absolute;
  margin-top:20%;
  left:37.5%;
  width:25%;
}
</style>
