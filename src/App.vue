<template>
	<v-app fluid style="height: 99vh;">
    <div v-show=begin>
        <Beginner @finishBegin="finishBegin"> </Beginner>
    </div>
    <div v-show=explication&&!begin>
      <ExerciseInstruction @finishExplication="finishExplication"></ExerciseInstruction>
    </div>
    <div v-show=!begin&&!explication&&!finish>
       <Game></Game>
      <v-btn @click="exerciseResponse" rounded class="btn-finish" color="#E74C3C" >
      Finalizar
      </v-btn>
    </div>
    <div v-show=finish>
      <Response @terminateWait=finalizeExercise :correct=responseCorrect></Response>
    </div>
	</v-app>
</template>
<script>

import Game from "@/components/MyGame";
import Beginner from "@/components/Beginner";
import ExerciseInstruction from "@/components/ExcesiceInstruction";
import Response from "@/components/Response";
export default {
	components: {
    Beginner,
    Game,
    ExerciseInstruction,
    Response
	},
  data(){
    return{
        short:"a",
        long:"palabra",
        begin:true,
        explication:true,
        responseCorrect:false,
        finish:false,
      }
    },
  methods: {
    finishBegin: function(){
      this.begin=false;
      //comienza el reloj del comienzo del juego
    },
    finishExplication: function(){
      this.explication=false;
      //guardar tiempo de respuesta del ejercicio
    },
    exerciseResponse:function(){
      // logica de las variables del juego
      this.finish=true;
      //this.responseCorrect=true;
      alert(this.responseCorrect);
      this.responseCorrect=false;
    },
    finalizeExercise:function(){
      this.finish=true;
      alert("se reinicio el ejercicio");
    }
  },
}
</script>

<style scoped>
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
