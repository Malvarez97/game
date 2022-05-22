<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion inicial palabra  -->
    <div v-show="state==0" >
      <ExerciseInstruction @finishExplication="nextLocalState" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="1" ></ExerciseInstruction>
    </div>
    <!-- Mostrar cuadrantes iniciales   -->
    <div  v-show="state==1">
      <Game :state="0" :exerciseNumber="1" ></Game>
      <v-btn  outline @click="nextLocalState(-1,-1)" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Completar Palabra  -->
    <div  v-show="state==2">
      <Game :state="1" @finishWord="nextLocalState" :quadrants="this.quadrants" :exerciseNumber="1" ></Game>
      <v-btn outline @click="nextLocalState(2,0)" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Transicion de correcto  -->
    <div v-show="state==3">
      <Transition :css="false" >
      <div>
      <MyResponse :correct="true"></MyResponse>
      </div>
      </Transition>
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
      <Game :state="2" @finishId="nextLocalState" :exerciseNumber="1"></Game>
      <v-btn  outline @click="nextLocalState(5,1)" rounded class="btn-finish" color="#E74C3C" >
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
    <!-- ayuda ejercicio de palabra 3er intento  -->
    <div  v-show="state==7">
        <Game :state="6" :inputhelp="a" :exerciseNumber="1"></Game>
      </div>
    <!-- 2 intento id   -->
    <div  v-show="state==8">
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
      explicationWord_outcome:" A continuacion trate de recordar la palabra perteneciente a la categoria "+this.category+" y los cuadrantes (letra identificatoria) donde se halla.",
      explicationWord_end: "Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes",
      explicationid:"Escriba las letras que identifican a cada cuadrante",
      state: 0,
    }
  },
  methods: {
    //se Guarda cada vez que fallo el ejercicio
    failure:function (){

    },
    //avanzar a siguiente estado, se usa para estados correctos
    nextLocalState(actualState ){
      if(actualState==2){
           //  HACER EL IF corroborar si el estado actual es valido, de serlo pasar al 3
          if (this.intentWord<2){
            this.intentWord=this.intentWord+1;
            console.log("intento palabra"+this.intentWord)
            this.state=2;
            return;
          }
          else{ // valor para ayuda falta definir el input de la ayuda en el cuadrante
            if (this.intentWord==2){
              this.intentWord=this.intentWord+1;
              this.state=7;
              return;
            }
          }
      }
      else if(actualState==5){
        if (this.intentId<2) { // primera oportunidad
          this.intentId = this.intentId + 1;
          this.state = 8;
        }
        else {
          this.state=0;
        }
      }
          else {
            this.state = this.state + 1;
          }
    },
    // se usa para saltar estados
    finalizeExercise: function () {
      console.log("apreto bien")
      this.$emit('finishExcersize',this.exerciseNumber, true);
    },
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
