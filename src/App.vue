<template>
	<v-app style="box-sizing: content-box" >
    <div v-show="$store.state.generalState == 0">
      <Beginner @finishBegin="$store.dispatch('changeGeneralState',1.1)"></Beginner>
    </div>
    <div v-show="$store.state.generalState == 1">
      <Game1 :id="0" > </Game1>
    </div>
    <div v-show="$store.state.generalState == 2">
      <Game1 :id="1" > </Game1>
    </div>
    <div v-show="$store.state.generalState==3">
      <Game1 :id="2" ></Game1>
    </div>
    <div v-show="$store.state.generalState==4">
      <Game1 :id="3" ></Game1>
    </div>
    <div v-show="$store.state.generalState==5" >
      <Game1 @restoreExercise="restoreExercise()" :id="4" ></Game1>
    </div>
    <div v-show="$store.state.generalState==6" >
      <Game1 :id="5" ></Game1>
    </div>
    <div v-show="$store.state.generalState==7" >
      <Game1 :id="6" ></Game1>
    </div>
    <div v-show="$store.state.generalState==8" >
      <Game1 :id="7" ></Game1>
    </div>
    <div v-show="$store.state.generalState==9" >
      <Game1 :id="8" ></Game1>
    </div>
    <div v-show="$store.state.generalState==10" >
      <Game1 :id="9" ></Game1>
    </div>
    <div v-show="$store.state.generalState==11" >
      <Game1 :id="10" ></Game1>
    </div>
    <div v-show="$store.state.generalState==12" >
      <Game1 :id="11" ></Game1>
    </div>
    <div v-show="$store.state.generalState==13" >
      <Game1 :id="12" ></Game1>
    </div>
    <div v-show="$store.state.generalState==14" >
      <Game1 :id="13" ></Game1>
    </div>
    <div v-show="$store.state.generalState==15" >
      <ExcerciseInstruction :win="true" ></ExcerciseInstruction>
    </div>
    <div v-show="$store.state.generalState==16" >
      <Chart ></Chart>
    </div>
	</v-app>
</template>
<script>

import Game1 from "@/Games/Game1";
import Beginner from "@/components/Beginner";
import Chart from "@/components/Chart";
import {enterFullscreen} from 'request-fullscreen-js';
import * as GameValues from './Games/gamevalues.js';
import * as GameMethods from './Games/gamemethods.js';
import ExcerciseInstruction from "@/components/ExcesiceInstruction";


export default {
	components: {
    ExcerciseInstruction,
    Beginner,
    Chart,
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
      /*explanationEx1sub2:
      explanationEx2sub1:
      explanationEx2sub2:
      explanationEx3:
      explanationEx4:
      explanationEx5:
      explanationEx6:
      explanationEx7:
      explanationEx8:
      explanationEx9:
      explanationEx10:
      explanationEx11:
      explanationEx12:
      explanationEx13:
      explanationEx14:*/
    }
  },
    created(){
    // Metodos listos para cambiar de color cuando el Profrsional lo desee
    //GameMethods.changeBackgroundColor("orange");
      //GameMethods.changeLetterColor("black");
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
        this.$store.state.firstCategory = "Masculino";
        this.$store.state.secondCategory = "Animales";
        this.$store.commit("setCategory","Masculino");
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
        this.$store.state.quadrant5 = this.copyQuadrant(this.rearrrengeQuadrants(),"show","show","");
        this.quadrantsArrangement.push(this.copyQuadrant(this.$store.state.quadrant5));
        //Reordenar cuadrantes originales (disposicion numero 1) Ejercicio 6
        this.quadrantsArrangement.push(this.copyQuadrant(this.rearrrengeQuadrants(),"show","show",""));
        //Reordenar cuadrantes originales (disposicion numero 2) Ejercicio 7
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

        this.generateExerciseExplanations();
      }
    },
    generateExerciseExplanations(){
      //Explicacion ejercicio 1.1
      this.$store.state.explanations[GameValues.explanationIdEx1sub1] = {
          introduction:"Se divide la pantalla en 4 cuadrantes.",
          outcome:"A continuacion trate de recordar la palabra perteneciente a la categoria " + this.$store.state.firstCategory + " y los cuadrantes (letra identificatoria) donde se halla.",
          end:"Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes."};
      //Explicacion ejercicio 1.2
      this.$store.state.explanations[GameValues.explanationIdEx1sub2] = {
          introduction: "Escriba las letras de los cuadrantes en los que aparecieron las palabras de "+this.$store.state.firstCategory+".",
          outcome: "",
          end: ""};
      //Explicacion ejercicio 2.1
      this.$store.state.explanations[GameValues.explanationIdEx2sub1] = {
        introduction:"Se divide la pantalla en 4 cuadrantes.",
        outcome:"A continuacion trate de recordar la palabra perteneciente a la categoria " + this.$store.state.secondCategory + " y los cuadrantes (letra identificatoria) donde se halla.",
        end:"Cuando las palabras desaparezcan de la pantalla, debe escribirlas en los cuadrantes correspondientes."};
      //Explicacion ejercicio 2.2
      this.$store.state.explanations[GameValues.explanationIdEx2sub2] = {
        introduction: "Escriba las letras de los cuadrantes en los que aparecieron las palabras de "+this.$store.state.secondCategory+".",
        outcome: "",
        end: ""};
      //Explicacion ejercicio 3
      this.$store.state.explanations[GameValues.explanationIdEx3] = {
        introduction:"Escriba las letras de los cuadrantes en los que aparecieron las palabras de "+this.$store.state.firstCategory+".",
        outcome:"",
        end:""};
      //Explicacion ejercicio 4
      this.$store.state.explanations[GameValues.explanationIdEx4] = {
        introduction: "Escriba las letras de los cuadrantes en los que aparecieron las palabras de "+this.$store.state.secondCategory+".",
        outcome: "",
        end: ""};
      //Explicacion ejercicio 5
      this.$store.state.explanations[GameValues.explanationIdEx5] = {
        introduction: "Modifique las letras en los cuadrantes acomodándolas como eran en los ejercicios anteriores.",
        outcome: "",
        end: ""};
      //Explicacion ejercicio 6
      this.$store.state.explanations[GameValues.explanationIdEx6] = {
        introduction: "Escriba en los cuadrantes las palabras pertenecientes a las categorias "+this.$store.state.firstCategory+" y "+this.$store.state.secondCategory+", anteriormente memorizadas.",
        outcome: "Tenga en cuenta que cambió la posición de las letras.",
        end: "Debe poner las palabras de acuerdo a las letras identificatorias, sin importar la posición de las mismas."};
      //Explicacion ejercicio 7
      this.$store.state.explanations[GameValues.explanationIdEx7] = {
        introduction: "Al igual que en el ejercicio anterior, escriba las palabras pertenecientes a las categorias "+this.$store.state.firstCategory+" y "+this.$store.state.secondCategory+" anteriormente memorizadas.",
        outcome: "",
        end: ""};
      //Explicacion ejercicio 8
      this.$store.state.explanations[GameValues.explanationIdEx8] = {
        introduction: "Haga click en aquellas palabras que no aparecieron previamente.",
        outcome: "",
        end: ""};
      //Explicacion ejercicio 9
      this.$store.state.explanations[GameValues.explanationIdEx9] = {
        introduction: "En los ejercicios anteriores se presentaron palabras pertenecientes a dos categorías.",
        outcome: "A continuación escriba la categoría que falta en los lugares donde se encontraba la palabra.",
        end: "Debe escribir el nombre de la categoria, NO de la palabra. Las categorías posibles son: "+this.$store.state.firstCategory+", "+this.$store.state.secondCategory+"."};
      //Explicacion ejercicio 10
      this.$store.state.explanations[GameValues.explanationIdEx10] = {
        introduction: "Trate de recordar lo escrito en cada cuadrante.",
        outcome: "Tenga en cuenta con que letra se identifica cada cuadrante.",
        end: "A continuación debe escribir el nombre faltante."};
      //Explicacion ejercicio 11
      this.$store.state.explanations[GameValues.explanationIdEx11] = {
        introduction: "Escriba el nombre que desaparece en la pantalla.",
        outcome: "",
        end: ""};
      //Explicacion ejercicio 12
      this.$store.state.explanations[GameValues.explanationIdEx12] = {
        introduction: "Escriba el nombre que desaparece en la pantalla.",
        outcome: "",
        end: ""};
      //Explicacion ejercicio 13
      this.$store.state.explanations[GameValues.explanationIdEx13] = {
        introduction: "Escriba los nombres del ejercicio anterior en cada cuadrante.",
        outcome: "",
        end: ""};
      //Explicacion ejercicio 14
      this.$store.state.explanations[GameValues.explanationIdEx14] = {
        introduction: "Complete las letras que identifican cada cuadrante como estaban en los últimos ejercicios.",
        outcome: "",
        end: ""};
    },
    restoreExercise(){
      setTimeout(()=>{
            this.quadrantsArrangement[4] = this.copyQuadrant(this.$store.state.quadrant5);
      },2000
      ,)
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
