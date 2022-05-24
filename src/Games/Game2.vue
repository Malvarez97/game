<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion inicial palabra  -->
    <div v-show="state==0" >
      <ExerciseInstruction @finishExplication="nextLocalState();saveValue('Time finish reading',this.exerciseNumber);" :outcome="explicationWord_outcome" :exerciseNumber="this.exerciseNumber" ></ExerciseInstruction>
    </div>
    <!-- Jugar solo QuadrantId con ids de una categoria -->
    <div  v-show="state==1">
      <Game :state="2" @finishId="nextLocalState();saveValue('Time finish QuadrantId',this.exerciseNumber);" :exerciseNumber="this.exerciseNumber" :quadrants="this.quadrants"></Game>
      <v-btn  outline @click="state=4" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Quadrant id Correcto y finalizacion del ejercicio -->
    <div  v-show="state==2">
      <MyResponse :correct="true"></MyResponse>
      <v-btn  outline @click="finalizeExercise" rounded class="btn-finish" color="#E74C3C" >
        Terminar ejercicio
      </v-btn>
    </div>
    <!-- 3 intento id   -->
    <div  v-show="state==4">
      <Transition :css="false" >
        <div>
          <MyResponse :correct="false" @next="state=5"></MyResponse>
        </div>
      </Transition>
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
    },
    exerciseNumber: Number,
    quadrants:Array
  },
  data() {
    return {
      correctResponse:false,
      intentId:1,
      intentWord:0,
      explicationWord_introduction:" Se divide la pantalla en 4 cuadrantes.",
      explicationWord_outcome:" Escriba las letras de los cuadrantes en los que aparecieron las palabras de  "+this.category,
      state: 0,
      check:false,
    }
  },
  methods: {
    //avanzar a siguiente estado, se usa para estados correctos
    nextLocalState(){
        this.state = this.state + 1;
      },
    // se usa para saltar estados
    finalizeExercise: function () {
      this.$emit('finishExcersize',this.exerciseNumber, true);
    },
    // salvar diferentes tipos de datos
    saveValue: function(exercisenumber,value) {
      this.$emit('saveValue',exercisenumber,value);
    }
  },

  watch:{
    state() {
      if (this.state===3) {
        //sonido de correcto
        setTimeout ( ()=> {
              this.state=this.state+1;
            },2000
            ,)
      }
    }
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

