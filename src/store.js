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
        restore: false,
    },
    mutations:{
        changeGeneralState(state,nextGeneralState){
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
        changeHelp(state, help){
            this.state.help = help;
        },
        changeRestore(state, restore){
            console.log("restore = "+restore );
            this.state.restore = restore;
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
    }
})
