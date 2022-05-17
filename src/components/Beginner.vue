<template>
    <div class="firstStep-bground game-container">
      <h1 class="game-title">Rehabilitación Cognitiva</h1>
      <div class="d-flex justify-center">
        <v-btn @click="finishBegin()" rounded class="begin-btn btn-centered" color="#E74C3C" >
          Comenzar
        </v-btn>
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
}
.game-title {
  display: flex;
  justify-content: center;
  font-size: 4rem;
  color: #e74c3c;
  padding-top: 3rem;
  margin-bottom: 7rem;
}
.begin-btn {
  font-size: 3rem;
  color: white;
  padding: 2rem;
  text-transform: none;
}

.btn-centered {
  top: 50%;
  position: absolute;
  height: 15%;
  width: 25%;
}
.game-footer {
  background-color: #e74c3c;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 15%;
}
</style>
