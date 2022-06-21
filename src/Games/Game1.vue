<template>
  <v-app fluid style="height: 100vh;">
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==0" >
      <ExerciseInstruction @finishExplanation="changeValues(); saveValue(parseFloat(this.exerciseNumber+'.'+this.subExerciseNumber,10),'show',intentWord+1);" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber="1" ></ExerciseInstruction>
    </div>
    <!-- Explicacion del id -->
    <div v-show="$store.state.gameState==3" >
      <ExerciseInstruction @finishExplanation="changeValues(); saveValue(parseFloat(this.exerciseNumber+'.'+this.subExerciseNumber,10),'show',this.intentWord+1);" :introduction="explicationid" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber="2" ></ExerciseInstruction>
    </div>
    <!-- 1) Mostrar cuadrantes iniciales 2)Completar palabra 4)Jugar solo QuadrantId 5)Ayuda Palabra -->
    <div  v-show="$store.state.gameState==1 || $store.state.gameState==2 || $store.state.gameState==4 || $store.state.gameState==6">
      <Game @finishCheck="nextLocalState();" @firstLetter="addFirstLetterTime" :id="this.id" ></Game>
      <v-btn  outline @click="changeValues();"  class="btn-global nextposition" color="#E74C3C" >
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
    id: String,
  },
  data() {
    return {
      correctId: false,
      correctResponse: false,
      intentWord: 0,
      explicationWord_introduction: " Se divide la pantalla en 4 cuadrantes.",
      explicationWord_outcome: " A continuacion trate de recordar la palabra perteneciente a la categoria " + this.category + " y los cuadrantes (letra identificatoria) donde se halla.",
      explicationWord_end: "Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes",
      explicationid: "Escriba las letras que identifican a cada cuadrante",
      nextGeneralState: 1,
      idsExercise: false,
      nextQuadrantState: 0,
      subExerciseNumber: 1,
    }
  },
  methods: {
    showError(nroEjercicio) {
      Swal.fire({
        icon: 'error',
        title: 'Inténtalo nuevamente. Volverás al ejercicio '+nroEjercicio,
        //text: 'Inténtalo nuevamente. Volverás al ejercicio '+nroEjercicio,
        //timer: 2000,
        //footer: '<a href="">¿Como no caerse a los pedazos?</a>'
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
        //text: 'Segui asi fiera, idolo, titan, mastodonte, pura sangre',
      })
    },
    //avanzar a siguiente estado, se usa para estados correctos
    nextLocalState() {
      console.log("Estoy en nextlocalstate");
      this.intentWord = this.intentWord + 1;
      //Si la respuesta es correcta
      if (this.$store.state.correctResponse){
        console.log("Respuesta correcta");
        this.showCorrect();
        //Si estamos en el de la palabra cambiamos al del id
        if (this.idsExercise == false) {
          this.$store.commit('writeTimes', {exercisenumber:(parseFloat(this.exerciseNumber+"."+this.subExerciseNumber,10)), action:"finish correct",intent:(this.intentWord)});
          console.log("En el ejercicio de words");
          this.idsExercise = true;
          this.subExerciseNumber = 2;
          this.intentWord = 0;
          this.transition(8,3);
        }
        //Si estamos en el del id pasamos al ejercicio siguiente
        else{
          console.log("En el ejercicio de ids");
          this.$store.commit('writeTimes', {exercisenumber:(parseFloat(this.exerciseNumber+"."+this.subExerciseNumber,10)), action:"finish correct",intent:(this.intentWord)});
          this.idsExercise = false;
          this.subExerciseNumber = 1;
          this.intentWord = 0;
          this.transition(8,0);
          this.changeGeneralState(parseInt(this.$store.state.generalState,10)+1);
        }
      }
      //Si fue incorrecta (primera)
      else
      {
          console.log("Respuesta incorrecta");
          //Si fue el primer intento
          if (this.intentWord < 2)
          {
            console.log("primera incorrecta");
            //Si es el ejercicio de las ids
            if (this.idsExercise){
              this.$store.commit('writeTimes', {exercisenumber:(parseFloat(this.exerciseNumber+"."+this.subExerciseNumber,10)), action:"finish failure",intent:this.intentWord});
              console.log("en el de ids");
              this.showWarning('Si fallas se restaura el ejercicio');
              this.transition(9,4);
            }
            //Si es el ejercicio de las palabras
            else{
              this.$store.commit('writeTimes', {exercisenumber:(parseFloat(this.exerciseNumber+"."+this.subExerciseNumber,10)), action:"finish failure",intent:this.intentWord});
              console.log("en el de las palabras");
              this.transition(9,2);
              // guardo el valor del tiempo del error  del primer fallo de Id
              //this.saveValue('Incorrect Word Intent ' + (parseInt(this.intentWord, 10) + 1), this.exerciseNumber + 'a');
            }
          }
          else
          {
            console.log("Segunda incorrecta")
            // Si fue incorrecta (segunda)
            if (this.intentWord == 2) {
              //Si es el juego de las ids, entonces se vuelve al ej 1
              if (this.idsExercise){
                this.$store.commit('writeTimes', {exercisenumber:(parseFloat(this.exerciseNumber+"."+this.subExerciseNumber,10)), action:"finish failure",intent:this.intentWord});
                console.log("En el de los ids");
                this.showError();
                this.idsExercise = false;
                this.intentWord = 0;
                this.subExerciseNumber = 1;
                this.transition(9,0);
                this.changeGeneralState(1);
              }
              //Si es el juego de las palabras
              else{
                console.log("En el de las palabras");
                this.$store.commit('writeTimes', {exercisenumber:(parseFloat(this.exerciseNumber+"."+this.subExerciseNumber,10)), action:"finish failure",intent:this.intentWord});
                this.showWarning('Último intento. Recibirás una ayuda');
                this.transition(9,6);
                //this.saveValue('Incorrect Word Intent 3 ', this.exerciseNumber + 'a');
                console.log("voy al estado de la ayuda")
              }
            }
            //Si fallo 3 veces en el de las palabras
            else {
              this.$store.commit('writeTimes', {exercisenumber:(parseFloat(this.exerciseNumber+"."+this.subExerciseNumber,10)), action:"finish failure",intent:this.intentWord});
              console.log("Tercer error");
              this.showError(1);
              this.intentWord = 0;
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
    // salvar diferentes tipos de datos
    saveValue: function (exercisenumberT, actionT ,intentT ) {
      this.$store.commit('writeTimes', {exercisenumber:exercisenumberT, action:actionT,intent:intentT});
    },
    changeQuadrantState: function (nextQuadrantState) {
      this.$store.commit('changeQuadrantState', nextQuadrantState);
    },
    transition : function(waitingState,nextGameState){
      switch(parseInt(this.$store.state.gameState,10)){
        //Estado de completar palabras
        case 2:
          console.log("transiciono del 2 al "+waitingState+" al "+nextGameState);
          this.restore();
          this.waitAndNextState(waitingState,nextGameState);
          //Si voy al estado de ayuda
          if(nextGameState==6){
            this.changeHelp();
          }
          console.log("Next game state es "+nextGameState);
          if (nextGameState == 3){
            this.$store.commit('setIntroduction',this.explicationid);
            this.$store.commit('setOutcome',"");
            this.$store.commit('setEnd',"");
            this.$store.commit('writeTimes',{exercisenumber:(parseFloat(this.exerciseNumber+"."+this.subExerciseNumber,10)),action:"start reading",intent:this.intentWord+1});
          }
          break;
        //Estado de completar ids
        case 4:
          console.log("transiciono del 4 al "+waitingState+" al "+nextGameState);
          this.restore();
          this.waitAndNextState(waitingState,nextGameState);
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
          this.changeQuadrantState(0);
          this.setTypeExercise("words");
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
          this.setTypeExercise("ids");
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
    },
    changeHelp: function(){
      this.$store.commit('changeHelp');
    },
    setTypeExercise: function(typeOfExercise){
      this.$store.commit('setTypeOfExercise',typeOfExercise);
    },
    addFirstLetterTime : function(){
        this.$store.commit('writeTimes',{exercisenumber:(parseFloat(this.exerciseNumber+"."+this.subExerciseNumber,10)),action:"start interacting",intent:this.intentWord+1});
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

</style>
