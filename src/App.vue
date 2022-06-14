<template>
	<v-app fluid style="height: 100vh;">
    <div v-show="$store.state.generalState == 0">
      <Beginner @finishBegin="$store.dispatch('changeGeneralState',1)"  ></Beginner>
    </div>
    <div v-show="$store.state.generalState == 1 || $store.state.generalState == 2 || $store.state.generalState == 3 ||$store.state.generalState == 4">
      <Game1 @finishExcersize="finalize" @saveValue="writeState" :category="this.$store.state.category" :exercise-number="this.$store.state.generalState"> </Game1>
    </div>
    <div v-show="$store.state.generalState==3" >
      <Game2 @finishExcersize="finalize" @saveValue="writeState"  :category="'animales'" :exercise-number="3"></Game2>
    </div>
    <div v-show="$store.state.generalState==4" >
      <Game2 @finishExcersize="finalize" @saveValue="writeState"  :category="'nombres masculinos'" :exercise-number="4"></Game2>
    </div>
    <div v-show="$store.state.generalState==5" >
      <h1> 5</h1>
    </div>
    <div v-show="$store.state.generalState==6" >
      <Beginner></Beginner>
    </div>
	</v-app>
</template>
<script>

import Game1 from "@/Games/Game1";
//import Game2 from "@/Games/Game2";
//import Game3 from "@/Games/Game3";
import Beginner from "@/components/Beginner";


export default {
	components: {
    Beginner,
    Game1,
    //Game2,
    //Game3,
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
      //quadrantIds: this.generateRandomIds(4),
      idsOrder: this.generateQuadrantsPosition(4),
      idsValue: this.generateRandomIds(4,'Facil'),
    }
  },
    created(){
    //this.idsOrder = this.generateQuadrantsPosition(4);
    //this.generateRandomIds(this.quadrantIds,4);
    this.generateQuadrants();
  },

  methods: {
      finalize:function(value,nextState){
        //this.writeState(exerciseNumber,value);
        this.$store.commit('writeTimes',this.exerciseNumber+this.subExerciseNumber+1,value);
        //console.log(exerciseNumber+" "+value+" "+nextState);
        this.$store.commit('changeGeneralState', nextState);
      },
     nextState:function (nextState){
       if (this.generalState===0){
         this.start =new Date();
         //console.log(this.start);
         this.data.push(this.start+", ,inicial");
         //console.log(this.data);
       }
       this.generalState=nextState;
     },
    // string con el numero de ejercicio y boolean si acerto o no

    generateRandomIds :function (size, difficulty) {
      let idsArray = new Array(size);
      let i = 0;
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      //const numbers = '0123456789';
      while (i < size)
      {
        switch(difficulty){
          case 'Facil': { let letter = letters.charAt(Math.floor(Math.random() * letters.length));
                          if (idsArray.indexOf(letter) == -1) {
                            idsArray[i] = letter;
                            i++;
                          }
                          break;}
          case 'Medio': break;
          case 'Dificil' : break;
        }
      }
      return idsArray;

      /*const charactersD ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      //const easyCharacters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result1= ' ';
      //difficulty = 'Perro';
      const charactersLength = charactersD.length;
      for ( let i = 0; i < size; i++ ) {
        result1 += charactersD.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result1;*/
    },
    generateQuadrantsPosition : function(size)
    {
      let idsArray = new Array(size);
      let i = 0;
      while (i<size){
        //Genera numero aleatorio
        let r = Math.floor(Math.random() * 4);
        //Si el numero no existe en el arreglo, lo pushea
        if(idsArray.indexOf(r) === -1)
        {
          idsArray[i] = r;
          i++;
        }
      }
      return idsArray;
    },

    rearrrengeQuadrants : function ()
    {
      let idsArray = this.generateQuadrantsPosition(4);
      let quadrantsDuplicate = this.copyQuadrant(this.quadrants,'equal','equal');
      for (let i = 0; i < idsArray.length; i++)
      {
        quadrantsDuplicate[idsArray[i]] = this.quadrants[i];
      }
      return quadrantsDuplicate;
    },

    copyQuadrant : function (quadrantToCopy,showIds,showWords) {
    var itemsCopy = new Array(quadrantToCopy.length);
    for (var i=0; i<quadrantToCopy.length; i++) {
      let ids = "";
      let words = "";

      switch (showIds){
        case 'show' :  ids = true; break;
        case 'hide' : ids = false; break;
        case 'first' : if (quadrantToCopy[i].position == 'first') ids = true; else ids = false; break;
        case 'second' : if (quadrantToCopy[i].position == 'second') ids = true; else ids = false; break;
        case 'equal' : ids = quadrantToCopy[i].showId; break;
      }

      switch (showWords){
        case 'show' :  words = true; break;
        case 'hide' : words = false; break;
        case 'first' : if (quadrantToCopy[i].position == 'first') words = true; else words = false; break;
        case 'second' : if (quadrantToCopy[i].position == 'second') words = true; else words = false; break;
        case 'equal' : ids = quadrantToCopy[i].showWord; break;
      }
      itemsCopy[i] = {  "Id" : quadrantToCopy[i].Id,
                        "word": quadrantToCopy[i].word,
                        "category": quadrantToCopy[i].category,
                        "showId" : ids,
                        "showWord" : words,
                        //"showCategory" : arrayToCopy[i].showCategory
      };
    }
    return itemsCopy
  },

    generateQuadrants: function () {
      {  //generar cuadrantes originales
        console.log("seteo las categorias");
        this.$store.state.firstCategory = "nombresMasculino";
        this.$store.state.secondCategory = "animales";
        this.$store.commit("setCategory","nombresMasculino");
        let firstName = this.masculinoMedio[Math.floor(Math.random(0) * (9))].valor;
        let secondName = this.animalesMedio[Math.floor(Math.random(0) * (9))].valor;

        this.quadrants[this.idsOrder[0]] = {  "Id" : this.idsValue[0],
                                              "word": firstName,
                                              "category": this.$store.state.firstCategory,
                                              "showId" : true,
                                              "showWord" : true,
                                              "position" : "first",
        };
        this.quadrants[this.idsOrder[1]] = {  "Id" : this.idsValue[1],
                                              "word": firstName,
                                              "category": this.$store.state.firstCategory,
                                              "showId" : true,
                                              "showWord" : true,
                                              "position" : "first",
        };
        this.quadrants[this.idsOrder[2]] = {  "Id" : this.idsValue[2],
                                              "word": secondName,
                                              "category": this.$store.state.secondCategory,
                                              "showId" : true,
                                              "showWord" : false,
                                              "position" : "second",
        };
        this.quadrants[this.idsOrder[3]] = {  "Id" : this.idsValue[3],
                                              "word": secondName,
                                              "category": this.$store.state.secondCategory,
                                              "showId" : true,
                                              "showWord" : false,
                                              "position" : "second",
        };

        //Añadir copia de cuadrantes originales (disposicion numero 0)
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrants,"show","first"));
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrants,"show","second"));
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrants,"first","hide"));
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrants,"second","hide"));
        //Reordenar cuadrantes originales (disposicion numero 1)
        this.quadrantsArrangement.push(this.rearrrengeQuadrants());
        //Reordenar cuadrantes originales (disposicion numero 2)
        this.quadrantsArrangement.push(this.rearrrengeQuadrants());

        this.$store.commit('setQuadrantsArrangement',this.quadrantsArrangement);

      }
    },
  },

}
</script>

<style scoped lang="scss">

@import 'assets/common.scss';

</style>
