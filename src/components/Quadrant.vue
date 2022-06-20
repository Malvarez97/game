<template>
  <div class="container">
  <!-- Mostrar Valores  -->
      <div v-show="$store.state.quadrantState==0" class="game-container">
        <h1 v-if="this.quadrant.showId" class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
        <h1 v-if="this.quadrant.showWord" class="positionCenter">{{ this.quadrant.word.toUpperCase() }} </h1>
      </div>
  <!-- Ingresar Palabra  -->
      <div v-show="$store.state.quadrantState==1"  >
        <div v-show=!validateLong&&longIsEmpty class="game-container">
          <input class="positionCenter inputEmpty" v-model="inputCenter">
        </div>
        <div v-show=!validateLong&&!longIsEmpty class="game-container">
          <input class="positionCenter inputFail" v-model="inputCenter">
        </div>
        <div v-show=validateLong class="game-container">
          <h1 class="positionCenter">{{ this.quadrant.word.toUpperCase() }} ☑</h1>
        </div>
    </div>
  <!-- Insertar ID CUADRANTE   -->
   <div v-show="$store.state.quadrantState==2"  >
     <div v-show=!validateShort&&shortIsEmpty class="game-container">
       <input class="positionUp inputEmpty id" v-model="input">
     </div>
        <div v-show=!validateShort&&!shortIsEmpty class="game-container">
           <input class="positionUp inputFail id" v-model="input">
         </div>
        <div v-show=validateShort class="game-container">
          <h1 class="positionUp">{{ this.quadrant.Id.toUpperCase() }} ☑</h1>
        </div>
       </div>
     <!-- Insertar ID CUADRANTE   -->
     <div v-show="$store.state.quadrantState==3" class="game-container id " >
       <h1 class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
     </div>
   <!-- Correcto   -->
    <div v-show="$store.state.quadrantState==4" class="game-container">
        <h1 class="positionCenter">Correcto</h1>
    </div>
      <!-- Incorrecto  -->
    <div v-show="$store.state.quadrantState==5" class="game-container">
      <h1 class="positionCenter incorrect">InCorrecto</h1>
    </div>
      <!-- Ejemplo de botones falta funcionalidad   -->
    <div v-show="$store.state.quadrantState==7" class="game-container" >
        <v-btn outline rounded class="positionCenter btn-correct btn-global-8" fab color="indigo" >
          {{this.quadrant.word.toUpperCase()}}
        </v-btn>
      </div>
  <!-- Ejemplo de botones -->
  <div v-show="$store.state.quadrantState==8" class="game-container">
    <v-btn v-show=!clicked @click="this.clicked=true" outline rounded class=" positionCenter btn-global-8" fab color="#4758B8"  >
      {{this.quadrant.word.toUpperCase()}}
    </v-btn>
    <v-btn v-show=clicked&&correctClick outline rounded class=" positionCenter btn-correct btn-global-8" fab color="#4758B8"  >
      {{this.quadrant.word.toUpperCase()}}
    </v-btn>
    <v-btn v-show=clicked&&!correctClick outline rounded class=" positionCenter btn-incorrect btn-global-8" fab color="#4758B8"  >
      {{this.quadrant.word.toUpperCase()}}
    </v-btn>
  </div>
  <!-- Ingresar Palabras mostrando ids  -->
  <div v-show="$store.state.quadrantState==9" class="game-container" >
    <h1 v-if="this.quadrant.showId" class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
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
  <!-- Ingresar palabras y chequear por categorias -->
  <div v-show="$store.state.quadrantState==10" class="game-container" >
    <div v-show=!this.quadrant.showWord >
      <h1 class="positionCenter" > {{this.quadrant.word.toUpperCase() }} </h1>
    </div>
    <div v-show=this.quadrant.showWord&&!validateLong&&longIsEmpty>
      <input class="positionCenter inputEmpty" v-model="inputCenter">
    </div>
    <div v-show=this.quadrant.showWord&&!validateLong&&!longIsEmpty>
      <input class="positionCenter inputFail" v-model="inputCenter">
    </div>
    <div v-show=this.quadrant.showWord&&validateLong>
      <h1 class="positionCenter">{{ this.quadrant.category.toUpperCase() }} ☑</h1>
    </div>
  </div>
  <!-- Mostrar t0do -->
  <div v-show="$store.state.quadrantState==11" class="game-container">
    <h1 class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
    <h1 class="positionCenter">{{ this.quadrant.word.toUpperCase() }} </h1>
  </div>
  <!-- Ingresar palabras y chequear por palabra -->
  <div v-show="$store.state.quadrantState==12" class="game-container" >
    <h1 class="positionUp">{{ this.quadrant.Id.toUpperCase() }} </h1>
    <div v-show=!this.quadrant.showWord >
      <h1 class="positionCenter" > {{this.quadrant.word.toUpperCase() }} </h1>
    </div>
    <div v-show=this.quadrant.showWord&&!validateLong&&longIsEmpty>
      <input class="positionCenter inputEmpty" v-model="inputCenter">
    </div>
    <div v-show=this.quadrant.showWord&&!validateLong&&!longIsEmpty>
      <input class="positionCenter inputFail" v-model="inputCenter">
    </div>
    <div v-show=this.quadrant.showWord&&validateLong>
      <h1 class="positionCenter">{{ this.quadrant.word.toUpperCase() }} ☑</h1>
    </div>
  </div>
  <!-- Quadrant draggable -->
  <div v-show="$store.state.quadrantState==13" class="game-container" >
    <draggable @move="onMove" @drop="onDrop" @start="onStart" @add="onAdd" @remove="onRemove" @update="onUpdate" @end="onEnd" @choose="onChoose" @unchoose="onUnchoose" @sort="onSort" @clone="onClone">
      <h1 class="positionCenter">{{ this.quadrant.Id.toUpperCase() }} </h1>
    </draggable>
  </div>
  </div>
</template>

<script>
import '../assets/common.scss'
import { VueDraggableNext } from 'vue-draggable-next'
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
    //this.clicked=true;
  },
  computed: {
    myList: {
      get() {
        console.log("Estoy llamando al get");
        return this.$store.state.quadrants[this.idQuadrant];
      },
      set(value) {
        console.log("Estoy llamando al set");
        this.$store.dispatch('updateQuadrants', value)
      }
    }
  },
  data(){
    return{
      validateShort:false,
      validateLong:false,
      shortIsEmpty:true,
      longIsEmpty:true,
      inputCenter:"",
      input:"",
      correct:false,
      idCompleted:false,
      clicked:false,
      correctClick:false,
    }
  },
  methods: {
    idCorrect: function(){
      this.$emit('writeId');
      console.log("id que tengo = "+this.input.toUpperCase()+" \n id real = "+this.quadrant.Id.toUpperCase()+" \n id showeable? "+this.quadrant.showId);
      if(this.quadrant.Id.toUpperCase()===this.input.toUpperCase() && this.quadrant.showId) {
        // eslint-disable-next-line no-unreachable
        this.validateShort=true;
        this.idCompleted = true;
        this.$emit('idCorrect')
      }
    },
    idEmpty: function(){
      if(this.input.length==1){
        this.saveLetter((this.exerciseNumber+"."+1),' start writing',"0");
      }
      if(this.input.length>=1) {
        // eslint-disable-next-line no-unreachable
        this.shortIsEmpty=false;
      }
    },
    //Chequeo que la palabra escrita por el usuario sea igual a la que pide el ejercicio
    wordCorrect: function(){
      this.$emit('writeWord');
      if(this.$store.state.typeOfExercise=="words"&&this.quadrant.word.toUpperCase()===this.inputCenter.toUpperCase()&&this.quadrant.showWord) {
        // eslint-disable-next-line no-unreachable
        console.log("La palabra es correcta");
        this.validateLong=true;
        this.correct = true;
        this.$emit('wordCorrect');
      }
      else{
        if(this.$store.state.typeOfExercise=="category"&&this.quadrant.category.toUpperCase()===this.inputCenter.toUpperCase()&&this.quadrant.showWord) {
          // eslint-disable-next-line no-unreachable
          this.validateLong=true;
          this.correct = true;
          this.$emit('wordCorrect');
        }
      }
    },
    wordIncorrect(){this.$emit('wordIncorrect');},
    //No se bien que hace, no deja gris el campo donde escribe el usuario
    wordEmpty: function(){
      if(this.inputCenter.length==1){
        this.saveLetter((this.exerciseNumber),'start writing');
      }
      if(this.inputCenter.length>=1) {
        // eslint-disable-next-line no-unreachable
        this.longIsEmpty=false;
      }
    },
    //Chequeo que el ejercicio esté completado correctamente
    checkWord() {
        //Si la palabra no se verifico como como correcta anteriormente
        if(!this.correct){
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
    },
    //Chequeo que el ejercicio esté completado correctamente
    checkId() {
      if (!this.idCompleted){
        this.$emit('idIncorrect');
      }
    },
    checkCategory(){
      //Si la palabra no se verifico como correcta anteriormente
      console.log("palabra = "+this.inputCenter.toString());
      console.log("ES correcta? "+this.correct);
      console.log("This show word? "+this.showWord);
      if (!this.correct){
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
      this.inputCenter = "";
      this.input = "";
      this.longIsEmpty = true;
      this.validateLong = false;
      this.shortIsEmpty = true;
      this.validateShort = false;
      this.correct = false;
      this.idCompleted = false;
      this.correctClick = false;
    },
    //Observo la variable help que cuando sea verdadera dará una ayuda al usuario para el siguiente intento del ejercicio
    helpQuadrant() {
      if (this.quadrant.showWord) {
        console.log("llamo al help word");
        this.inputCenter = this.quadrant.word.charAt(0);
      }
    },
    clickedWord(){
      //this.clicked = true;
      console.log("entro al click bien");
      if (this.quadrant.category != this.$store.state.firstCategory && this.quadrant.category != this.$store.state.secondCategory){
        console.log("Correcto");
        this.correctClick = true;
        this.$emit('correctClick');
      }
      else{
        console.log("Incorrecto");
        this.correctClick = false;
        this.$emit('incorrectClick');
      }
    },
    onMove : function(){
      console.log("on move "+this.quadrant.Id);
    },
    onStart : function(){
      console.log("on start "+this.quadrant.Id);
    },
    onAdd : function(){
      console.log("on add "+this.quadrant.Id);
    },
    onRemove : function(){
      console.log("on remove "+this.quadrant.Id);
    },
    onUpdate : function(){
      console.log("on update "+this.quadrant.Id);
    },
    onEnd : function(){
      console.log("on end "+this.quadrant.Id);
      this.$store.commit('updateQuadrants');
      this.$store.commit('checkExercise');
    },
    onChoose : function(){
      console.log("on choose "+this.quadrant.Id);
      this.$store.commit('setInitialQuadrant',this);
    },
    onUnchoose : function(){
      console.log("onunchoose "+this.quadrant.Id);
    },
    onSort : function(){
      console.log("on sort "+this.quadrant.Id);
    },
    onClone : function (){
      console.log("on clone "+this.quadrant.Id);
    },
    onDrop : function(){
      console.log("on drop "+this.quadrant.Id);
      this.$store.commit('setFinalQuadrant',this);
    }
    // salvar diferentes tipos de datos
    saveLetter: function (exercisenumberT, actionT ,intentT ) {
      this.$store.commit('writeTimes', {exercisenumber:exercisenumberT, action:actionT,intent:intentT});
    },
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
  height: 100vh;
  position: absolute;
  display: grid;
  grid-template-columns : repeat(5,1fr);
  grid-template-rows: repeat(5,1fr);
}
.positionUp{
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: 1;
}

.positionCenter {
  grid-column-start: 2;
  grid-row-start: 2;
}
h1{
  font-size: 4rem;
  color:greenyellow;
}
.incorrect{
  color:darkred;
}
input {
  height: 8rem;
  width:25rem;
	font-size:4rem;
	color:#aaa;
	border:4px solid #aaa;
	border-radius: 20px;
	outline:none;
	padding: 2%;
}
input.id{
width: 10rem;
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

.btn-global-8{
  width: 20rem;
  height: 4rem;
  font-size: 3rem;
  color: white;
  padding: 2.5rem 1rem;
  text-transform: none;
  border-radius: 12px;
}

.btn-global-8:hover {
  color:#2C3E50;
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

@media screen and (min-width:960px )  and (max-width: 1328px) {
  input {
    height: 6rem;
    width:16rem;
    font-size:3rem;
  }
  h1{
    font-size: 4rem;
  }
  .btn-global-8{
    width: 18rem;
    height: 4rem;
    font-size: 3rem;
  }
}
@media screen and (min-width:740px )  and (max-width: 960px) {
  input {
    height: 5rem;
    width:14rem;
    font-size:2rem;
  }
  input.id{
    width: 6rem;
    heigth:5rem;
  }
  h1{
    font-size: 2.5rem;
  }
  .btn-global-8{
    width: 10rem;
    height: 2.5rem;
    font-size: 1.65rem;
  }

}
@media screen  and (max-width: 740px) {
  input {
    height: 4rem;
    width:10rem;
    font-size:2rem;
  }
  h1{
    font-size: 2rem;
  }
  .btn-global-8{
    width: 8rem;
    height: 2rem;
    font-size: 1.35rem;
  }
  input.id{
    width: 6rem;
    heigth:5rem;
  }
}
@media screen and (max-width:540px )  {
  input {
    height: 3rem;
    width:8rem;
    font-size:1.5rem;
  }
  h1{
    font-size: 1.5rem;
  }
}
</style>
