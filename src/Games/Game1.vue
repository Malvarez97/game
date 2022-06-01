<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion inicial palabra  -->
    <div v-show="$store.state.gameState==0" >
      <ExerciseInstruction :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <!-- Mostrar cuadrantes iniciales   -->
    <div  v-show="$store.state.gameState==1">
      <Game :exerciseNumber="1" :quadrants="this.quadrants"></Game>
      <v-btn  outline @click="saveValue(this.exerciseNumber+this.subExerciseNumber,'Time finish see Words'); changeRestore(true); changeQuadrantState(1); changeGameState(2); " rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Completar Palabra  -->
    <div  v-show="$store.state.gameState==2">
      <Game @finishCheck="nextLocalState(); saveValue(this.exerciseNumber+this.subExerciseNumber,'Finish Corrects Words'); " :check="this.check" @firstLetter="saveValue('start Reading Word',this.exerciseNumber+'a')" :quadrants="this.quadrants" :exerciseNumber="this.exerciseNumber" ></Game>
      <v-btn outline @click="this.check=true;" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Descripcion juego Cuadrante -->
    <div v-show="$store.state.gameState==3">
      <ExerciseInstruction @finishExplanation="this.state++;saveValue(this.exerciseNumber+'b','Time finish reading',); changeQuadrantState(2)"  :outcome="explicationid" :exerciseNumber="this.exerciseNumber" :subExerciseNumber=".2" ></ExerciseInstruction>
    </div>
    <!-- Jugar solo QuadrantId -->
    <div  v-show="$store.state.gameState==4">
      <Game @finishCheck="nextLocalState();saveValue('Time finish QuadrantId',this.exerciseNumber+'b');" :exerciseNumber="this.exerciseNumber" :quadrants="this.quadrants"></Game>
      <v-btn  outline @click="nextLocalState()" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
    </div>
    <!-- Quadrant id Correcto y finalizacion del ejercicio -->
    <div  v-show="$store.state.gameState==5">
      <MyResponse :correct="true"></MyResponse>
      <v-btn  outline @click="finalizeExercise" rounded class="btn-finish" color="#E74C3C" >
        Terminar ejercicio
      </v-btn>
    </div>
    <!-- ayuda ejercicio de palabra 3er intento  -->
    <div  v-show="$store.state.gameState==6">
        <Game @finishCheck="nextLocalState()" :exerciseNumber="this.exerciseNumber" :quadrants="this.quadrants"></Game>
        <v-btn  outline @click="this.check=true;" :help="false" rounded class="btn-finish" color="#E74C3C" >
          Siguiente
        </v-btn>
      </div>
    <!-- 2 intento id   -->
    <div  v-show="$store.state.gameState==7">
      <Transition :css="false" >
        <div>
          <MyResponse :correct="false" @next="state=5"></MyResponse>
        </div>
        </Transition>
    </div>
    <!-- Transicion de correcto  -->
    <div v-show="$store.state.gameState==8">
      <Transition :css="false" >
        <div>
          <MyResponse :correct="true"></MyResponse>
        </div>
      </Transition>
    </div>
    <!-- Transicion de incorrecto -->
    <div  v-show="$store.state.gameState==9">
          <MyResponse :correct="false" ></MyResponse>
    </div>
  </v-app>
</template>
<script>

import Game from "@/components/MyGame";
import ExerciseInstruction from "@/components/ExcesiceInstruction";
import MyResponse from "@/components/Response";
const Swal = require('sweetalert2');

export default {
  name: 'MyGame1',
  components: {
    MyResponse,
    Game,
    ExerciseInstruction,
  },
  props: {
    time: {
      default: 20,
      type: Number,
    },
    category: {
      default: "Categoriarandom "
    },
    exerciseNumber: Number,
    quadrants: Array
  },
  data() {
    return {
      correctId: false,
      correctResponse: false,
      intentId: 1,
      intentWord: 0,
      explicationWord_introduction: " Se divide la pantalla en 4 cuadrantes.",
      explicationWord_outcome: " A continuacion trate de recordar la palabra perteneciente a la categoria " + this.category + " y los cuadrantes (letra identificatoria) donde se halla.",
      explicationWord_end: "Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes",
      explicationid: "Escriba las letras que identifican a cada cuadrante",
      check: false,
      nextGeneralState: 1,
      idsExercise: false,
    }
  },
  methods: {
    showError() {
      Swal.fire({
        icon: 'error',
        title: 'Nefasto',
        text: 'Te caiste a los pedazos master!',
        //timer: 2000,
        footer: '<a href="">¿Como no caerse a los pedazos?</a>'
      })
    },
    showWarning(text) {
      Swal.fire({
        icon: 'warning',
        title: 'Te queda 1 solo intento!',
        text: text,
        showCloseButton: true
      })
    },
    showCorrect() {
      Swal.fire({
        icon: 'success',
        title: 'Buena!',
        text: 'Segui asi fiera, idolo, titan, mastodonte, pura sangre',
      })
    },
    //avanzar a siguiente estado, se usa para estados correctos
    nextLocalState() {
      console.log("se emitio finish check");
      this.check = false;
      //this.wordCorrect = false;
      //Si la respuesta es correcta
      if (this.$store.state.correctResponse){
        this.$store.commit('changeCorrectResponse',false);
        this.showCorrect();
        this.intentWord = 0;
        //Si estamos en el de la palabra cambiamos al del id
        if (this.idsExercise == false) {
          this.idsExercise = true;
          this.$store.commit('changeRestore',true);
          this.$store.dispatch('waitingStateToNextState',{miliseconds: 2000,waitingState: 8,nextGameState: (parseInt(this.$store.state.gameState,10)+1)});
        }
        //Si estamos en el del id pasamos al ejercicio siguiente
        else{
          this.idsExercise = false;
          this.changeQuadrantState(1);
          this.$store.commit('changeRestore',true);
          this.$store.commit('changeHelp',false);
          this.$store.dispatch('waitingStateToNextState',{miliseconds: 2000,waitingState: 8,nextGameState: 0});
          this.$store.commit('changeGeneralState',(parseInt(this.$store.state.generalState,10)+1));

        }
      }
      //Si fue incorrecta (primera)
      else
      {
          this.intentWord = this.intentWord + 1;
          //Si fue el primer intento
          if (this.intentWord < 2)
          {
            console.log("primera incorrecta");
            //Si es el ejercicio de las ids
            if (this.idsExercise){
              this.showWarning('Si fallas se restaura el ejercicio');
            }
            //Si es el ejercicio de las palabras
            else{
              console.log("entro al else");
              // guardo el valor del tiempo del error  del primer fallo de Id
              //this.saveValue('Incorrect Word Intent ' + (parseInt(this.intentWord, 10) + 1), this.exerciseNumber + 'a');
            }
            this.$store.commit('changeRestore',true);
            this.$store.dispatch('waitingStateToNextState',{miliseconds: 2000,waitingState: 9,nextGameState: (parseInt(this.$store.state.lastGameState,10)+1)});
          }
          else
          {
            // Si fue incorrecta (segunda)
            if (this.intentWord == 2) {
              //Si es el juego de las ids, entonces se vuelve al ej 1
              if (this.idsExercise){
                this.showError();
                this.intentWord = 0;
                this.$store.commit('changeRestore',true);
                this.$store.dispatch('waitingStateToNextState',{miliseconds: 2000,waitingState: 9,nextGameState: 0});
                this.$store.commit('changeGeneralState',1);
              }
              //Si es el juego de las palabras
              else{
                this.showWarning('Último intento. Recibirás una ayuda');
                this.$store.commit('changeRestore',true);
                this.$store.dispatch('waitingStateToNextState',{miliseconds: 2000,waitingState: 9,nextGameState: 6});
                this.$store.commit('changeQuadrantState',1);
                this.$store.commit('changeHelp',true);
                console.log("El quadrant state es "+this.$store.state.quadrantState);
                //Ayudar
                //this.saveValue('Incorrect Word Intent 3 ', this.exerciseNumber + 'a');
                //this.state = 7;
                console.log("voy al estado de la ayuda")
              }
            }
            //Si fallo 3 veces en el de las palabras
            else {
              this.showError();
              this.intentWord = 0;
              this.$store.commit('changeHelp',false);
              this.$store.commit('changeRestore',true);
              this.$store.dispatch('waitingStateToNextState',{miliseconds: 2000,waitingState: 9,nextGameState: 0});
              this.$store.commit('changeGeneralState',1);
            }
          }
        } /*else if (this.state == 5 && !this.correctId) {
          if (this.intentId < 2) { // primera oportunidad
            // guardo el valor del tiempo del error  del primer fallo de Id
            this.saveValue('Incorrect Id Intent', this.exerciseNumber + 'b');
            this.intentId = this.intentId + 1;
            alert("te queda un intento, si erras el ejercicio se reiniciara");
            this.state = 8;
          } else {
            // guardo el valor del segundo error
            this.saveValue('Incorrect Id Intent 2', this.exerciseNumber + 'b');
            this.state = 0;
          }
        }*/
      },
    // se usa para saltar estados
    finalizeExercise: function () {
      this.nextGeneralState += 1;
      if (this.nextGeneralState != 1) {
        this.showCorrect();
      }
      this.$emit('finishExcersize', this.exerciseNumber, true, this.nextGeneralState);
    },
    // salvar diferentes tipos de datos
    saveValue: function (exercisenumber, value) {
      this.$store.commit('writeTimes', exercisenumber, value);
    },
    changeQuadrantState: function (nextQuadrantState) {
      this.$store.commit('changeQuadrantState', nextQuadrantState);
    },
    changeGameState: function (nextGameState) {
      this.$store.commit('changeGameState', nextGameState);
    },
    changeRestore : function(restore){
      this.$store.commit('changeRestore',restore);
    },
  },


  watch:{
    state() {
      // correcto
      if (this.state===3) {
        //sonido de correcto
        setTimeout ( ()=> {
              this.state=this.state+1;
            },2000
            ,)
      }
      if (this.$store.state.gameState===9) {
        //sonido de correcto
        setTimeout ( ()=> {
              this.state=2;
            },2000
            ,)
      }
      if (this.state===8) {
        //sonido de correcto
        setTimeout ( ()=> {
              this.state=5;
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
