<template>
  <!-- Mostrar Valores  -->
      <div v-show="$store.state.quadrantState==0||$store.state.quadrantState==6">
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
      <!-- Ejemplo de botones falta funcionalidad   -->
    <div v-show="$store.state.quadrantState==7">
        <v-btn outline rounded class="positionCenter btn-correct btn-centered" fab color="indigo" >
          {{this.quadrant.word.toUpperCase()}}
        </v-btn>
      </div>
  <!-- Ejemplo de botones -->
  <div v-show="$store.state.quadrantState==8">
    <v-btn outline rounded class="positionCenter btn-correct btn-centered" fab color="#4758B8" >
      {{this.quadrant.word.toUpperCase()}}
    </v-btn>
  </div>
</template>

<script>
import '../assets/common.scss'
var wagnerFischer = require('wagner-fischer');

export default {
	name: 'MyQuadrant',
  props: {
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
      console.log("id que tengo = "+this.input.toUpperCase()+" \n id real = "+this.quadrant.Id.toUpperCase()+" \n id showeable? "+this.quadrant.showId);
      if(this.quadrant.Id.toUpperCase()===this.input.toUpperCase() && this.quadrant.showId) {
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
      if (this.check){
        console.log("estado actual del juego = "+this.$store.state.gameState);
        console.log("check = "+this.check);
        console.log("word que tengo = "+this.inputCenter.toUpperCase()+" \n word real = "+this.quadrant.word.toUpperCase()+" \n word showeable? "+this.quadrant.showWord);
        //Si la palabra no se verifico como como correcta anteriormente
        if( !this.correct){
          console.log("La palabra no era correcta");
          //Si la palabra no es por defecto correcta (era necesario completarla para el ejercicio)
          if (!this.defaultCorrect){
            console.log("La palabra no era por defecto correcta");
            //Si la palabra necesita ser chequeada en caso de que el usuario pueda haberla escrito mal
            if ((wagnerFischer(this.inputCenter.toString().toUpperCase(), this.quadrant.word.toUpperCase()) <= 2)) {
              //Añado palabra correcta
              console.log("emito correcta");
              this.$emit('wordCorrect');
            } else {
              console.log("emito incorrecta");
              //Añado palabra incorrecta
              this.$emit('wordIncorrect');
            }
          }
          else{
            //Añado palabra por defecto
            console.log("emito default");
            this.$emit('defaultWord');
          }
        }
      }
      //Se deja el cuadrante vacio por si hay que volver a realizar el ejercicio
      this.clearQuadrant();
    },
    clearQuadrant(){
      this.inputCenter = "";
      this.$store.commit('changeQuadrantState',1);
    },
    helpWord(){
      if ((this.$store.state.quadrantState==0)&&(this.quadrant.showWord)){
        this.inputCenter=this.quadrant.word.charAt(0);
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
  font-size: 4.5rem;
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
.btn-centered{
  padding: 20PX;
  font-size: 3rem;
  color: white;
  padding: 2rem;
  height:20%;
}
.btn-incorrect:focus {
  border-color:darkred;
  box-shadow:0 0 25Px 0 darkred;
}
.btn-correct:focus {
  border-color:springgreen;
  box-shadow:0 0 25Px 0 springgreen;
}
.btn-incorrect:focus {
  border-color:darkred;
  box-shadow:0 0 40Px 0 darkred;
  color:darkred;
}
.btn-correct:focus {
  border-color:springgreen;
  box-shadow:0 0 40Px 0 springgreen;
  color:springgreen;
}

</style>
