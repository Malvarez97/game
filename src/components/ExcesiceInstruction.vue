<template>
 <h1> Ejercicio 1</h1>
  <p> Se divide la pantalla en 4 cuadrantes.</p>
  <p>A continuacion trate de recordadr la palabra pertenciente a la categoria X,y los cuadrantes (letra identificatoria) donde se halla. </p>
  <p>Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes.</p>
  <v-btn  outline @click="finishExersiceInstruccion" rounded class="btn-finish" color="#E74C3C" >
    Entendido
  </v-btn>
</template>

<script>
export default {
  name: "ExcesiceInstruction",
  methods: {
    finishExersiceInstruccion: function(){
      this.$emit('finishExplication')// faltaria mandar el tiempo que tardo en entender como parametro
    }
  },
}

</script>

<style scoped>
h1 {
  display: flex;
  font-family: "Roboto", sans-serif;
  font-size: 6REM ;
  justify-content: center;
  color: #e74c3c;
  margin:auto;
}
p {
  padding: 2%;
  display: flex;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 4Rem ;
  justify-content: center;
  color: #e74c3c;
  margin:auto;
}
.btn-finish{
  font-size: 3rem;
  color: white;
  padding: 2rem;
  text-transform: none;
  position:relative;
  left: 70%;
  buttom:5%;
  width:25%;
  height:8%;
}


</style>
