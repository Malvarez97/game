<template>
  <!-- Mostrar Valores  -->
  <div v-show="this.state==0">
      <h1 class="positionUp">{{ quadrantId.toUpperCase() }} </h1>
      <h1 class="positionCenter">{{ word.toUpperCase() }} </h1>
    </div>
  <div v-show="this.state==-1">
    <h1 class="positionUp">{{ quadrantId.toUpperCase() }} </h1>
  </div>
      <!-- Ingresar Palabra  -->
      <div v-show="this.state==1" >
      <div v-show=!validateLong&&longIsEmpty>
        <input class="positionCenter inputEmpty" v-model="inputCenter">
      </div>
      <div v-show=!validateLong&&!longIsEmpty>
        <input class="positionCenter inputFail" v-model="inputCenter">
      </div>
      <div v-show=validateLong>
        <h1 class="positionCenter">{{ word.toUpperCase() }} ☑</h1>
      </div>
    </div>
  <!-- Insertar ID CUADRANTE   -->
   <div v-show="this.state==2" >
    <div v-show=!validateShort&&shortIsEmpty>
        <input class="positionUp inputEmpty" v-model="input">
      </div>
       <div v-show=!validateShort&&!shortIsEmpty>
         <input class="positionUp inputFail" v-model="input">
       </div>
      <div v-show=validateShort>
        <h1 class="positionUp">{{ quadrantId.toUpperCase() }} ☑</h1>
      </div>
     </div>
     <!-- Insertar ID CUADRANTE   -->
     <div v-show="this.state==3">
       <h1 class="positionUp">{{ quadrantId.toUpperCase() }} </h1>
     </div>
   <!-- Correcto   -->
    <div v-show="this.state==4">
    <h1 class="positionCenter">Correcto</h1>
    </div>
      <!-- Incorrecto  -->
    <div v-show="this.state==5">
    <h1 class="positionCenter incorrect">InCorrecto</h1>
    </div>
      <!-- Ayuda de palabra  -->
  <!-- Ingresar Palabra  -->
    <div v-show="this.state==6" >
    <div v-show=!validateLong&&longIsEmpty>
      <input class="positionCenter inputEmpty" v-model="inputCenter">
    </div>
    <div v-show=!validateLong&&!longIsEmpty>
      <input class="positionCenter inputFail" v-model="inputCenter">
    </div>
    </div>
</template>

<script>
var wagnerFischer = require('wagner-fischer');

export default {
	name: 'MyQuadrant',
  props: {
    word:{
      default:"",
    },
    quadrantId:String,
    state:Number,
    inputHelp:{
      default: "",
      type:String,
    },
    check: {
      default: false,
      type:Boolean,
    }
  },
  data(){
    return{
      validateShort:false,
      validateLong:false,
      shortIsEmpty:true,
      longIsEmpty:true,
      input:"",
      inputCenter:this.inputHelp,
    }
  },
  methods: {
    idCorrect: function(){
      this.$emit('writeId');
      if(this.quadrantId.toUpperCase()===this.input.toUpperCase()) {
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
    wordCorrect: function(){
      this.$emit('writeWord');
      if(this.word.toUpperCase()===this.inputCenter.toUpperCase()) {
        // eslint-disable-next-line no-unreachable
        this.validateLong=true;
        this.$emit('wordCorrect')
      }
    },
    wordEmpty: function(){
      if(this.inputCenter.length>=1) {
        // eslint-disable-next-line no-unreachable
        this.longIsEmpty=false;
      }
    },
    checkWord(){
      console.log("se chequeo la palabra, dio"+wagnerFischer(this.inputCenter.toString().toUpperCase(),this.word.toUpperCase()))
      if ((this.check===true)&&(wagnerFischer(this.inputCenter.toString().toUpperCase(),this.word.toUpperCase())<=2)){
        this.$emit('wordCorrect');
      }
    }
  },
  watch:{
     input() {
      this.idCorrect();
      this.idEmpty();
        },
      inputCenter(){
        this.wordCorrect();
        this.wordEmpty();
      },
      check(){
          this.checkWord();
      }
    }

}
</script>

<style scoped>
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
.positionUp{
	position:relative;
	left: 2%;
	top:5%;
	width:25%;
}
.positionCenter {
	position:relative;
	left:15%;
	top:150px;
	width:50%;
	padding: 2%;
}
</style>
