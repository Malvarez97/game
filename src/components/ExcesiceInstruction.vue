<template>
 <h1> Ejercicio {{this.exerciseNumber }}</h1>
  <p> {{this.introduction}}</p>
  <p>{{this.outcome }}</p>
  <p>{{this.end }}</p>
  <v-btn  outline @click="finishExersiceInstruccion" rounded class="btn-finish" color="#E74C3C" >
    Entendido
  </v-btn>
</template>

<script>
import '../assets/common.scss'

export default {
  name: "ExcerciseInstruction",
  props: {
    exerciseNumber: {
      type: Number,
    },
    subExerciseNumber : {
      default : .1,
      type : Number,
    },
    introduction:String,
    outcome:String,
    end:String,
  },

  methods: {
    finishExersiceInstruccion: function(){
      this.$store.commit('changeGameState',(parseInt(this.$store.state.gameState,10)+1));
      console.log("cambio al game state = "+this.$store.state.gameState);
      this.$store.commit("changeQuadrantState",0);
      this.$store.commit('writeTimes',this.exerciseNumber+this.subExerciseNumber,'Time finish reading');
      this.$emit('finishExplanation');
    }
  },
}

</script>

<style lang="scss"  scoped>
h1 {
  display: flex;
  font-family: "Roboto", sans-serif;
  font-size: 6REM ;
  justify-content: center;
  color: #e74c3c;
  margin:auto;
}
p {
  padding: 2%;
  display: flex;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 4Rem ;
  justify-content: center;
  color: #e74c3c;
  margin:auto;
}

</style>
