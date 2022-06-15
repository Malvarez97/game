<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==0" >
      <ExerciseInstruction @finishExplanation="changeValues(); saveValue(this.exerciseNumber+this.subExerciseNumber,'nose');" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <div v-show="$store.state.gameState==3" >
      <ExerciseInstruction @finishExplanation="changeValues(); saveValue(this.exerciseNumber+this.subExerciseNumber,'nose');" :introduction="explicationSecondGame" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <!-- 1) Jugar solo QuadrantId -->
    <div  v-show="$store.state.gameState==1 || $store.state.gameState==6">
      <Game @finishCheck="nextLocalState();" :id="this.id" ></Game>
      <v-btn  outline @click="changeValues(); saveValue(this.exerciseNumber+this.subExerciseNumber,'Time finish see Words');" rounded class="btn-finish" color="#E74C3C" >
        Siguiente
      </v-btn>
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
  name: 'MyGame4',
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
    id: String,
  },
  created(){
    this.setInitialExplanation();
  },
  data() {
    return {
      correctId: false,
      correctResponse: false,
      intentId: 1,
      intentWord: 0,
      explicationWord_introduction: "Escriba en los cuadrantes las palabras pertenecientes a las categorias "+this.category+", anteriormente memorizadas",
      explicationWord_outcome: "Tenga en cuenta que cambió la posición de las letras",
      explicationWord_end: "Debe poner las palabras de acuerdo a las letras identificatorias, sin importar la posición de las mismas",
      explicationSecondGame: "Al igual que en el ejercicio anterior, escriba las palabras pertenecientes a las categorias "+this.category+" anteriormente memorizadas",
      nextGeneralState: 1,
      nextQuadrantState: 0,
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
      console.log("Estoy en nextlocalstate");
      //Si la respuesta es correcta
      if (this.$store.state.correctResponse){
        console.log("Respuesta correcta");
        this.showCorrect();
        this.intentWord = 0;
        //Si el usuario contesta correctamente se pasa al ejercicio siguiente
        console.log("Pasamos al ejercicio siguiente");
        this.transition(8,3);
        this.changeGeneralState(parseInt(this.$store.state.generalState,10)+1);
      }
      //Si fue incorrecta
      else
      {
        console.log("Respuesta incorrecta");
        this.intentWord = this.intentWord + 1;
        //Si no fue el ultimo intento
        if (this.intentWord == 1)
        {
          console.log("primera incorrecta");
          this.transition(9,1);
          // guardo el valor del tiempo del error  del primer fallo de Id
          //this.saveValue('Incorrect Word Intent ' + (parseInt(this.intentWord, 10) + 1), this.exerciseNumber + 'a');
        }
        //Si es el ultimo intento
        else
        {
          if (this.intentWord == 2){
            console.log("Segunda incorrecta");
            this.showWarning("Último intento. Recibirás una ayuda");
            this.transition(9,6);
          }
          else{
            console.log("Tercera incorrecta")
            this.showError();
            this.intentWord = 0;
            this.transition(9,0);
            if (parseInt(this.$store.state.generalState,10) == 6) {
              //Si perdi en el juego 6 vuelvo al 1
              this.changeGeneralState(1);
            }
            else {
              //Si perdi en el juego 7 voy al 6
              this.changeGeneralState(6);
            }
          }
        }
      }
    },
    // se usa para saltar estados
    /*finalizeExercise: function () {
      this.nextGeneralState += 1;
      if (this.nextGeneralState != 1) {
        this.showCorrect();
      }
      this.$emit('finishExcersize', this.exerciseNumber, true, this.nextGeneralState);
    },*/
    setInitialExplanation : function(){
      this.$store.state.introduction = "Escriba en los cuadrantes las palabras pertenecientes a las categorias "+this.$store.state.firstCategory+" y "+this.$store.state.secondCategory +", anteriormente memorizadas"
      this.$store.state.outcome = "Tenga en cuenta que cambió la posición de las letras";
      this.$store.state.end = "Debe poner las palabras de acuerdo a las letras identificatorias, sin importar la posición de las mismas";
    },
    // salvar diferentes tipos de datos
    saveValue: function (exercisenumber, value) {
      this.$store.commit('writeTimes', exercisenumber, value);
    },
    changeQuadrantState: function (nextQuadrantState) {
      this.$store.commit('changeQuadrantState', nextQuadrantState);
    },
    transition : function(waitingState,nextGameState){
      switch(parseInt(this.$store.state.gameState,10)){
          //Estado de completar ids
        case 1:
          console.log("transiciono del 1 al "+waitingState+" al "+nextGameState);
          this.restore();
          this.waitAndNextState(waitingState,nextGameState);
          //Si voy al estado de ayuda
          if(nextGameState==6){
            this.changeHelp();
          }
          break;
        //Estado de la ayuda
        case 6:
          console.log("transiciono del 6 al "+waitingState+" al "+nextGameState);
          this.restore();
          this.waitAndNextState(waitingState,nextGameState);
          break;
      }
    },
    changeValues: function () {
      console.log("Entro a change Values");
      switch (parseInt(this.$store.state.gameState,10)) {
          //Descripcion inicial del ejercicio
        case 0:
          console.log("Estoy cambiando desde el estado 0");
          this.changeGameState(1);
          this.changeQuadrantState(9);
          this.setTypeExercise("words");
          break;
        case 3:
          console.log("Estoy cambiando desde el estado 3");
          this.changeGameState(1);
          this.changeQuadrantState(9);
          this.setTypeExercise("words");
          break;
        default:
          console.log("entro a check exercise")
          this.$store.commit('checkExercise');
      }
    },
    waitAndNextState: function (waitingState, nextGameState) {
      this.$store.dispatch('waitingStateToNextState',{miliseconds: 2000,waitingState: waitingState, nextGameState: nextGameState});
    },
    changeGameState: function(nextGameState){
      this.$store.commit('changeGameState',nextGameState);
    },
    restore : function(){
      this.$store.commit('restore');
    },
    changeGeneralState : function (nextGeneralState){
      this.$store.commit('changeCategory',nextGeneralState);
      this.$store.dispatch('changeGeneralState',(nextGeneralState));
      this.setInitialExplanation();
    },
    changeHelp: function(){
      this.$store.commit('changeHelp');
    },
    setTypeExercise: function(typeOfExercise){
      this.$store.commit('setTypeOfExercise',typeOfExercise);
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
