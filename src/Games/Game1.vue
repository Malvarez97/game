<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==0 || $store.state.gameState == 3" >
      <ExerciseInstruction @finishExplanation="changeValues(); saveValue(this.exerciseNumber+this.subExerciseNumber,'nose');" :exerciseNumber="this.exerciseNumber" :subExerciseNumber=".1"  ></ExerciseInstruction>
    </div>
    <!-- 1) Mostrar cuadrantes iniciales 2)Completar palabra 4)Jugar solo QuadrantId 5)Ayuda Palabra -->
    <div  v-show="$store.state.gameState==1 || $store.state.gameState==2 || $store.state.gameState==4 || $store.state.gameState==6">
      <Game @finishCheck="nextLocalState();" :exerciseNumber="1" ></Game>
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
      explicationWord_introduction: " Se divide la pantalla en 4 cuadrantes.",
      explicationWord_outcome: " A continuacion trate de recordar la palabra perteneciente a la categoria " + this.category + " y los cuadrantes (letra identificatoria) donde se halla.",
      explicationWord_end: "Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes",
      explicationid: "Escriba las letras que identifican a cada cuadrante",
      check: false,
      nextGeneralState: 1,
      idsExercise: false,
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
        //Si estamos en el de la palabra cambiamos al del id
        if (this.idsExercise == false) {
          console.log("En el ejercicio de words");
          this.idsExercise = true;
          this.transition(8,3);
        }
        //Si estamos en el del id pasamos al ejercicio siguiente
        else{
          console.log("En el ejercicio de ids");
          this.idsExercise = false;
          this.changeHelp(false);
          this.transition(8,0);
          this.changeGeneralState(parseInt(this.$store.state.generalState,10)+1);
        }
      }
      //Si fue incorrecta (primera)
      else
      {
          console.log("Respuesta incorrecta");
          this.intentWord = this.intentWord + 1;
          //Si fue el primer intento
          if (this.intentWord < 2)
          {
            console.log("primera incorrecta");
            //Si es el ejercicio de las ids
            if (this.idsExercise){
              console.log("en el de ids");
              this.showWarning('Si fallas se restaura el ejercicio');
            }
            //Si es el ejercicio de las palabras
            else{
              console.log("en el de las palabras");
              // guardo el valor del tiempo del error  del primer fallo de Id
              //this.saveValue('Incorrect Word Intent ' + (parseInt(this.intentWord, 10) + 1), this.exerciseNumber + 'a');
            }
            this.transition(9,2);
          }
          else
          {
            console.log("Segunda incorrecta")
            // Si fue incorrecta (segunda)
            if (this.intentWord == 2) {
              //Si es el juego de las ids, entonces se vuelve al ej 1
              if (this.idsExercise){
                console.log("En el de los ids");
                this.showError();
                this.intentWord = 0;
                this.transition(9,0);
                this.changeGeneralState(1);
              }
              //Si es el juego de las palabras
              else{
                console.log("En el de las palabras");
                this.showWarning('Último intento. Recibirás una ayuda');
                this.transition(9,5);
                //this.saveValue('Incorrect Word Intent 3 ', this.exerciseNumber + 'a');
                console.log("voy al estado de la ayuda")
              }
            }
            //Si fallo 3 veces en el de las palabras
            else {
              console.log("Tercer error");
              this.showError();
              this.intentWord = 0;
              this.$store.commit('changeHelp',false);
              this.transition(9,0);
              this.changeGeneralState(1);
            }
          }
        }
      },
    // se usa para saltar estados
    finalizeExercise: function () {
      this.nextGeneralState += 1;
      if (this.nextGeneralState != 1) {
        this.showCorrect();
      }
      this.$emit('finishExcersize', this.exerciseNumber, true, this.nextGeneralState);
    },
    setInitialExplanation : function(){
      this.$store.state.introduction = this.explicationWord_introduction;
      this.$store.state.outcome = this.explicationWord_outcome;
      this.$store.state.end = this.explicationWord_end;
    },
    // salvar diferentes tipos de datos
    saveValue: function (exercisenumber, value) {
      this.$store.commit('writeTimes', exercisenumber, value);
    },
    changeQuadrantState: function (nextQuadrantState) {
      this.$store.commit('changeQuadrantState', nextQuadrantState);
    },
    transition : function(waitingState,nextGameState){
      if (nextGameState == 0){
        this.setInitialExplanation();
      }
      if (nextGameState == 3){
        this.$store.commit('setIntroduction',this.explicationid);
        this.$store.commit('setOutcome',"");
        this.$store.commit('setEnd',"");
      }
      switch(parseInt(this.$store.state.gameState,10)){
        //Estado de completar palabras
        case 2:
          console.log("transiciono del 2 al "+waitingState+" al "+nextGameState);
          this.restore();
          this.waitAndNextState(waitingState,nextGameState);
          break;
        //Estado de completar ids
        case 4:
          console.log("transiciono del 4 al "+waitingState+" al "+nextGameState);
          this.restore();
          this.waitAndNextState(waitingState,nextGameState);
          break;
        //Estado de la ayuda
        case 5:
          console.log("transiciono del 5 al "+waitingState+" al "+nextGameState);
          this.restore();
          this.changeHelp(true);
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
          this.changeQuadrantState(0);
          break;
          //Descripcion de la segunda parte del ejercicio
          //Muestra de todas las palabras e ids
        case 1:
          console.log("Estoy cambiando desde el estado 1");
          this.changeGameState(2);
          this.changeQuadrantState(1);
          break;
        case 3:
          console.log("Estoy cambiando desde el estado 3");
          this.changeGameState(4);
          this.changeQuadrantState(2);
          break;
        default:
          this.$store.commit('changeCheck',true);
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
      this.$store.dispatch('changeGeneralState',(nextGeneralState));
    },
    changeHelp: function(help){
      this.$store.commit('changeHelp',help);
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
