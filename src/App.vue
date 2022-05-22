<template>
	<v-app fluid style="height: 100vh;">
    <div v-show="generalState==0">
        <Beginner @finishBegin="nextState"> </Beginner>
    </div>
    <div v-show="generalState==1"  >
      <Game1 @finishExcersize="finalize" :quadrants="this.quadrants" :exercise-number="1"> </Game1>
    </div>
    <div v-show="generalState==2" >
      <h1> 2</h1>
    </div>
    <div v-show="generalState==3" >
      <h1> 3</h1>
    </div>
    <div v-show="generalState==4" >
      <h1> 4</h1>
    </div>
    <div v-show="generalState==5" >
      <h1> 5</h1>
    </div>
    <div v-show="generalState==6" >
      <h1> 6</h1>
    </div>
	</v-app>
</template>
<script>

import Game1 from "@/Games/Game1";
import Beginner from "@/components/Beginner";


export default {
	components: {
    Beginner,
    Game1,
	},
  data() {
    return {
      date:"",
      data:[],
       start:"",
      categorias: [{"id": 0, "valor": "colores", "posibles": ["COLOR", "COLORES"]},
        {"id": 1, "valor": "frutas", "posibles": ["FRUTA", "FRUTAS"]},
        {"id": 2, "valor": "femenino", "posibles": ["FEMENINO", "MUJER", "NOMBRES FEMENINOS"]},
        {"id": 3, "valor": "masculino", "posibles": ["MASCULINO", "VARON", "NOMBRES MASCULINOS"]},
        {"id": 4, "valor": "animales", "posibles": ["ANIMAL", "ANIMALES"]},
        {"id": 5, "valor": "vestimenta", "posibles": ["VESTIMENTA", "INDUMENTARIA", "ROPA"]},
        {"id": 6, "valor": "transportes", "posibles": ["TRANSPORTE", "VEHÍCULOS", "VEHICULOS"]},
        {"id": 7, "valor": "paises", "posibles": ["PAÍS", "PAISES"]},
        {"id": 8, "valor": "verduras", "posibles": ["VERDURA", "VERDURAS"]}],
      animalesMedio: [{"id": 0, "valor": "BALLENA"},
        {"id": 1, "valor": "CABALLO"},
        {"id": 2, "valor": "CAMELLO"},
        {"id": 3, "valor": "CANARIO"},
        {"id": 4, "valor": "CARACOL"},
        {"id": 5, "valor": "COLIBRÍ"},
        {"id": 6, "valor": "ELEFANTE"},
        {"id": 7, "valor": "GALLINA"},
        {"id": 8, "valor": "JABALÍ"},
        {"id": 9, "valor": "JIRABA"}],
      masculinoMedio: [{"id": 0, "valor": "BENJAMÍN"},
        {"id": 1, "valor": "VICENTE"},
        {"id": 2, "valor": "ALBERTO"},
        {"id": 3, "valor": "ALEJANDRO"},
        {"id": 4, "valor": "ALVARO"},
        {"id": 5, "valor": "AGUSTÍN"},
        {"id": 6, "valor": "CAMILO"},
        {"id": 7, "valor": "EDUARDO"},
        {"id": 8, "valor": "ELISEO"},
        {"id": 9, "valor": "EVARISTO"},],
      generalState: 0,
      quadrants: [],
    }
  },
    created(){
    this.generateQuadrants();
  },

  methods: {
      finalize:function(exerciseNumber,value){
        this.writeState(exerciseNumber,value);
        this.nextState();
      },
     nextState:function (){
       if (this.generalState===0){
         this.start =new Date();
         console.log(this.start);
         this.data.push(this.start+", ,inicial");
         console.log(this.data);
       }
       this.generalState=this.generalState+1;
     },
    // string con el numero de ejercicio y boolean si acerto o no
    writeState:function(exerciseNumber,value){
      this.date=new Date();
      console.log(this.date);
       this.data.push(this.date+","+value+","+exerciseNumber);
       console.log(this.data);
    },
    generateRandomString :function (num) {
      const charactersD ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      //const easyCharacters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result1= ' ';
      const charactersLength = charactersD.length;
      for ( let i = 0; i < num; i++ ) {
        result1 += charactersD.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result1;
    },

    generateQuadrants: function () {
      {  //generar cuadrantes
        this.quadrants[0] = {"Id": "a",
          "word": this.animalesMedio[Math.floor(Math.random(0) * (9))],
          "category": "animales"};
        this.quadrants[1] = {
          "Id": "b",
          "word": this.animalesMedio[Math.floor(Math.random(0) * (9))],
          "category": "animales"};
        this.quadrants[2] = {
          "Id": "c",
          "word":"",
          "category": ""
        };
        this.quadrants[3] = {
          "Id": "d",
          "word": "",
          "category": ""
        };
      }
    },
  },

}
</script>

<style scoped>

</style>
