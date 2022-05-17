<template>
  <div v-show="correct">
      <H1 class="correct"> CORRECTA </H1>
      <v-img
          class="image"
          src="../assets/good.jpg"
      ></v-img>
  </div>
  <div v-show="!correct">
    <H1 class=" incorrect"> INCORRECTA </H1>
    <v-img
        class="image"
        src="../assets/bad.jpg"
    ></v-img>
  </div>
</template>

<script>
export default {
  name: "MyResponse",
  props: {
    correct:Boolean,
  },
  methods: {
    waitTime: function () {
      setTimeout(3000);
      alert('pasaron 5 segundos');
      this.$emit('terminateWait')// faltaria mandar el tiempo que tardo en entender como parametro
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
  color:#D1494B;
  left:30%;
}
.image {
  position:absolute;
  margin-top:20%;
  left:37.5%;
  width:25%;
}

</style>
