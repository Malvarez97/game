<template>
  <v-app >
    <!-- Explicacion del juego  -->
    <div v-show="$store.state.gameState==gameValues.firstPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationWord_introduction" :outcome="explicationWord_outcome" :end="explicationWord_end" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber="1" ></ExerciseInstruction>
    </div>
    <!-- Explicacion del id -->
    <div v-show="$store.state.gameState==gameValues.secondPartExplanation" >
      <ExerciseInstruction @finishExplanation="changeValues();" :introduction="explicationid" :exerciseNumber="'Ejercicio '+this.exerciseNumber" :subExerciseNumber="2" ></ExerciseInstruction>
    </div>
    <!-- 2)Mostrar palabras e ids 3)Completar palabras 4)Completar ids -->
    <div  v-show="$store.state.gameState==gameValues.showWordsAndIds || $store.state.gameState==gameValues.completeWords || $store.state.gameState==gameValues.completeIds">
      <Game @finishCheck="nextLocalState();" @firstLetter="gameMethods.saveValue(this.getExerciseNumber(),'start interacting',this.intentWord+1)" :id="this.id" ></Game>
      <v-btn  outline @click="changeValues();"  class="btn-global nextposition" color="#E74C3C" >
        Siguiente
      </v-btn>
      <v-btn  outline @click="gameMethods.setPause(true);"  class="btn-pause pauseposition" color="#2379BD"  >
        Pausa
      </v-btn>
    </div>
    <!-- Transicion de correcto  -->
    <div v-show="$store.state.gameState==gameValues.correctTransition">
      <Transition :css="false" >
        <div>
          <MyResponse :pause="false" :correct="true"></MyResponse>
        </div>
      </Transition>
    </div>
    <!-- Transicion de incorrecto -->
    <div  v-show="$store.state.gameState==gameValues.incorrectTransition">
          <MyResponse :pause="false" :correct="false" ></MyResponse>
    </div>
    <!-- Estado de pausa -->
    <div  v-show="$store.state.gameState==gameValues.pauseScreen">
      <MyResponse :correct=null :pause="true" ></MyResponse>
    </div>
  </v-app>
</template>
<script>

import Game from "@/components/MyGame";
import ExerciseInstruction from "@/components/ExcesiceInstruction";
import MyResponse from "@/components/Response";
import * as GameMethods from './gamemethods.js';
import * as GameValues from './gamevalues.js';

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
      intentWord: 0,
      //Explicaciones de los ejercicios que se enviaran como prop a ExerciseInstruction
      explicationWord_introduction: " Se divide la pantalla en 4 cuadrantes.",
      explicationWord_outcome: " A continuacion trate de recordar la palabra perteneciente a la categoria " + this.category + " y los cuadrantes (letra identificatoria) donde se halla.",
      explicationWord_end: "Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes.",
      explicationid: "Escriba las letras que identifican a cada cuadrante.",
      subExerciseNumber: 1,
      limitAttemptsWords:3,
      limitAttemptsIds:2,
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
  methods: {
    //Logica de los ejercicios 1 y 2
    nextLocalState() {
      //Se añade 1 al intento actual
      this.intentWord = this.intentWord + 1;
      //Si la respuesta fue correcta
      if (GameMethods.getCorrectResponse()){
        //Se ejecuta el audio de correcto, se guarda el tiempo, se resetean las variables y se realiza la transicion de pantallas
        GameMethods.reproduceAudio('success');
        GameMethods.saveValue(this.getExerciseNumber(), "finish correct",this.intentWord);
        this.intentWord = 0;
        //Si estamos en el ejercicio de las palabras
        if (GameMethods.getCurrentTypeOfExercise() == GameValues.words) {
          this.subExerciseNumber = 2;
          this.transition(GameValues.correctTransition,GameValues.secondPartExplanation);
        }
        //Si estamos en el ejercicio 2 (El de los ids), pasamos al ejercicio siguiente
        else{
          this.subExerciseNumber = 1;
          this.transition(GameValues.correctTransition,GameValues.firstPartExplanation);
          GameMethods.setNextGeneralState(GameMethods.getGeneralState()+1);

        }
        //this.$store.dispatch("calculateSessionValues");
      }
      //Si fue incorrecta
      else {
        //Se guarda el tiempo de fallo
        GameMethods.saveValue(this.getExerciseNumber(),"finish failure",this.intentWord);
        GameMethods.reproduceAudio('error');
        //Si fue el primer intento
          if (this.intentWord == 1) {
            //Si es el ejercicio de las ids, se muestra una advertencia, ya que los intentos limite son 2
            if (GameMethods.getCurrentTypeOfExercise() == GameValues.ids){
              this.transition(GameValues.incorrectTransition,GameValues.completeIds);
              GameMethods.setAlert(GameValues.warningIcon,'Último intento.',"");
            }
            //Si es el ejercicio de las palabras simplemente hacemos la transicion
            else{
              this.transition(GameValues.incorrectTransition,GameValues.completeWords);
            }
          }
          //Segunda incorrecta
          else {
            if (this.intentWord == 2) {
              //Si es el juego de las ids, se vuelve al ejercicio 1 y se le notifica al usuario
              if (GameMethods.getCurrentTypeOfExercise() == 'ids'){
                GameMethods.showError(GameMethods.getGeneralState());
                this.intentWord = 0;
                this.subExerciseNumber = 1;
                this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation);
                GameMethods.setNextGeneralState(GameValues.loseGame1);
              }
              //Si es el juego de las palabras, se carga la ayuda y se le avisa al usuario
              else{
                GameMethods.saveValue(this.getExerciseNumber(),"finish failure",this.intentWord);
                this.transition(GameValues.incorrectTransition,GameValues.completeWords);
                GameMethods.setAlert(GameValues.warningIcon, GameValues.defaultWarningTitle,'Último intento. Recibirás una ayuda');
                GameMethods.changeHelp();
              }
            }
            //Tercera incorrecta. Notifico error y hago transicion hacia atras
            else {
              GameMethods.setAlert(GameValues.errorIcon,GameValues.defaultErrorTitle+GameValues.loseGame1,"");
              this.intentWord = 0;
              this.transition(GameValues.incorrectTransition,GameValues.firstPartExplanation)
              //Si perdio en el ejercicio 1 vuelve al LoseGame1 (1) si perdio en el 2 al LoseGame2(1)
              if (GameMethods.getGeneralState() == 1){
                GameMethods.setNextGeneralState(GameValues.loseGame1);
              }
              else{
                GameMethods.setNextGeneralState(GameValues.loseGame2);
              }
            }
          }
        }
      },
    //Metodo para realizar transiciones de pantallas. Se invoca a waitAndNextGameState, que cambia de estado por
    //dos segundos y luego vuelve al estado indicado
    transition : function(waitingState,nextGameState){
      switch(GameMethods.getGameState()){
        //Estado de completar palabras
        case GameValues.completeWords:
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          switch (nextGameState) {
              //Si vuelvo a hacer el ejercicio, guardo el tiempo que comienza el ejercicio
            case GameValues.completeWords:
              GameMethods.saveValue(this.getExerciseNumber(), 'show', this.intentWord+1);
              break;
              //Si paso al siguiente enunciado, guardo el tiempo que comienzo a leer
            case GameValues.secondPartExplanation:
              GameMethods.saveValue(this.getExerciseNumber(), 'start reading', this.intentWord + 1);
              break;
          }
          break;
        //Estado de completar ids
        case GameValues.completeIds:
          GameMethods.waitAndNextGameState(waitingState,nextGameState);
          //Si tengo que volver a realizar el ejercicio, guardo el tiempo para volver a mostrar las palabras
          if (nextGameState == GameValues.completeIds){
            GameMethods.saveValue(this.getExerciseNumber(),'show',this.intentWord+1);
          }
          break;
      }
    },
    //Metodo que se ejecuta al clickear el boton de siguiente o completar el ejercicio correctamente\
    //Este metodo setea los valores del juego, estado, tipo de ejercicio y guarda tiempos en pantallas explicativas
    //En pantallas no explicativas, chequea que el ejercicio se haya respondido correctamente
    changeValues: function () {
      switch (GameMethods.getGameState()) {
        case GameValues.firstPartExplanation:
          GameMethods.changeState(GameValues.showWordsAndIds);
          GameMethods.saveValue(this.getExerciseNumber(),'show',this.intentWord+1);
          GameMethods.setTypeExercise(GameValues.game1sub1Type);
          break;
        case GameValues.showWordsAndIds:
          GameMethods.changeState(GameValues.completeWords);
          break;
        case GameValues.secondPartExplanation:
          GameMethods.changeState(GameValues.completeIds);
          GameMethods.saveValue(this.getExerciseNumber(),'show',this.intentWord+1);
          GameMethods.setTypeExercise(GameValues.game1sub2Type);
          break;
        default:
          GameMethods.checkExercise();
      }
    },
    //Metodo para devolver el numero de ejercicio, ya que estos ejercicios estan divididos en dos partes.
    getExerciseNumber : function () {
      return parseFloat(this.exerciseNumber+'.'+this.subExerciseNumber,10)
    },
  },
}
</script>

<style scoped>

</style>
