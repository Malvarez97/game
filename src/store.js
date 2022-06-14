import Vuex from 'vuex'

export default new Vuex.Store({
    state:{
        generalState: 0,
        gameState: 0,
        quadrantState: 0,
        lastGameState: 0,
        exerciseExplanation: 0,
        times : [],
        correctResponse: false,
        quadrantsArrangement: [],
        quadrants: [],
        quadrant1: null,
        quadrant2: null,
        quadrant3: null,
        quadrant4: null,
        typeOfExercise: "",
        firstCategory: "",
        secondCategory: "",
        category: "",
        quadrantsMatrix: [],
    },
    mutations:{
        setIntroduction(state,introduction){
            this.state.introduction = introduction;
        },
        setOutcome(state,outcome){
            this.state.outcome = outcome;
        },
        setEnd(state,end){
            this.state.end = end;
        },
        changeGeneralState(state,nextGeneralState){
            console.log("cambio al general state = "+nextGeneralState);
            this.state.generalState = nextGeneralState;
            //this.state.quadrants = this.state.quadrantsArrangement[parseInt(this.state.generalState,10)-1];
        },
        changeGameState(state,nextGameState){
            this.state.lastGameState = this.state.gameState;
            this.state.gameState = nextGameState;
        },
        changeQuadrantState(state,nextQuadrantState){
            this.state.quadrantState = nextQuadrantState;
        },
        changeExerciseExplanation(state,nextExerciseExplanation){
            this.state.exerciseExplanation = nextExerciseExplanation;
        },
        writeTimes(state,exerciseNumber,value){
            let date = new Date();
            this.state.times.push(date+","+value+","+exerciseNumber);
            console.log(this.state.times);
        },
        changeExerciseNumber(state,nextExerciseNumber){
            this.state.exerciseNumber = nextExerciseNumber;
        },
        changeCorrectResponse(state,response){
            console.log(this.state);
            this.state.correctResponse = response;
        },
        //Estado del juego donde se espera unos segundos
        waitAndGoToInGameState(state,nextGameState){
                setTimeout ( ()=> {
                        this.state.gameState = nextGameState;
                    },2000
                    ,)
        },
        waitAndGoToLastGameState(state,nextGameState){
            this.state.gameState = nextGameState;
            setTimeout ( ()=> {
                this.state.gameState = this.state.lastGameState;
                },2000
                ,)
        },
        changeHelp(){
            console.log("se activo el help");
            this.state.quadrant1.helpQuadrant();
            this.state.quadrant2.helpQuadrant();
            this.state.quadrant3.helpQuadrant();
            this.state.quadrant4.helpQuadrant();
        },
        restore(){
            console.log("Hago el restore");
            //console.log(this.state.quadrant1);
            console.log(this.state);
            this.state.quadrant1.restoreQuadrant();
            this.state.quadrant2.restoreQuadrant();
            this.state.quadrant3.restoreQuadrant();
            this.state.quadrant4.restoreQuadrant();
        },
        checkExercise(){
            console.log("Type of exercise = "+this.state.typeOfExercise);
            if (this.state.typeOfExercise == "words"){
                console.log("Hago el check de words");
                this.state.quadrant1.checkWord();
                this.state.quadrant2.checkWord();
                this.state.quadrant3.checkWord();
                this.state.quadrant4.checkWord();
            }
            else{
                if (this.state.typeOfExercise == "ids"){
                    this.state.quadrant1.checkId();
                    this.state.quadrant2.checkId();
                    this.state.quadrant3.checkId();
                    this.state.quadrant4.checkId();
                }
            }
        },
        setQuadrantsArrangement(state, quadrantsArrangement){
          this.state.quadrantsArrangement = quadrantsArrangement;
          console.log("seteados los quadrants arrangement");
          console.log(this.state.quadrantsArrangement);
          this.state.quadrants = this.state.quadrantsArrangement[parseInt(this.state.generalState,10)];
        },
        setQuadrants(state, generalState){
            console.log("ENTRO A SET QUADRANTS-----------------")
            this.state.quadrants = this.state.quadrantsArrangement[generalState-1];
            this.state.quadrant1 = this.state.quadrantsMatrix[(generalState-1)*4];
            this.state.quadrant2 = this.state.quadrantsMatrix[(generalState-1)*4+1];
            this.state.quadrant3 = this.state.quadrantsMatrix[(generalState-1)*4+2];
            this.state.quadrant4 = this.state.quadrantsMatrix[(generalState-1)*4+3];
        },
        setQuadrant(state, quadrant){
            this.state.quadrantsMatrix[quadrant.idMyGame*4+quadrant.idQuadrant] = quadrant;
        },
        setTypeOfExercise(state,typeOfExercise){
            this.state.typeOfExercise = typeOfExercise;
        },
        setCategory(state,category){
            this.state.category = category;
        },
        changeCategory(state,nextGeneralState){
            console.log("Entro a changeCategory");
            if (nextGeneralState % 2 == 0){
                console.log("cambio a la segunda categoria");
                console.log("Segunda categoria = "+this.state.secondCategory);
                this.state.category = this.state.secondCategory;
            }
            else{
                console.log("cambio a la primera categoria");
                console.log("Primera categoria = "+this.state.firstCategory);
                this.state.category = this.state.firstCategory;
            }
        }
    },
    actions:{
        waitingStateToNextState(context,data){
            context.commit('changeGameState',data.waitingState);
            setTimeout ( ()=> {
                    context.commit('changeGameState',data.nextGameState);
                    console.log("El game state es "+this.state.gameState);
                },data.miliseconds
                ,)
        },
        changeGeneralState(context,nextGeneralState){
            context.commit('changeGeneralState',nextGeneralState);
            context.commit('setQuadrants',nextGeneralState);
            console.log("mis cuadrantes actuales son: ");
            console.log(context.state.quadrant1);
            console.log(context.state.quadrant2);
            console.log(context.state.quadrant3);
            console.log(context.state.quadrant4);
        },
        restore(context, words){
            console.log("Estoy en el dispatch restore");
            context.commit('restore',words);
        },
    }
})
