<template>
    <div class="firstStep-bground game-container">
      <h1 class="game-title">Rehabilitación Cognitiva</h1>
      <v-btn @click="finishBegin()" rounded class="begin-btn btn-centered" color="#E74C3C" >
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
export default {
  name: "MyStart",
  methods: {
    finishBegin: function(){
      this.$emit('finishBegin')
      }
    },
}

</script>

<style scoped>
.firstStep-bground {
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
  font-size: 4rem;
  color: #e74c3c;
  padding-top: 3rem;
  margin-bottom: 8rem;
  grid-column-start: 1;
  grid-column-end: 4 ;
}
.begin-btn {
  margin: 0 auto;
  font-size: 3rem;
  color: white;
  padding: 3rem;
  text-transform: none;
  border-radius: 12px;
}
.begin-btn:hover{
  color: #2C3E50;
}

.btn-centered {
  grid-row: 2/3;
  grid-column: 2/3;
}
.game-footer {
  background-color: #e74c3c;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 15%;
}

@media screen and (max-width: 960px) and (min-width:480px ) {
  .begin-btn {
    margin: 4px auto;
    font-size: 2rem;
    padding: 2rem;
    text-transform: none;
    border-radius: 12px;
  }
}
@media screen and (max-width: 480px) {
  .begin-btn {
    margin: 4px auto;
    font-size: 1.5rem;
    padding: 1.5rem;
    text-transform: none;
    border-radius: 12px;
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
}

</style>
