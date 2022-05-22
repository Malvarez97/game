<template>
  <div>
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
    <v-btn @click="response(false)" rounded class="btn-finish" color="#E74C3C" >
    Segundo intento
    </v-btn>
  </div>
  </div>
</template>

<script>
export default {
  name: "MyResponse",
  props: {
    correct:Boolean,
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
  color:#D1494B;
  left:30%;
}
.image {
  position:absolute;
  margin-top:20%;
  left:37.5%;
  width:25%;
}
.btn-finish{
  font-size: 3rem;
  color: white;
  padding: 2rem;
  text-transform: none;
  position:absolute;
  left: 70%;
  top:3%;
  width:25%;
  height:8%;
}

</style>
