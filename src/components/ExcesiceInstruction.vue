<template>
  <div class="firstStep-bground game-container">
    <div style="display: flex; align-items: center; justify-content: center; ">
        <v-img  class="image"
               width="20%"
               height="30%"
            src="../assets/cup.png"
        >
        </v-img>
    <h1> {{this.exerciseNumber }}</h1>
    </div>
  <p> {{this.introduction}}</p>
  <p>{{this.outcome }}</p>
  <p>{{this.end }}</p>
  <v-btn  outline @click="finishExersiceInstruccion" rounded class="btn-finish" color="#E74C3C" >
    Entendido
  </v-btn>
  </div>
</template>

<script>
import '../assets/common.scss'

export default {
  name: "ExcerciseInstruction",
  props: {
    exerciseNumber: {
      type: Number,
    },
    win:{
      type:Boolean,
      default:true,
    },
    subExerciseNumber : {
      default : .1,
      type : Number,
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

<style lang="scss"  scoped>
h1 {
  margin-left: 1rem;
  width:60%;
  font-family: "Roboto", sans-serif;
  font-size: 6REM ;
  color: #e74c3c;
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
.firstStep-bground {
  background: url("../assets/background.png") no-repeat
  center center;
  background-size: cover;
}
.game-container {
  height: 100vh;
  position: absolute;
}
.image {
  max-width: 8rem;
  width: 10% !important;
}

</style>
