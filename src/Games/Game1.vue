<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion inicial palabra  -->
    <div v-show="state==0" >
      <ExerciseInstruction @finishExplication="nextLocalState" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="1" ></ExerciseInstruction>
    </div>
    <!-- Mostrar cuadrantes iniciales   -->
    <div  v-show="state==1">
      <Game :state="0" ></Game>
      <v-btn  outline @click="state=state+1" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Completar Palabra  -->
    <div  v-show="state==2">
      <Game :state="1" @finishWord="nextLocalState"></Game>
      <v-btn  outline @click="state=state+1" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Completar pantalla correcto  -->
    <div  v-show="state==3">
      <MyResponse :correct="true"></MyResponse>
      <v-btn  outline @click="state=state+1" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
      </div>
    <!-- Descripcion juego Cuadrante -->
    <div v-show="state==4">
      <ExerciseInstruction @finishExplication="nextLocalState"  :outcome="explicationid" :exerciseNumber="1" ></ExerciseInstruction>
      <v-btn  outline @click="state=state+1" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Jugar solo QuadrantId -->
    <div  v-show="state==5">
      <Game :state="2" @finishId="nextLocalState"></Game>
      <v-btn  outline @click="state=state+1" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Quadrant id Correcto y finalizacion del ejercicio -->
    <div  v-show="state==6">
      <MyResponse :correct="true"></MyResponse>
      <v-btn  outline @click="finalizeExercise" rounded class="btn-finish" color="#E74C3C" >
        Terminar ejercicio
      </v-btn>
    </div>
  </v-app>
</template>
<script>

import Game from "@/components/MyGame";
import ExerciseInstruction from "@/components/ExcesiceInstruction";
import MyResponse from "@/components/Response";
export default {
  name: 'MyGame1',
  components: {
    MyResponse,
    Game,
    ExerciseInstruction,
  },
  props: {
    time:{
      default:20,
      type:Number,
    },
    category:{
      default: "Categoriarandom "
    }
  },
  data() {
    return {
      explicationWord_introduction:" Se divide la pantalla en 4 cuadrantes.",
      explicationWord_outcome:" A continuacion trate de recordar la palabra perteneciente a la categoria "+this.category+" y los cuadrantes (letra identificatoria) donde se halla.",
      explicationWord_end: "Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes",
      explicationid:"Escriba las letras que identifican a cada cuadrante",
      state: 0,
      quadrantId: "a",
      word: "palabra"
    }
  },
  methods: {
    //avanzar a siguiente estado, se usa para estados correctos
    nextLocalState(){
      this.state=this.state+1;
      console.log("estado del game"+this.state);
    },
    // se usa para saltar estados
    nextState(){

    },
    finalizeExercise: function () {
      this.$emit('finishExcersize')
    },
  }
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
