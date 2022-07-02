<template>
  <div class=" game-container">
    <div  class="title">
        <v-img v-show="this.win" class="image"
            src="../assets/cup.png"
        >
        </v-img>
    <h1> {{"Ejercicio "+Math.floor($store.state.currentExercise) }}</h1>
    </div>
  <p class="introduction"> {{this.introduction}}</p>
  <p class="outcome">{{this.outcome}}</p>
  <p class="end">{{this.end}}</p>
    <v-btn  outline @click="finishExersiceInstruccion" rounded class="btn-global nextposition" color="#E74C3C" >
    Entendido
  </v-btn>
  </div>
</template>

<script>
import '../assets/common.scss'

export default {
  name: "ExcerciseInstruction",
  props: {
    win:{
      type:Boolean,
      default:false,
    },
    introduction: String,
    outcome: String,
    end: String,
  },

  methods: {
    finishExersiceInstruccion: function(){
      this.$emit('finishExplanation');
    }
  },
}

</script>

<style lang="scss" scoped>
h1 {
  font-family: "Roboto", sans-serif;
  font-size: 6REM ;
  color: #e74c3c;
}
p {
  padding-top: 4rem;
  margin-left:6rem;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 3.5Rem ;
  color: #e74c3c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background {
  background: url("../assets/copia2.png") no-repeat
  center center;
  background-size: cover;
}
.game-container {
  height: 100vh;
  display: grid;
  grid-template-columns : repeat(7,14.5%);
  grid-template-rows: repeat(5,20%);
}

.title{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row-start:1;
  grid-row-end: 1;
  grid-column-start:2 ;
  grid-column-end:6;
}
p.introduction {
  grid-row-start:2;
  grid-row-end: 3;
  grid-column-start:1 ;
  grid-column-end:7;
}
p.outcome {
  justify-content: flex-start;
  grid-row-start:3;
  grid-row-end: 4;
  grid-column-start:1 ;
  grid-column-end:7;
}
p.end {
  margin-top: 5rem;
  grid-row-start:4;
  grid-row-end: 5;
  grid-column-start:1 ;
  grid-column-end:7;
}

.image{
  height: 8rem;
}
@media screen and (max-height: 910px){
  h1{
    font-size: 4rem;
  }
  p {
    font-size: 2.5rem ;
  }
}
@media screen and (min-width:960px ) and (max-width: 1363px){
  h1{
    font-size: 4rem;
  }
  p {
    font-size: 2.5rem ;
  }
}
@media screen and (max-width: 960px) {
  h1{
    font-size: 3rem;
  }
  p {
    font-size: 2rem ;
  }

}
@media screen and (max-width: 700px) {
 p {
   margin-left: 2rem;
 }
  p.outcome {
    padding-top: 6rem;
  }
  p.end {
    padding-top: 6rem;
  }
}


</style>
