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
        help: false,
        check: false,
        quadrantsArrangement: [],
        quadrants: [],
        quadrant1: null,
        quadrant2: null,
        quadrant3: null,
        quadrant4: null,
        introduction: null,
        outcome: null,
        end: null,
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
            this.state.quadrant1.restoreQuadrant();
            this.state.quadrant2.restoreQuadrant();
            this.state.quadrant3.restoreQuadrant();
            this.state.quadrant4.restoreQuadrant();
        },
        changeCheck(state,check){
            this.state.check = check;
            this.state.quadrant1.checkWord();
            this.state.quadrant2.checkWord();
            this.state.quadrant3.checkWord();
            this.state.quadrant4.checkWord();
        },
        setQuadrantsArrangement(state, quadrantsArrangement){
          this.state.quadrantsArrangement = quadrantsArrangement;
          console.log(this.state.quadrantsArrangement);
          this.state.quadrants = this.state.quadrantsArrangement[parseInt(this.state.generalState,10)];
        },
        setQuadrants(state, generalState){
            this.state.quadrants = this.state.quadrantsArrangement[generalState-1];
            /*this.state.quadrant1 = this.state.quadrants[0];
            this.state.quadrant2 = this.state.quadrants[1];
            this.state.quadrant3 = this.state.quadrants[2];
            this.state.quadrant4 = this.state.quadrants[3];*/
        },
        setQuadrant(state, quadrant){
            if (this.state.quadrant1 == null){
                console.log("se vuelve quadrant 1");
                this.state.quadrant1 = quadrant;
            }
            else{
                if (this.state.quadrant2 == null){
                    console.log("se vuelve quadrant 2");
                    this.state.quadrant2 = quadrant;
                }
                else{
                    if (this.state.quadrant3 == null){
                        console.log("se vuelve quadrant 3");
                        this.state.quadrant3 = quadrant;
                    }
                    else{
                        console.log("se vuelve quadrant 4");
                        this.state.quadrant4 = quadrant;
                    }
                }
            }
        },
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
        },
        restore(context, words){
            console.log("Estoy en el dispatch restore");
            context.commit('restore',words);
        },
    }
})
