<template>
  <div class="container">
  <!-- Show words and ids  -->
      <div v-show="$store.state.gameState==gameValues.showWordsAndIds" class="game-container">
        <h1 v-if="this.quadrant.showId" :style="{color: this.$store.state.letterColor}"  class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
        <h1 v-if="this.quadrant.showWord" :style="{color: this.$store.state.letterColor}"  class="positionCenter">{{ this.quadrant.word.toUpperCase() }} </h1>
      </div>
    <!-- Show ids  -->
    <div v-show="$store.state.gameState==gameValues.showIds" class="game-container">
      <h1 v-if="this.quadrant.showId" :style="{color: this.$store.state.letterColor}"  class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
    </div>
    <!-- Show all  -->
    <div v-show="$store.state.gameState==gameValues.showAll" class="game-container">
      <h1 :style="{color: this.$store.state.letterColor}"  class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
      <h1 :style="{color: this.$store.state.letterColor}" class="positionCenter">{{ this.quadrant.word.toUpperCase() }} </h1>
    </div>
  <!-- Complete words  -->
      <div v-show="$store.state.gameState==gameValues.completeWords"  >
        <div v-show=!validateLong&&longIsEmpty class="game-container" @click="setFocusStoppedWriting()">
          <input ref="wordStoppedWritingCW" class="positionCenter inputEmpty" v-model="inputCenter">
        </div>
        <div v-show=!validateLong&&!longIsEmpty class="game-container" @click="setFocusWordWriting()">
          <input ref="wordWritingCW" class="positionCenter inputFail" v-model="inputCenter">
        </div>
        <div v-show=validateLong class="game-container">
          <h1 class="positionCenter correct">{{ this.quadrant.word.toUpperCase()}} ✔</h1>
        </div>
    </div>
    <!-- Complete ids   -->
    <div v-show="$store.state.gameState==gameValues.completeIds"  >
      <div v-show=!validateShort&&shortIsEmpty&&!blocking class="game-container" @click="setFocusStoppedWriting()">
        <input ref="wordStoppedWritingCI" class="positionUp inputEmpty id" v-model="input">
      </div>
      <div v-show=!validateShort&&!shortIsEmpty&&!blocking class="game-container" @click="setFocusWordWriting()">
        <input ref="wordWritingCI" class="positionUp inputFail id" v-model="input">
      </div>
      <div v-show=validateShort&&!blocking class="game-container">
        <h1 class="positionUp correct">{{ this.quadrant.Id.toUpperCase() }} ✔</h1>
      </div>
      <div  v-show=blocking class="game-container">
        <input class="positionUp inputFail id" v-model="input" readonly>
      </div>
    </div>
    <!-- Show Words Complete Ids -->
    <div v-show="$store.state.gameState==gameValues.showWordsCompleteIds" class="game-container"  >
      <h1 v-if="this.quadrant.showWord" :style="{color: this.$store.state.letterColor}"   class="positionCenter"> {{ this.quadrant.word.toUpperCase() }} </h1>
      <div v-show=!validateShort&&shortIsEmpty&&!blocking class="game-container" @click="setFocusStoppedWriting()">
        <input ref="wordStoppedWritingSWCI" class="positionUp inputEmpty id" v-model="input">
      </div>
      <div v-show=!validateShort&&!shortIsEmpty&&!blocking class="game-container" @click="setFocusWordWriting()">
        <input ref="wordWritingSWCI" class="positionUp inputFail id" v-model="input">
      </div>
      <div v-show=validateShort&&!blocking class="game-container">
        <h1 class="positionUp correct">{{ this.quadrant.Id.toUpperCase() }} ✔</h1>
      </div>
      <div  v-show=blocking class="game-container">
        <input class="positionUp inputFail id" v-model="input" readonly>
      </div>
    </div>
  <!-- Butttons -->
  <div v-show="$store.state.gameState==gameValues.buttons" class="game-container">
    <v-btn v-show="!correctClick&&!incorrectClick" @click="clicked+=1" outline rounded class=" positionCenter btn-8" fab color="#4758B8">
      {{this.quadrant.word.toUpperCase()}}
    </v-btn>
    <v-btn v-show="clicked>=1&&correctClick" @click="clicked+=1" outline rounded class=" positionCenter btn-correct btn-8" fab color="#4758B8"  >
      {{this.quadrant.word.toUpperCase()}}
    </v-btn>
    <v-btn v-show="clicked>=1&&incorrectClick" @click="clicked+=1" outline rounded class=" positionCenter btn-incorrect btn-8" fab color="#4758B8"  >
      {{this.quadrant.word.toUpperCase()}}
    </v-btn>
  </div>
  <!-- Show ids complete words  -->
  <div v-show="$store.state.gameState==gameValues.showIdsCompleteWords" class="game-container" >
    <h1 v-if="this.quadrant.showId" :style="{color: this.$store.state.letterColor}"  class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
    <div class="game-container" v-show=!validateLong&&longIsEmpty @click="setFocusStoppedWriting()">
      <input ref="wordStoppedWritingSICW" class="positionCenter inputEmpty" v-model="inputCenter">
    </div>
    <div class="game-container" v-show=!validateLong&&!longIsEmpty @click="setFocusWordWriting()">
      <input ref="wordWritingSICW" class="positionCenter inputFail" v-model="inputCenter">
    </div>
    <div class="game-container" v-show=validateLong>
      <h1 class="positionCenter correct">{{ this.quadrant.word.toUpperCase() }} ✔</h1>
    </div>
  </div>
  <!-- Show words complete categories -->
  <div v-show="$store.state.gameState==gameValues.showWordsCompleteCategories" class="game-container" >
    <div class="game-container" v-show=!this.quadrant.showWord >
      <h1 class="positionCenter correct" > {{this.quadrant.word.toUpperCase() }} </h1>
    </div>
    <div class="game-container" v-show=this.quadrant.showWord&&!validateLong&&longIsEmpty @click="setFocusStoppedWriting()">
      <input ref="wordStoppedWritingSWCC" class="positionCenter inputEmpty" v-model="inputCenter">
    </div>
    <div class="game-container" v-show=this.quadrant.showWord&&!validateLong&&!longIsEmpty @click="setFocusWordWriting()">
      <input ref="wordWritingSWCC" class="positionCenter inputFail" v-model="inputCenter">
    </div>
    <div class="game-container" v-show=this.quadrant.showWord&&validateLong>
      <h1 class="positionCenter correct">{{ this.quadrant.category.toUpperCase() }} ✔</h1>
    </div>
  </div>
  <!-- Show ids show Words complete Words -->
  <div v-show="$store.state.gameState==gameValues.showIdsShowWordsCompleteWords" class="game-container" >
    <h1 class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
    <div class="game-container" v-show=!this.quadrant.showWord >
      <h1 class="positionCenter" > {{this.quadrant.word.toUpperCase() }} </h1>
    </div>
    <div class="game-container" v-show=this.quadrant.showWord&&!validateLong&&longIsEmpty @click="setFocusStoppedWriting()">
      <input ref="wordStoppedWritingSISWCW" class="positionCenter inputEmpty" v-model="inputCenter">
    </div>
    <div class="game-container" v-show=this.quadrant.showWord&&!validateLong&&!longIsEmpty @click="setFocusWordWriting()">
      <input ref="wordWritingSISWCW" class="positionCenter inputFail" v-model="inputCenter">
    </div>
    <div class="game-container" v-show=this.quadrant.showWord&&validateLong>
      <h1 class="positionCenter">{{ this.quadrant.word.toUpperCase() }} ✔</h1>
    </div>
  </div>
  <!-- Draggable -->
  <div v-show="$store.state.gameState==gameValues.draggable" >
    <draggable class="game-container" @move="onMove" @drop="onDrop" @start="onStart" @add="onAdd" @remove="onRemove" @update="onUpdate" @end="onEnd" @choose="onChoose" @unchoose="onUnchoose" @sort="onSort" @clone="onClone">
      <h1 class="draggable">{{ this.quadrant.Id.toUpperCase() }} </h1>
    </draggable>
  </div>
  <!-- Highlight wrong values  -->
  <div v-show="$store.state.gameState==gameValues.highlightWrongValues">
    <div v-show="this.quadrant.Id == this.$store.state.quadrantsArrangement[0][this.idQuadrant].Id" class="game-container">
      <h1 class="draggable correct" > {{this.quadrant.Id.toUpperCase() }} </h1>
    </div>
    <div v-show="this.quadrant.Id != this.$store.state.quadrantsArrangement[0][this.idQuadrant].Id" class="game-container">
      <h1 class="draggable incorrect" > {{this.quadrant.Id.toUpperCase() }} </h1>
    </div>
  </div>
  <!-- Highlight wrong answer  -->
  <div v-show="$store.state.gameState==gameValues.highlightWrongAnswer" class="game-container">
    <h1 class="positionUp correct">{{ this.quadrant.Id.toUpperCase() }} </h1>
    <div v-show="this.correctWord||this.inputCenter.toUpperCase() == this.quadrant.word.toUpperCase()" class="game-container">
      <h1 class="positionCenter correct" > {{this.quadrant.word.toUpperCase() }} </h1>
    </div>
    <div v-show="!this.correctWord&&this.inputCenter.toUpperCase() != this.quadrant.word.toUpperCase()" class="game-container">
      <h1 class="positionCenter incorrect" > {{this.quadrant.word.toUpperCase() }} </h1>
    </div>
  </div>
  <!-- Show wrong answer  -->
  <div v-show="$store.state.gameState==gameValues.showWrongAnswer" class="game-container">
    <div v-show="!this.quadrant.showId&&this.input!=''" class="game-container">
      <h1 class="positionUp incorrect" > {{this.input.toUpperCase() }} </h1>
    </div>
    <div v-show="this.quadrant.showId&&this.correctId" class="game-container">
      <h1 class="positionUp correct" > {{this.quadrant.Id.toUpperCase() }} </h1>
    </div>
    <div v-show="this.quadrant.showId&&!this.correctId" class="game-container">
      <h1 class="positionUp incorrect" > {{this.input.toUpperCase() }} </h1>
    </div>

    <div v-show="!this.quadrant.showWord&&this.inputCenter!=''" class="game-container">
      <h1 class="positionCenter incorrect" > {{this.inputCenter.toUpperCase() }} </h1>
    </div>
    <div v-show="this.quadrant.showWord&&this.correctWord&&$store.state.typeOfExercise=='words'" class="game-container">
      <h1 class="positionCenter correct" > {{this.quadrant.word.toUpperCase() }} </h1>
    </div>
    <div v-show="this.quadrant.showWord&&this.correctWord&&$store.state.typeOfExercise=='category'" class="game-container">
      <h1 class="positionCenter correct" > {{this.quadrant.category.toUpperCase() }} </h1>
    </div>
    <div v-show="this.quadrant.showWord&&!this.correctWord" class="game-container">
      <h1 class="positionCenter incorrect" > {{this.inputCenter.toUpperCase() }} </h1>
    </div>
  </div>
    <!-- Show ids and wrong words -->
    <div v-show="$store.state.gameState==gameValues.showIdsAndWrongWords" class="game-container">
      <h1 class="positionUp correct">{{ this.quadrant.Id.toUpperCase() }} </h1>
      <div v-show="!this.quadrant.showWord&&this.inputCenter!=''" class="game-container">
        <h1 class="positionCenter incorrect" > {{this.inputCenter.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showWord&&this.correctWord&&$store.state.typeOfExercise=='words'" class="game-container">
        <h1 class="positionCenter correct" > {{this.quadrant.word.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showWord&&this.correctWord&&$store.state.typeOfExercise=='category'" class="game-container">
        <h1 class="positionCenter correct" > {{this.quadrant.category.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showWord&&!this.correctWord" class="game-container">
        <h1 class="positionCenter incorrect" > {{this.inputCenter.toUpperCase() }} </h1>
      </div>
    </div>
    <!-- Show hide words and wrong words -->
    <div v-show="$store.state.gameState==gameValues.showHideWordsAndWrongWords" class="game-container">
      <div v-show="!this.quadrant.showWord" class="game-container">
        <h1 class="positionCenter correct" > {{this.quadrant.word.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showWord&&this.correctWord&&$store.state.typeOfExercise=='words'" class="game-container">
        <h1 class="positionCenter correct" > {{this.quadrant.word.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showWord&&this.correctWord&&$store.state.typeOfExercise=='category'" class="game-container">
        <h1 class="positionCenter correct" > {{this.quadrant.category.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showWord&&!this.correctWord" class="game-container">
        <h1 class="positionCenter incorrect" > {{this.inputCenter.toUpperCase() }} </h1>
      </div>
    </div>
    <!-- Show ids show hide words and wrong words -->
    <div v-show="$store.state.gameState==gameValues.showIdsShowHideWordsAndWrongWords" class="game-container">
      <h1 class="positionUp correct">{{ this.quadrant.Id.toUpperCase() }} </h1>
      <div v-show="!this.quadrant.showWord" class="game-container">
        <h1 class="positionCenter correct" > {{this.quadrant.word.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showWord&&this.correctWord&&$store.state.typeOfExercise=='words'" class="game-container">
        <h1 class="positionCenter correct" > {{this.quadrant.word.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showWord&&this.correctWord&&$store.state.typeOfExercise=='category'" class="game-container">
        <h1 class="positionCenter correct" > {{this.quadrant.category.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showWord&&!this.correctWord" class="game-container">
        <h1 class="positionCenter incorrect" > {{this.inputCenter.toUpperCase() }} </h1>
      </div>
    </div>
    <!-- Show words and wrong ids -->
    <div v-show="$store.state.gameState==gameValues.showWordsAndWrongIds" class="game-container">
      <div v-show="!this.quadrant.showId&&this.input!=''" class="game-container">
        <h1 class="positionUp incorrect" > {{this.input.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showId&&this.correctId" class="game-container">
        <h1 class="positionUp correct" > {{this.quadrant.Id.toUpperCase() }} </h1>
      </div>
      <div v-show="this.quadrant.showId&&!this.correctId" class="game-container">
        <h1 class="positionUp incorrect" > {{this.input.toUpperCase() }} </h1>
      </div>
      <h1 class="positionCenter correct">{{ this.quadrant.word.toUpperCase() }} </h1>
    </div>
</div>
</template>

<script>
import '../assets/common.scss';
import { VueDraggableNext } from 'vue-draggable-next';
import * as GameValues from '../Games/gamevalues.js';
import * as GameMethods from '../Games/gamemethods';
var wagnerFischer = require('wagner-fischer');

export default {
	name: 'MyQuadrant',
  props: {
    quadrant:{
      type:Array,
    },
    idMyGame:String,
    idQuadrant:String,
    value: {
      Type: Array,
      Required: false,
      Default: null,
    },
    /*move: {
      Type: Function,
      Required: false,
      Default: null,
    }*/
  },
  components:{
    draggable: VueDraggableNext,
  },
  created(){
    this.$store.commit('setQuadrant',this);
    this.$emit('quadrantCreated');
    this.$emit('setWordsAndIds');
  },
  data(){
    return{
      validateShort:false,
      validateLong:false,
      shortIsEmpty:true,
      longIsEmpty:true,
      inputCenter:"",
      input:"",
      correctWord:false,
      correctId:false,
      defaultCorrectWord:false,
      defaultCorrectId:false,
      clicked:0,
      correctClick:false,
      incorrectClick:false,
      firstChoose:false,
      gameValues:GameValues,
      blocking:false,
      amountBlocking:0,
      limitBlocking:GameValues.limitBlocking,
    }
  },
  methods: {
    idCorrect: function(){
      console.log("Vengo a id correct input = "+this.input);
      if (this.input != ""){
        this.$emit('writeLetter');
      }
      console.log("id que tengo = "+this.input.toUpperCase()+" \n id real = "+this.quadrant.Id.toUpperCase()+" \n id showeable? "+this.quadrant.showId);
      console.log("Default true? "+this.defaultCorrectId);
      console.log("Correct = "+this.correctId);
      if(this.quadrant.Id.toUpperCase()===this.input.toUpperCase() && this.quadrant.showId) {
        // eslint-disable-next-line no-unreachable
        this.validateShort=true;
        this.correctId = true;
        this.$emit('idCorrect')
      }
    },
    idEmpty: function(){
      if(this.input.length==1) {
        // eslint-disable-next-line no-unreachable
        //Si el campo del id estaba vacio y se escribio, se cuenta como un intento
        if(this.shortIsEmpty){
          this.amountBlocking+=1;
          if (this.amountBlocking == this.limitBlocking && (this.defaultCorrectId || this.input.toString().toUpperCase() != this.quadrant.Id)){
            this.blocking = true;
            GameMethods.showWarningTitle("Has alcanzado el límite de intentos para el cuadrante");
          }
        }
        this.shortIsEmpty=false;
        this.setFocusWordWriting();
        console.log("Default correct id = "+this.defaultCorrectId);
        console.log("La que escribi = "+this.input.toString().toUpperCase());
        console.log("Palabra = "+this.quadrant.Id);
        console.log("Deberia entrar "+this.defaultCorrectId+" "+this.correctId);
        //Si el id es por defecto correcto
        if(this.defaultCorrectId && this.correctId){
          //El id  pasa a tomarse como incorrecto
          this.$emit('setCorrectId',false);
          this.correctId=false;
        }
      }
      //Si se borraron todos los caracteres del input
      if (this.input.length==0){
        //Se cambia la variable y se recupera el focus
        this.shortIsEmpty = true;
        this.setFocusStoppedWriting();
        //Si el id es por defecto correcto
        if(this.defaultCorrectId && !this.correctId){
          //El id se vuelve a tomar como correcta
          this.$emit('setCorrectId',true);
          this.correctId=true;
        }
      }
    },
    //Chequeo que la palabra escrita por el usuario sea igual a la que pide el ejercicio
    wordCorrect: function(){
      if (this.inputCenter != ""){
        this.$emit('writeLetter');
      }
      if(this.$store.state.typeOfExercise==GameValues.words&&this.quadrant.word.toUpperCase()===this.inputCenter.toUpperCase()&&this.quadrant.showWord) {
        // eslint-disable-next-line no-unreachable
        console.log("La palabra es correcta");
        this.validateLong=true;
        this.correctWord = true;
        this.$emit('wordCorrect');
      }
      else{
        if(this.$store.state.typeOfExercise==GameValues.category&&this.quadrant.category.toUpperCase()===this.inputCenter.toUpperCase()&&this.quadrant.showWord) {
          // eslint-disable-next-line no-unreachable
          this.validateLong=true;
          this.correctWord = true;
          this.$emit('wordCorrect');
        }
      }
    },
    wordIncorrect(){this.$emit('wordIncorrect');},

    //Chequea si la palabra esta vacia o no para cambiar el color del input
    wordEmpty: function(){
      //Si no esta vacia
      if(this.inputCenter.length>=1) {
        //Se cambia la variable y se setea el focus
        this.longIsEmpty=false;
        this.setFocusWordWriting();
        //Si la palabra es por defecto correcta
        if(this.defaultCorrectWord && this.correctWord){
          //La palabra pasa a tomarse como incorrecta
          this.$emit('setCorrectWord',false);
          this.correctWord=false;
        }
      }
      //Si se borraron todos los caracteres del input
      if (this.inputCenter.length==0){
        //Se cambia la variable y se recupera el focus
        this.longIsEmpty = true;
        this.setFocusStoppedWriting();
        //Si la palabra es por defecto correcta
        if(this.defaultCorrectWord && !this.correctWord){
          //La palabra se vuelve a tomar como correcta
          this.$emit('setCorrectWord',true);
          this.correctWord=true;
        }
      }
    },
    //Chequeo que el ejercicio esté completado correctamente
    checkWord() {
        //Si la palabra no se verifico como como correcta anteriormente
        if(!this.correctWord){
          //Si la palabra se mostró, entonces se tiene que chequear que sea correcta)
          if (this.quadrant.showWord){
            //Si la palabra necesita ser chequeada en caso de que el usuario pueda haberla escrito mal
            if ((wagnerFischer(this.inputCenter.toString().toUpperCase(), this.quadrant.word.toUpperCase()) <= 2)) {
              //Añado palabra correcta
              this.$emit('wordCorrect');
            } else {
              //Añado palabra incorrecta
              this.$emit('wordIncorrect');
            }
          }
          else{
            //Añado palabra por defecto
            this.$emit('defaultWord');
          }
        }
        else{
          if (this.inputCenter == "") {
            this.$emit('wordIncorrect');
          }
        }
    },
    //Chequeo que el ejercicio esté completado correctamente
    checkId() {
      if (!this.correctId){
        console.log("ID INCORRECTO");
        this.$emit('idIncorrect');
      }
      else{
        if (!this.quadrant.showId){
          console.log("ID POR DEFECTO");
          this.$emit('defaultId');
        }
      }
    },
    checkCategory(){
      //Si la palabra no se verifico como correcta anteriormente
      console.log("palabra = "+this.inputCenter.toString());
      console.log("ES correcta? "+this.correctWord);
      console.log("This show word? "+this.quadrant.showWord);
      if (!this.correctWord){
        //Si hay que completar la categoria hay que chequear que sea correcta
        if (this.quadrant.showWord){
          if ((wagnerFischer(this.inputCenter.toString().toUpperCase(), this.quadrant.category.toUpperCase()) <= 2)) {
            //Añado palabra correcta
            this.$emit('wordCorrect');
            } else {
              //Añado palabra incorrecta
              this.$emit('wordIncorrect');
            }
          }
          else{
            //Añado palabra por defecto
            this.$emit('defaultWord');
          }
        }
      else{
        if (this.inputCenter == "") {
          this.$emit('wordIncorrect');
        }
      }
      },
    checkDrag : function(){
      console.log("Checkeo el drag");
    if (this.quadrant.Id == this.$store.state.quadrantsArrangement[0][this.idQuadrant].Id)
      {
        console.log("El cuadrante con el id "+this.idQuadrant+" esta bien");
        this.$emit('checkDrag',true);
      }
    else{
      this.$emit('checkDrag',false);
    }
    },
    restoreQuadrant : function() {
      console.log("Pregunto por " + this.input.toString());
      console.log("Pregunto por " + this.inputCenter.toString());
      console.log("Hago el restore" + this.input.toString());
      this.validateShort=false;
      this.validateLong=false;
      this.shortIsEmpty=true;
      this.longIsEmpty=true;
      this.inputCenter="";
      this.input="";
      this.correctWord=false;
      this.correctId=false;
      this.clicked=0;
      this.correctClick=false;
      this.incorrectClick=false;
      this.firstChoose=false;
      this.blocking=false;
      this.amountBlocking=0;
      this.limitBlocking=GameValues.limitBlocking;
    },
    //Observo la variable help que cuando sea verdadera dará una ayuda al usuario para el siguiente intento del ejercicio
    helpQuadrant() {
      if (this.quadrant.showWord) {
        if (this.$store.state.typeOfExercise==GameValues.words)
          this.inputCenter = this.quadrant.word.charAt(0);
        else if(this.$store.state.typeOfExercise==GameValues.category){
          this.inputCenter = this.quadrant.category.charAt(0);
        }
      }
    },
    clickedWord(){
      //this.clicked = true;
      if (this.$store.state.permissionToClick){
        if (this.clicked==1){
          console.log("entro al click bien");
          if (!this.$store.state.buttonEnd){
            this.$store.commit('changeButtonEnd',true);
            this.$emit('writeLetter');
          }

          if (this.quadrant.category != this.$store.state.firstCategory && this.quadrant.category != this.$store.state.secondCategory){
            console.log("Correcto");
            this.$emit('correctClick',this);
            this.correctClick = true;
          }
          else{
            console.log("Incorrecto");
            this.$emit('incorrectClick',this);
            this.incorrectClick = true;
          }
        }
      }
    },
    onEnd : function(){
      this.$store.commit('updateQuadrants');
      this.$store.commit('checkExercise');
    },
    onChoose : function(){
      this.$store.commit('setInitialQuadrant',this);
      if (!this.firstChoose){
        this.firstChoose = true;
        this.$emit('writeLetter');
      }

    },
    onDrop : function(){
      this.$store.commit('setFinalQuadrant',this);
    },
    onClick : function(){
      console.log("Cliqueado cuadrante "+this.idQuadrant);
    },
    //Metodo que recupera el focus cuando se empieza a escribir en un input
    setFocusWordWriting : function (){
      switch (this.$store.state.gameState){
        case GameValues.completeWords: this.$nextTick(() =>this.$refs.wordWritingCW.focus()); break;
        case GameValues.showIdsCompleteWords: this.$nextTick(() => this.$refs.wordWritingSICW.focus()); break;
        case GameValues.showWordsCompleteCategories: this.$nextTick(() => this.$refs.wordWritingSWCC.focus()); break;
        case GameValues.showIdsShowWordsCompleteWords: this.$nextTick(() => this.$refs.wordWritingSISWCW.focus()); break;
        case GameValues.completeIds : this.$nextTick ( () => this.$refs.wordWritingCI.focus()); break;
        case GameValues.showWordsCompleteIds : this.$nextTick ( () => this.$refs.wordWritingSWCI.focus()); break;
      }
    },
    //Metodo que recupera el focus cuando se borran todos los caracteres de un input
    setFocusStoppedWriting : function (){
      switch (this.$store.state.gameState){
        case GameValues.completeWords: this.$nextTick(() => this.$refs.wordStoppedWritingCW.focus()); break;
        case GameValues.showIdsCompleteWords: this.$nextTick(() => this.$refs.wordStoppedWritingSICW.focus()); break;
        case GameValues.showWordsCompleteCategories: this.$nextTick(() => this.$refs.wordStoppedWritingSWCC.focus()); break;
        case GameValues.showIdsShowWordsCompleteWords: this.$nextTick(() => this.$refs.wordStoppedWritingSISWCW.focus()); break;
        case GameValues.completeIds : this.$nextTick ( () => this.$refs.wordStoppedWritingCI.focus()); break;
        case GameValues.showWordsCompleteIds : this.$nextTick ( () => this.$refs.wordStoppedWritingSWCI.focus()); break;
      }
    },
  },
  watch:{
     input() {
      this.idCorrect();
      this.idEmpty();
      GameMethods.restartInterval();
        },
      //Observo lo que va escribiendo el usuario
      inputCenter(){
        this.wordCorrect();
        this.wordEmpty();
        GameMethods.restartInterval();
      },
      clicked(){
        this.clickedWord();
      },
      //Observo la varibale check que será verdadera cuando termine un ejercicio
      /*check(){
          this.checkWord();
      },*/
    }


}
</script>

<style lang="scss" scoped>
.game-container {
  height: 50vh;
  width: 50vw;
  position: absolute;
  display: grid;
  grid-template-columns : repeat(5,20%);
  grid-template-rows: repeat(5,20%);
  margin:0;
}
.positionUp{
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: 1;
}

.positionCenter {
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 2;
  margin-left: -15%;
}
h1.draggable{
  grid-column-start: 2;
  grid-row-start: 2;
  font-size: 15rem;
}
h1{
  margin-right: -50%;
  font-size: 4rem;
  display: flex;
  color:white;
}
h1.positionCenter{
  margin-top:20%;
  font-size: 4rem;
}
h1.positionUp{
  margin-left: 1%;
}
.incorrect{
  color:red;
}
.correct{
  color:greenyellow;
}
.neutral{
  color:white;
}
input {
  height: 8rem;
  width:33rem;
	font-size:4rem;
	color:#aaa;
	border:4px solid #aaa;
	border-radius: 20px;
	outline:none;
	padding: 2%;
  margin:3rem;
}
input.id{
  height: 4rem;
  width: 10rem;
  margin:1rem;
}
.inputEmpty:focus {
	border-color:dodgerblue;
	box-shadow:0 0 8Px 0 dodgerblue;
}
.inputFail{
  color:white;
}
.inputFail:focus {
  border-color:darkred;
  box-shadow:0 0 8Px 0 darkred;
}

.btn-8{
  margin-top: 5rem;
  margin-left: 3rem;
  height: 3.5rem;
  width: 80%;
  font-size: 3rem;
  color: white;
  padding: 2.5rem 1rem;
  border-radius: 12px;
}

.btn-global-8:hover {
  color:#2C3E50;
}
.btn-incorrect {
  border-color:darkred;
  box-shadow:0 0 25Px 0 darkred;
}
.btn-correct {
  border-color:springgreen;
  box-shadow:0 0 25Px 0 springgreen;
}
.btn-incorrect {
  border-color:darkred;
  box-shadow:0 0 40Px 0 darkred;
  color:darkred;
}
.btn-correct {
  border-color:springgreen;
  box-shadow:0 0 40Px 0 springgreen;
  color:springgreen;
}
@media screen and (max-width: 1500px) {
  input {
    height: 6rem;
    width:16rem;
    font-size:4rem;
  }
  h1{
    font-size: 4rem;
  }
  .btn-8{
    width: 18rem;
    height: 4rem;
    font-size: 2.5rem;
  }
}

@media screen and (min-width:960px )  and (max-width: 1328px) {
  h1.positionCenter{
    font-size: 3.5rem;
  }
  h1.draggable{
    font-size: 12rem;
  }
  input {
    height: 6rem;
    width:16rem;
    font-size:3rem;
  }
  .btn-global-8{
    width: 18rem;
    height: 4rem;
    font-size: 3rem;
  }
}

@media screen and (min-width:740px )  and (max-width: 960px) {
  h1.draggable{
    font-size: 9rem;
  }
  input {
    height: 5rem;
    width:14rem;
    font-size:2rem;
  }
  input.id{
    width: 6rem;
    heigth:5rem;
  }
  h1.positionCenter{font-size: 2.5rem;
  }
  .btn-8{
    margin-left: -3rem;
    height: 2.5rem;
    font-size: 1.65rem;
  }

}
@media screen  and (max-width: 740px) {
  h1.draggable{
    font-size: 9rem;
  }
  input {
    height: 4rem;
    width:10rem;
    font-size:2rem;
  }
  h1.positionCenter{
    font-size: 2rem;
  }
  .btn-8{
    margin-left: -3rem;
    height: 2rem;
    font-size: 1.35rem;
  }
  input.id{
    width: 4rem;
    heigth:5rem;
  }
}
@media screen and (max-width:540px )  {
  input {
    height: 3rem;
    width:8rem;
    font-size:1.5rem;
  }
  h1.positionCenter{
    font-size: 1.5rem;
  }
}
</style>
