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
  height: 100vh;
  position: relative;
  margin: 0px auto;
  display: grid;
  grid-template-columns : repeat(3,1fr);
  grid-template-rows: repeat(5,1fr);
}
h1.game-title {
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
  margin-top:-8rem;
  grid-row: 3/4;
  grid-column: 2;
}
.game-footer {
  background-color: #e74c3c;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 14%;
}
.btn-global {
  width: 30rem;
  height: 12rem;
  font-size: 5rem;
  color: white;
  padding: 2.5rem 1rem;
  text-transform: none;
  border-radius: 12px;
  margin-left: 4.5%;
}
.btn-global:hover{
  color: #2C3E50;
}

@media screen and (min-width:960px )  and (max-width: 1328px) {
  .btn-global-position {
    margin-top:-8rem;
    grid-row: 3/4;
    grid-column: 2;
  }
}

@media screen and (min-height:960px )  and (max-height: 1328px) {
  .btn-global-position {
    margin-top:-8rem;
    grid-row: 3/4;
    grid-column: 2;
  }
}
@media screen and (min-width:740px )  and (max-width: 960px) {

  .btn-global-position {
    margin-top:-8rem;
    grid-row: 3/4;
    grid-column: 2;
  }
  h1.game-title {
    font-size: 5rem;
  }

}
@media screen and (max-width: 740px) {
  .btn-global{
    width: 25rem;
    height: 10rem;
    font-size: 4rem;
  }
  h1.game-title {
    font-size: 4rem;
  }
}



</style>
