import Vuex from 'vuex'

export default new Vuex.Store({
    state:{
        firstLetter:true,
        firstLetterWord:false,
        generalState: 0,
        gameState: 0,
        quadrantState: 0,
        lastGameState: 0,
        exerciseExplanation: 0,
        times: [],
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
        responseExercise10: [],
        responseExercise11: [],
        responseExercise12: [],
        responseExercise13: [],
        initialDragObject: null,
        finalDragObject: null,
        mouseInitialPosition : {x:0,y:0},
        mouseFinalPosition : {x:0,y:0},
        dragging : false,
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
            console.log("cambio al quadrant state = "+nextQuadrantState);
            this.state.quadrantState = nextQuadrantState;
        },
        changeExerciseExplanation(state,nextExerciseExplanation){
            this.state.exerciseExplanation = nextExerciseExplanation;
        },
        writeTimes(state,data){
            let date = new Date();
            if (data.action===("start write")){
                if(this.firstLetter){
                    console.log("entro");
                    this.firsLetter=false;
                    this.state.times.push({exercise:this.generalstate,action:data.action,intent: data.intent,time:date});
               }
            }
            else {
                this.state.times.push({
                    exercise: data.exercisenumber,
                    action: data.action,
                    intent: data.intent,
                    time: date
                });
                console.log(this.state.times);
            }
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
                    console.log("Hago el check de ids");
                    this.state.quadrant1.checkId();
                    this.state.quadrant2.checkId();
                    this.state.quadrant3.checkId();
                    this.state.quadrant4.checkId();
                }
                else{
                    if (this.state.typeOfExercise == "category"){
                        console.log("Hago el check de category");
                        this.state.quadrant1.checkCategory();
                        this.state.quadrant2.checkCategory();
                        this.state.quadrant3.checkCategory();
                        this.state.quadrant4.checkCategory();
                    }
                    else{
                        if (this.state.typeOfExercise == "drag"){
                            console.log("Hago el check de drag");
                            this.state.quadrant1.checkDrag();
                            this.state.quadrant2.checkDrag();
                            this.state.quadrant3.checkDrag();
                            this.state.quadrant4.checkDrag();
                        }
                    }
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
        },
        setReponseExercise10(state,response){
            console.log("Reponse exercise 10 = "+response);
            this.state.responseExercise10 = response;
        },
        setReponseExercise11(state,response){
            console.log("Reponse exercise 11 = "+response);
            this.state.responseExercise11 = response;
        },
        setReponseExercise12(state,response){
            console.log("Reponse exercise 12 = "+response);
            this.state.responseExercise12 = response;
        },
        setReponseExercise13(state,response){
            console.log("Reponse exercise 13 = "+response);
            this.state.responseExercise13 = response;
        },
        setInitialQuadrant(state,initialQuadrant){
            this.state.initialDragObject = initialQuadrant;
        },
        setFinalQuadrant(state,finalQuadrant){
            this.state.finalDragObject = finalQuadrant;
        },
        updateQuadrants(){
            if (this.state.finalDragObject != null){
                let initialQuadrant = this.state.initialDragObject.quadrant.Id;
                this.state.initialDragObject.quadrant.Id = this.state.finalDragObject.quadrant.Id;
                this.state.finalDragObject.quadrant.Id = initialQuadrant;
                this.state.initialDragObject = null;
                this.state.finalDragObject = null;
            }
            else{
                this.state.initialDragObject = null;
            }
        },
        setMouseInitialPosition(state,positions){
          this.state.mouseInitialPosition.x = positions.x;
          this.state.mouseInitialPosition.y = positions.y;
        },
        setMouseFinalPosition(state,positions){
            this.state.mouseFinalPosition.x = positions.x;
            this.state.mouseFinalPosition.y = positions.y;
        },
        changeDragging(){
            this.state.dragging = !this.state.dragging;
        },
        moveQuadrant(){
            //console.log("initial drag object = "+this.state.initialDragObject.idQuadrant);
            //this.state.initialDragObject.style.left = positions.x - this.state.initialDragObject.offsetWidth / 2 + 'px';
            //this.state.initialDragObject.style.top = positions.y - this.state.initialDragObject.offsetHeight / 2 + 'px';
            //console.log(this.state.initialDragObject.input);
            //console.log("Deberia mover a "+ positions.x - this.state.initialDragObject.offsetWidth / 2 + 'px');
           // console.log("Deberia mover a "+ positions.y //- this.state.initialDragObject.offsetHeight / 2 + 'px');
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
            if (nextGeneralState == 1 || nextGeneralState == 2){
                context.commit('writeTimes', {exercisenumber:parseFloat(nextGeneralState+".1",10), action:"start reading",intent:1});
            }
            else{
                context.commit('writeTimes', {exercisenumber:parseInt(nextGeneralState,10), action:"start reading",intent:1});
            }
        },
        restore(context, words){
            console.log("Estoy en el dispatch restore");
            context.commit('restore',words);
        },
        updateQuadrants(context,value){
          console.log("VEngo a hacer el update de quadrants"+context+" "+value);
        },
    }
})
