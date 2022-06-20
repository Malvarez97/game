<template>
    <div class="background game-container">
      <h1 class="game-title">Rehabilitación Cognitiva</h1>
      <v-btn @click="finishBegin()" rounded class="btn-global btn-global-position" color="#E74C3C" >
        Comenzar
      </v-btn>
      <div>
      </div>
      <v-footer absolute class="font-weight-medium game-footer">
        <v-row>
          <v-col cols="12">
            <v-img
                width="20%"
                height="30%"
                style="top: 25px; left: 14px; width: 20%;"
                src="../assets/logoHospital.svg"
            ></v-img>
            <v-img
                class="float-right"
                style="top: -25px; left: -14px; width: 20%;"
                src="../assets/logoExactas.svg"
            ></v-img>
          </v-col>
        </v-row>
      </v-footer>
    </div>
</template>

<script>
import '../assets/common.scss'
export default {
  name: "MyStart",
  methods: {
    finishBegin: function(){
      this.$store.commit('writeTimes', {exercisenumber:1, action:"start reading",intent:1});
      this.$emit('finishBegin')
      }
    },
}

</script>

<style lang="scss" scoped>
.background {
  background: url("../assets/background.png") no-repeat
  center center;
  background-size: cover;
}
.game-container {
  height: 90vh;
  position: relative;
  margin: 0px auto;
  display: grid;
  grid-template-columns : repeat(3,1fr);
  grid-template-rows: repeat(5,1fr);
}
.game-title {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 6rem;
  color: #e74c3c;
  padding-top: 3rem;
  margin-bottom: 10rem;
  grid-column-start: 1;
  grid-column-end: 4 ;
}
.btn-global-position {
  grid-row: 3/4;
  grid-column: 2;
}
.game-footer {
  background-color: #e74c3c;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 15%;
}
.btn-global {
  width: 20rem;
  height: 4rem;
  font-size: 3rem;
  color: white;
  padding: 2.5rem 1rem;
  text-transform: none;
  border-radius: 12px;
}
.btn-global:hover{
  color: #2C3E50;
}
.nextposition{
  position: absolute;
  left:70%;
  top :3%;
}
@media screen and (min-width:960px )  and (max-width: 1328px) {
  .btn-global{
    width: 18rem;
    height: 4rem;
    font-size: 3rem;
  }
}
@media screen and (min-width:740px )  and (max-width: 960px) {
  .btn-global{
    width: 10rem;
    height: 2.5rem;
    font-size: 1.65rem;
  }

}
@media screen and (max-width: 740px) {
  .btn-global{
    width: 8rem;
    height: 2rem;
    font-size: 1.35rem;
  }
}
  .game-title {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 3rem;
  color: #e74c3c;
  padding-top: 2rem;
  margin-bottom: 6rem;
  grid-column-start: 1;
  grid-column-end: -1 ;
  }


</style>
