<template>
	<v-app style="box-sizing: content-box" >
    <div v-show="$store.state.generalState == 0">
      <Beginner @finishBegin="$store.dispatch('changeGeneralState',11)"></Beginner>
    </div>
    <div v-show="$store.state.generalState == 1">
      <Game1  @saveValue="writeState" :id="0" :category="this.$store.state.firstCategory" :exerciseNumber="this.$store.state.generalState" > </Game1>
    </div>
    <div v-show="$store.state.generalState == 2">
      <Game1  @saveValue="writeState" :id="1" :category="this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"> </Game1>
    </div>
    <div v-show="$store.state.generalState==3">
      <Game2  @saveValue="writeState" :id="2" :category="this.$store.state.firstCategory" :exerciseNumber="this.$store.state.generalState"></Game2>
    </div>
    <div v-show="$store.state.generalState==4">
      <Game2  @saveValue="writeState" :id="3" :category="this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"></Game2>
    </div>
    <div v-show="$store.state.generalState==5" >
      <Game3  @saveValue="writeState" :id="4" :category="this.$store.state.category" :exerciseNumber="this.$store.state.generalState"></Game3>
    </div>
    <div v-show="$store.state.generalState==6" >
      <Game4  @saveValue="writeState" :id="5" :category="this.$store.state.firstCategory+' y '+this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"></Game4>
    </div>
    <div v-show="$store.state.generalState==7" >
      <Game4  @saveValue="writeState" :id="6" :category="this.$store.state.firstCategory+' y '+this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"></Game4>
    </div>
    <div v-show="$store.state.generalState==8" >
      <Game5  @saveValue="writeState" :id="7" :category="this.$store.state.firstCategory+' y '+this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"></Game5>
    </div>
    <div v-show="$store.state.generalState==9" >
      <Game6  @saveValue="writeState" :id="8" :category="this.$store.state.firstCategory+' y '+this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"></Game6>
    </div>
    <div v-show="$store.state.generalState==10" >
      <Game7  @saveValue="writeState" :id="9" :category="this.$store.state.firstCategory+' y '+this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"></Game7>
    </div>
    <div v-show="$store.state.generalState==11" >
      <Game7  @saveValue="writeState" :id="10" :category="this.$store.state.firstCategory+' y '+this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"></Game7>
    </div>
    <div v-show="$store.state.generalState==12" >
      <Game7  @saveValue="writeState" :id="11" :category="this.$store.state.firstCategory+' y '+this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"></Game7>
    </div>
    <div v-show="$store.state.generalState==13" >
      <Game8  @saveValue="writeState" :id="12" :category="this.$store.state.firstCategory+' y '+this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"></Game8>
    </div>
    <div v-show="$store.state.generalState==14" >
      <Game9  @saveValue="writeState" :id="13" :category="this.$store.state.firstCategory+' y '+this.$store.state.secondCategory" :exerciseNumber="this.$store.state.generalState"></Game9>
    </div>
    <div v-show="$store.state.generalState==15" >
      <Chart ></Chart>
    </div>
	</v-app>
</template>
<script>

import Game1 from "@/Games/Game1";
import Game2 from "@/Games/Game2";
import Game3 from "@/Games/Game3";
import Game4 from "@/Games/Game4";
import Game5 from "@/Games/Game5";
import Game6 from "@/Games/Game6";
import Game7 from "@/Games/Game7";
import Game8 from "@/Games/Game8";
import Game9 from "@/Games/Game9";
import Beginner from "@/components/Beginner";
import Chart from "@/components/Chart";
import {enterFullscreen} from 'request-fullscreen-js';
import * as GameValues from './Games/gamevalues.js';
import * as GameMethods from './Games/gamemethods.js';


export default {
	components: {
    Beginner,
    Chart,
    Game1,
    Game2,
    Game3,
    Game4,
    Game5,
    Game6,
    Game7,
    Game8,
    Game9,
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
        {"id": 9, "valor": "JIRAFA"}],
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
      coloresMedio: [{"id": 0, "valor": "ROJO"},
        {"id": 1, "valor": "VERDE"},
        {"id": 2, "valor": "AZUL"}, ],
      frutasMedio: [{"id": 0, "valor": "NARANJA"},
      {"id": 1, "valor": "MANZANA"},
      {"id": 2, "valor": "BANANA"}, ],
      generalState: 0,
      firstQuadrants: [],
      secondQuadrants: [],
      quadrants: [],
      quadrantsArrangement: [],
      randoms: [],
      //quadrantIds: this.generateRandomIds(4),
      idsOrder: this.generateQuadrantsPosition(4),
      idsValue: this.generateRandomIds(4,'Facil'),
      timeLimitToPause:3000000,
      gameValues:GameValues,
      gameMethods:GameMethods,
    }
  },
    created(){
    //this.idsOrder = this.generateQuadrantsPosition(4);
    //this.generateRandomIds(this.quadrantIds,4);
    this.generateQuadrants();
    var audioSuccess = new Audio(require('./assets/Audios/success.mp3'));
    var audioMistake = new Audio(require('./assets/Audios/error.mp3'));
    var audioError = new Audio(require('./assets/Audios/error.mp3'));
    var audioHint = new Audio(require('./assets/Audios/hint.mp3'));
    var audioVictory = new Audio(require('./assets/Audios/victory.mp3'));
    this.$store.commit('setAudioSuccess',audioSuccess);
    this.$store.commit('setAudioMistake',audioMistake);
    this.$store.commit('setAudioError',audioError);
    this.$store.commit('setAudioHint',audioHint);
    this.$store.commit('setAudioVictory',audioVictory);
    addEventListener("click", () => {
      enterFullscreen();
      if (this.$store.state.pause){
        if (this.$store.state.seconds != 0){
          console.log("entro aca");
          GameMethods.setPause(false);
        }
      }
    });
   /* addEventListener("mousedown", () => {
      if (this.$store.state.generalState == 5){
        let mousex = event.clientX; // Gets Mouse X
        let mousey = event.clientY; // Gets Mouse Y
        this.$store.commit('setMouseInitialPosition', {x:mousex,y:mousey});
        console.log("Initial position = "+[mousex, mousey]); // Prints data
      }
    });
    addEventListener("mousemove", () => {
      if (this.$store.state.generalState == 5){
        if (this.$store.state.initialDragObject != null){
          let mousex = event.clientX; // Gets Mouse X
          let mousey = event.clientY; // Gets Mouse Y
          this.$store.commit('moveQuadrant', {x:mousex,y:mousey});
          console.log("Final position = "+[mousex, mousey]); // Prints data
        }
      }
    });*/
  },
  computed:{
    seconds(){
      return this.$store.state.seconds;
    },
  },
  methods: {
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

    copyQuadrantWithNewWords : function(quadrantToCopy){
        //Nuevos valores
        var newValue1 = this.coloresMedio[Math.floor(Math.random(0) * (2))].valor;
        var newValue2 = this.frutasMedio[Math.floor(Math.random(0) * (2))].valor;
        //Variable que decide si se cambia la primer palabra de la primera categoria o la segunda
        var trueorfalse = Math.floor(Math.random(0) * (2));
        var value1change = trueorfalse == 0 ? false : true;
        //Variable que decide si se cambia la primer palabra de la segunda categoria o la segunda
        trueorfalse = Math.floor(Math.random(0) * (2));
        var value2change = trueorfalse == 0 ? false : true;
        //Cuadrante resultado
        var itemsCopy = new Array(quadrantToCopy.length);
        for (var i=0; i<quadrantToCopy.length; i++) {
          let ids = "";
          let words = "";
          if (quadrantToCopy[i].category == this.$store.state.firstCategory){
            if (value1change == true){
              itemsCopy[i] = {
                "Id": quadrantToCopy[i].Id,
                "word": newValue1,
                "category": "coloresMedio",
                "showId": ids,
                "showWord": words,
              };
              value1change = !value1change;
          }
          else{
              itemsCopy[i] = {
                "Id": quadrantToCopy[i].Id,
                "word": quadrantToCopy[i].word,
                "category": quadrantToCopy[i].category,
                "showId": ids,
                "showWord": words,
              };
              value1change = !value1change;
            }
          }
          else{
            if (value2change == true){
              itemsCopy[i] = {
                "Id": quadrantToCopy[i].Id,
                "word": newValue2,
                "category": "frutasMedio",
                "showId": ids,
                "showWord": words,
              };
              value2change = !value2change;
            }
            else{
              itemsCopy[i] = {
                "Id": quadrantToCopy[i].Id,
                "word": quadrantToCopy[i].word,
                "category": quadrantToCopy[i].category,
                "showId": ids,
                "showWord": words,
              };
              value2change = !value2change;
            }
          }
        }
        return itemsCopy;
    },

    copyQuadrant : function (quadrantToCopy,showIds,showWords,hidePosition) {
    var itemsCopy = new Array(quadrantToCopy.length);
    for (var i=0; i<quadrantToCopy.length; i++) {
      let ids = "";
      let words = "";

      switch (showIds){
        case 'show' :  ids = true; break;
        case 'hide' : ids = false; break;
        case 'first' : if (quadrantToCopy[i].position == 'first') ids = true; else ids = false; break;
        case 'second' : if (quadrantToCopy[i].position == 'second') ids = true; else ids = false; break;
        case 'three' : if (i == hidePosition) ids = true; else ids = false; break;
        case 'equal' : ids = quadrantToCopy[i].showId; break;
      }

      switch (showWords){
        case 'show' :  words = true; break;
        case 'hide' : words = false; break;
        case 'first' : if (quadrantToCopy[i].position == 'first') words = true; else words = false; break;
        case 'second' : if (quadrantToCopy[i].position == 'second') words = true; else words = false; break;
        case 'three' : if (i == hidePosition) words = true; else words = false; break;
        case 'equal' : ids = quadrantToCopy[i].showWord; break;
      }
      itemsCopy[i] = {  "Id" : quadrantToCopy[i].Id,
                        "word": quadrantToCopy[i].word,
                        "category": quadrantToCopy[i].category,
                        "showId" : ids,
                        "showWord" : words,
      };
    }
    return itemsCopy
  },

    generateQuadrants: function () {
      { console.log("nada");
        //generar cuadrantes originales
        console.log("seteo las categorias");
        this.$store.state.firstCategory = "nombresMasculino";
        this.$store.state.secondCategory = "animales";
        this.$store.commit("setCategory","nombresMasculino");
        let firstName = this.masculinoMedio[Math.floor(Math.random(0) * (9))].valor;
        let secondName = this.animalesMedio[Math.floor(Math.random(0) * (9))].valor;

        this.quadrants[this.idsOrder[0]] = {  "Id" : this.idsValue[0],
                                              "word": firstName,
                                              "category":this.$store.state.firstCategory,
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
        this.quadrants[this.idsOrder[3]] = {  "Id" : this.idsValue[3] ,
                                              "word": secondName,
                                              "category": this.$store.state.secondCategory,
                                              "showId" : true,
                                              "showWord" : false,
                                              "position" : "second",
        };

        //Añadir copia de cuadrantes originales (disposicion numero 0)
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrants,"show","first",""));
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrants,"show","second",""));
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrants,"first","hide",""));
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrants,"second","hide",""));
        //Reordenar cuadrantes originales para dragable
        this.quadrantsArrangement.push(this.copyQuadrant(this.rearrrengeQuadrants(),"show","show",""));
        //Reordenar cuadrantes originales (disposicion numero 1)
        this.quadrantsArrangement.push(this.copyQuadrant(this.rearrrengeQuadrants(),"show","show",""));
        //Reordenar cuadrantes originales (disposicion numero 2)
        this.quadrantsArrangement.push(this.copyQuadrant(this.rearrrengeQuadrants(),"show","show",""));
        //Crear cuadrantes con dos palabras nuevas para clickable
        this.quadrantsArrangement.push(this.copyQuadrant(this.copyQuadrantWithNewWords(this.quadrants),"hide","show",""));
        //Ejercicio nro 9, el de las categorias
        var trueorfalse = Math.floor(Math.random(0) * (2));
        var firstCategory = trueorfalse == 0 ? false : true;
        if (firstCategory){
          this.quadrantsArrangement.push(this.copyQuadrant(this.quadrants,"hide","first",""));
        }
        else{
          this.quadrantsArrangement.push(this.copyQuadrant(this.quadrants,"hide","second",""));
        }
        //Ejercicio nro 10, 11, 12, desaparecer palabra
        var random;
        while (this.randoms.length < 4) {
          random = Math.floor(Math.random(0) * (4));
          if (!this.randoms.includes(random)) {
            this.randoms.push(random);
          }
        }
        this.$store.commit('setReponseExercise10',{word: this.quadrantsArrangement[7][this.randoms[0]].word, id: this.quadrantsArrangement[7][this.randoms[0]].Id});
        this.$store.commit('setReponseExercise11',{word: this.quadrantsArrangement[7][this.randoms[1]].word, id: this.quadrantsArrangement[7][this.randoms[3]].Id});
        this.$store.commit('setReponseExercise12',{word: this.quadrantsArrangement[7][this.randoms[2]].word, id: this.quadrantsArrangement[7][this.randoms[2]].Id});
        this.$store.commit('setReponseExercise13',{word: this.quadrantsArrangement[7][this.randoms[3]].word, id: this.quadrantsArrangement[7][this.randoms[1]].Id});
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrantsArrangement[7],"show","three",this.randoms[0]));
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrantsArrangement[7],"show","three",this.randoms[1]));
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrantsArrangement[7],"show","three",this.randoms[2]));
        //Cuadrantes para ejercicio nro 13
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrantsArrangement[7],"show","show",""));
        this.quadrantsArrangement.push(this.copyQuadrant(this.quadrantsArrangement[7],"show","show",""));
        this.$store.commit('setQuadrantsArrangement',this.quadrantsArrangement);

      }
    },
  },
  watch:{
    seconds(){
      if (this.$store.state.seconds == this.timeLimitToPause){
        GameMethods.setPause(true);
      }
    },
  },

}
</script>

<style scoped lang="scss">

@import 'assets/common.scss';
.container{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
