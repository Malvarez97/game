<template>
	<v-app fluid style="height: 100vh;">
    <div v-show="generalState==0">
        <Beginner @finishBegin="nextState"> </Beginner>
    </div>
    <div v-show="generalState==1"  >
      <Game1 @finishExcersize="finalize" @saveValue="writeState"  :quadrants="this.firstQuadrants" :category="'animales'" :exercise-number="1"> </Game1>
    </div>
    <div v-show="generalState==2" >
      <Game1 @finishExcersize="finalize" @saveValue="writeState"  :quadrants="this.secondQuadrants" :category="' nombres masculino'" :exercise-number="2"> </Game1>
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
      firstQuadrants: [],
      secondQuadrants: [],
      quadrants: [],
      quadrantsArrangement: [],
      quadrantIds: [4],
      idsOrder: [4],
      idsValue: [4],
    }
  },
    created(){
    this.generateRandomIds(this.idsOrder);
    this.generateQuadrantsIds();
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
       this.data.push(this.date+","+value+","+exerciseNumber);
       console.log(this.data);
    },
    generateRandomIds :function (num) {
      const charactersD ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      //const easyCharacters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result1= ' ';
      const charactersLength = charactersD.length;
      for ( let i = 0; i < num; i++ ) {
        result1 += charactersD.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result1;
    },

    generateQuadrantsIds : function (idsArray)
    {
      while(this.idsOrder.length < 4){
        //Genera numero aleatorio
        let r = Math.floor(Math.random() * 4);
        //Si el numero no existe en el arreglo, lo pushea
        if(idsArray.indexOf(r) === -1) idsArray.push(r);
      }
      console.log(idsArray);
    },

    rearrrengeQuadrants : function ()
    {
      let idsArray = new Array[4];
      this.generateRandomIds(idsArray);
      let quadrantsDuplicate = this.quadrants.clone();
      for (let i = 0; i < idsArray.length; i++)
      {
        quadrantsDuplicate[idsArray[i]] = this.quadrants[i];
      }
      return quadrantsDuplicate;
    },

    generateQuadrants: function () {
      {  //generar cuadrantes originales
        let firstCategory = "nombresMasculino";
        let secondCategory = "animales";

        this.quadrants[this.idsOrder[0]] = {  "Id" : this.idsValue[0],
                                              "word": this.masculinoMedio[Math.floor(Math.random(0) * (9))],
                                              "category": firstCategory
        };
        this.quadrants[this.idsOrder[1]] = {  "Id" : this.idsValue[1],
                                              "word": this.masculinoMedio[Math.floor(Math.random(0) * (9))],
                                              "category": firstCategory
        };
        this.quadrants[this.idsOrder[2]] = {  "Id" : this.idsValue[2],
                                              "word": this.animalesMedio[Math.floor(Math.random(0) * (9))],
                                              "category": secondCategory
        };
        this.quadrants[this.idsOrder[3]] = {  "Id" : this.idsValue[3],
                                              "word": this.animalesMedio[Math.floor(Math.random(0) * (9))],
                                              "category": secondCategory
        };

        //Añadir copia de cuadrantes originales (disposicion numero 0)
        this.quadrantsArrangement.push(this.quadrants.clone());
        console.log("Quadrantes numero 0");
        console.log(this.quadrantsArrangement[0]);
        //Reordenar cuadrantes originales (disposicion numero 1)
        this.quadrantsArrangement.push(this.rearrrengeQuadrants);
        console.log("Quadrantes numero 1");
        console.log(this.quadrantsArrangement[1]);
        //Reordenar cuadrantes originales (disposicion numero 2)
        this.quadrantsArrangement.push(this.rearrrengeQuadrants);
        console.log("Quadrantes numero 2");
        console.log(this.quadrantsArrangement[2]);










        this.firstQuadrants[0] = {"Id": "a",
          "word": this.animalesMedio[Math.floor(Math.random(0) * (9))],
          "category": "animales"};
        this.firstQuadrants[1] = {
          "Id": "b",
          "word": this.animalesMedio[Math.floor(Math.random(0) * (9))],
          "category": "animales"};
        this.firstQuadrants[2] = {
          "Id": "c",
          "word":"",
          "category": ""
        };
        this.firstQuadrants[3] = {
          "Id": "d",
          "word": "",
          "category": ""
        };
        this.secondQuadrants[0] = {"Id": "a",
          "word": this.masculinoMedio[Math.floor(Math.random(0) * (9))],
          "category": "animales"};
        this.secondQuadrants[1] = {
          "Id": "b",
          "word": "",
          "category": ""};
        this.secondQuadrants[2] = {
          "Id": "c",
          "word":this.masculinoMedio[Math.floor(Math.random(0) * (9))],
          "category": "Masculino"
        };
        this.secondQuadrants[3] = {
          "Id": "d",
          "word": this.masculinoMedio[Math.floor(Math.random(0) * (9))],
          "category": ""
        };
        console.log(this.firstQuadrants);
        console.log(this.secondQuadrants);
      }
    },
  },

}
</script>

<style scoped>

</style>
