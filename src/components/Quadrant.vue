<template>
  <!-- Mostrar Valores  -->
      <div v-show="$store.state.quadrantState==0">
            <h1 v-if="this.quadrant.showId" class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
            <h1 v-if="this.quadrant.showWord" class="positionCenter">{{ this.quadrant.word.toUpperCase() }} </h1>
        </div>
      <!-- Ingresar Palabra  -->
      <div v-show="$store.state.quadrantState==1" >
      <div v-show=!validateLong&&longIsEmpty>
        <input class="positionCenter inputEmpty" v-model="inputCenter">
      </div>
      <div v-show=!validateLong&&!longIsEmpty>
        <input class="positionCenter inputFail" v-model="inputCenter">
      </div>
      <div v-show=validateLong>
        <h1 class="positionCenter">{{ this.quadrant.word.toUpperCase() }} ☑</h1>
      </div>
    </div>
  <!-- Insertar ID CUADRANTE   -->
   <div v-show="$store.state.quadrantState==2" >
    <div v-show=!validateShort&&shortIsEmpty>
        <input class="positionUp inputEmpty" v-model="input">
      </div>
       <div v-show=!validateShort&&!shortIsEmpty>
         <input class="positionUp inputFail" v-model="input">
       </div>
      <div v-show=validateShort>
        <h1 class="positionUp">{{ this.quadrant.Id.toUpperCase() }} ☑</h1>
      </div>
     </div>
     <!-- Insertar ID CUADRANTE   -->
     <div v-show="$store.state.quadrantState==3">
       <h1 class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
     </div>
   <!-- Correcto   -->
    <div v-show="$store.state.quadrantState==4">
    <h1 class="positionCenter">Correcto</h1>
    </div>
      <!-- Incorrecto  -->
    <div v-show="$store.state.quadrantState==5">
    <h1 class="positionCenter incorrect">InCorrecto</h1>
    </div>
      <!-- Ayuda de palabra  -->
  <!-- Ingresar Palabra  -->
    <div v-show="$store.state.quadrantState==6" >
    <div v-show=!validateLong&&longIsEmpty>
      <input class="positionCenter inputEmpty" v-model="inputCenter">
    </div>
    <div v-show=!validateLong&&!longIsEmpty>
      <input class="positionCenter inputFail" v-model="inputCenter">
    </div>
    </div>
</template>

<script>
import '../assets/common.scss'
var wagnerFischer = require('wagner-fischer');

export default {
	name: 'MyQuadrant',
  props: {
    inputHelp:{
      default: "",
      type:String,
    },
    check: {
      default: false,
      type:Boolean,
    },
    quadrant:{
      type:Array,
    },
    defaultCorrect:{
      type:Boolean,
    },
  },

  data(){
    return{
      validateShort:false,
      validateLong:false,
      shortIsEmpty:true,
      longIsEmpty:true,
      inputCenter:"",
      input:"",
      showWord:"false",
      showId:"false",
      correct:false,
    }
  },
  created() {
    this.helpWord();
  },
  methods: {
    idCorrect: function(){
      this.$emit('writeId');
      if(this.quadrant.Id.toUpperCase()===this.input.toUpperCase()&&this.quadrant.showId) {
        // eslint-disable-next-line no-unreachable
        this.validateShort=true;
        this.$emit('idCorrect')
      }
    },
    idEmpty: function(){
      if(this.input.length>=1) {
        // eslint-disable-next-line no-unreachable
        this.shortIsEmpty=false;
      }
    },
    //Chequeo que la palabra escrita por el usuario sea igual a la que pide el ejercicio
    wordCorrect: function(){
      this.$emit('writeWord');
      if(this.quadrant.word.toUpperCase()===this.inputCenter.toUpperCase()&&this.quadrant.showWord) {
        // eslint-disable-next-line no-unreachable
        this.validateLong=true;
        this.correct = true;
        this.$emit('wordCorrect');
      }
    },
    wordIncorrect(){this.$emit('wordIncorrect');},
    //No se bien que hace, no deja gris el campo donde escribe el usuario
    wordEmpty: function(){
      if(this.inputCenter.length>=1) {
        // eslint-disable-next-line no-unreachable
        this.longIsEmpty=false;
      }
    },
    //Chequeo que el ejercicio esté completado correctamente
    checkWord() {
      console.log("entra a check word");
      if( !this.correct || !this.defaultCorrect || this.inputCenter.toString().trim().length != 0) {
        if ((wagnerFischer(this.inputCenter.toString().toUpperCase(), this.quadrant.word.toUpperCase()) <= 2)) {
          //luego de chequear, limpio el cuadrante por si se vuelve a usar
          this.clearQuadrant();
          this.$emit('wordCorrect');
        } else if (this.check === true){
          console.log("añade word incorrect");
          this.clearQuadrant();
          this.$emit('wordIncorrect');
        }
      }

    },
    clearQuadrant(){
      this.inputCenter = "";
      this.$store.commit('changeQuadrantState',1);
    },
    helpWord(){
      if ((this.help===true)&& (this.showWord)){
        this.inputCenter=this.quadrant.word.charAt(0);
        console.log(this.inputCenter);
      }
    }
  },
  watch:{
     input() {
      this.idCorrect();
      this.idEmpty();
        },
      //Observo lo que va escribiendo el usuario
      inputCenter(){
        this.wordCorrect();
        this.wordEmpty();
      },
      //Observo la varibale check que será verdadera cuando termine un ejercicio
      check(){
          this.checkWord();
      }
    }

}
</script>

<style lang="scss" scoped>
h1{
  font-size: 75px;
  color:greenyellow;
}
.incorrect{
  color:darkred;
}
input {
	font-size: 75PX;
	color:#aaa;
	background-color: #2C3E50;
	border:4px solid #aaa;
	border-radius: 20px;
	outline:none;
	padding: 2%;
	box-sizing: border-box;
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

</style>
