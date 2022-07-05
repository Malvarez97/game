import Vuex from 'vuex'
import * as GameMethods from "./Games/gamemethods.js";
import * as GameValues from "./Games/gamevalues.js";

export default new Vuex.Store({
    state:{
        firstLetter:true,
        firstLetterWord:false,
        generalState: 0,
        gameState: GameValues.firstPartExplanation,
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
        dragEnd: false,
        buttonEnd: false,
        audioSuccess: null,
        audioMistake:null,
        audioError: null,
        audioHint: null,
        audioVictory:null,
        help:false,
        interval:null,
        intervalPaused:null,
        seconds:0,
        pause:false,
        secondsPaused:0,
        secondsTransition:0,
        exerciseData: [],
        warning:false,
        nextGeneralState:0,
        changeGeneralState:false,
        alertTitle:"",
        alertText:"",
        alert:false,
        typeOfAlert:"",
        quadrant5:null,
        exerciseTime:0,
        intent:0,
        currentExercise:1.1,
        explanations: [],
        resetIntent: false,
        clicked:false,
    },
    mutations:{
        setPause(state,pause){
            this.state.pause = pause;
            if (pause){
                state.intervalPaused = setInterval( () => {
                    state.secondsPaused+=1;
                    console.log("Seconds paused = "+state.secondsPaused);
                    if (state.seconds == 0){
                        state.seconds = 1;
                    }
                }, 1000)
            }
            if (!pause){
                clearInterval(state.intervalPaused);
            }
        },
        setStoreInterval(state){
          state.interval = setInterval( () => {
              //console.log("seconds = "+state.seconds);
              state.seconds+=1;
              state.exerciseTime+=1;
          }, 1000)
        },
        clearStoreInterval(state){
          clearInterval(state.interval);
          state.seconds = 0;
        },
        setIntroduction(state,introduction){
            this.state.introduction = introduction;
        },
        setOutcome(state,outcome){
            this.state.outcome = outcome;
        },
        setEnd(state,end){
            this.state.end = end;
        },
        changeDragEnd(state,dragEndValue){
            this.state.dragEnd = dragEndValue;
        },
        changeButtonEnd(state,buttonEndValue){
            this.state.buttonEnd = buttonEndValue;
        },
        setAudioSuccess(state,audio){
            this.state.audioSuccess = audio;
        },
        setAudioError(state,audio){
          this.state.audioError = audio;
        },
        setAudioHint(state,audio){
          this.state.audioHint = audio;
        },
        setAudioVictory(state,audio){
            this.state.audioVictory = audio;
        },
        setAudioMistake(state,audio){
            this.state.audioMistake = audio;
        },
        changeGeneralState(state,nextGeneralState){
            console.log("cambio al general state = "+nextGeneralState);
            /*if (this.state.generalState == 5){
                this.state.quadrant1 = this.state.originalQuadrant1
            }*/
            this.state.generalState = Math.floor(nextGeneralState);
            this.state.currentExercise = nextGeneralState;
            this.firstLetter = true;
            //this.state.quadrants = this.state.quadrantsArrangement[parseInt(this.state.generalState,10)-1];
        },
        changeGameState(state,nextGameState){
            this.state.lastGameState = this.state.gameState;
            this.state.gameState = nextGameState;
        },
        changeExerciseExplanation(state,nextExerciseExplanation){
            this.state.exerciseExplanation = nextExerciseExplanation;
        },
        writeTimes(state,data){
            let date = new Date();
            if (data.action===(GameValues.actionStartInteracting)){
                if(this.firstLetter){
                    console.log("entro");
                    this.firstLetter=false;
                    let time = date;
                    console.log("seconds paused = "+state.secondsPaused);
                    console.log("seconds transition = "+state.secondsTransition);
                    time.setSeconds(time.getSeconds()-state.secondsPaused-state.secondsTransition);
                    this.state.times.push({exercise:data.exercisenumber,action:data.action,intent: data.intent,time:time });
               }
            }
            else {
                let time = date;
                time.setSeconds(time.getSeconds()-state.secondsPaused-state.secondsTransition);
                console.log("seconds paused = "+state.secondsPaused);
                console.log("seconds transition = "+state.secondsTransition);
                this.state.times.push({
                    exercise: data.exercisenumber,
                    action: data.action,
                    intent: data.intent,
                    time: date
                });
            }
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
            this.state.exerciseTime = 0;
            this.state.clicked=false;
        },
        checkExercise(){
            console.log("Type of exercise = "+this.state.typeOfExercise);
            if (this.state.typeOfExercise == GameValues.words){
                console.log("Hago el check de words");
                this.state.quadrant1.checkWord();
                this.state.quadrant2.checkWord();
                this.state.quadrant3.checkWord();
                this.state.quadrant4.checkWord();
            }
            else{
                if (this.state.typeOfExercise == GameValues.ids){
                    console.log("Hago el check de ids");
                    this.state.quadrant1.checkId();
                    this.state.quadrant2.checkId();
                    this.state.quadrant3.checkId();
                    this.state.quadrant4.checkId();
                }
                else{
                    if (this.state.typeOfExercise == GameValues.category){
                        console.log("Hago el check de category");
                        this.state.quadrant1.checkCategory();
                        this.state.quadrant2.checkCategory();
                        this.state.quadrant3.checkCategory();
                        this.state.quadrant4.checkCategory();
                    }
                    else{
                        if (this.state.typeOfExercise == GameValues.drag){
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
            this.state.quadrants = this.state.quadrantsArrangement[Math.floor(generalState)-1];
            this.state.quadrant1 = this.state.quadrantsMatrix[(Math.floor(generalState)-1)*4];
            this.state.quadrant2 = this.state.quadrantsMatrix[(Math.floor(generalState)-1)*4+1];
            this.state.quadrant3 = this.state.quadrantsMatrix[(Math.floor(generalState)-1)*4+2];
            this.state.quadrant4 = this.state.quadrantsMatrix[(Math.floor(generalState)-1)*4+3];
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
    },
    actions:{
        waitingStateToNextGameState(context,data){
            console.log("entro al esperar");
            context.commit('changeGameState',data.quadrantWaitingState);
            context.state.secondsTransition += (GameValues.showCorrectIncorrectTime + GameValues.showExerciseTime)/1000;
            console.log("SECONDS TRANSITION = "+context.state.secondsTransition);
            setTimeout ( () => {
                console.log("Hago el restore");
                GameMethods.restore();
                console.log("cambio al estado "+data.waitingState);
                context.commit('changeGameState',data.waitingState);
                if (context.state.alert){
                    if (context.state.typeOfAlert == GameValues.warningIcon){
                        GameMethods.reproduceAudio(GameValues.hintAudio);
                    }
                    context.state.alert = false;
                    GameMethods.showAlert(context.state.typeOfAlert,context.state.alertTitle,context.state.alertText);
                }
                if (context.state.help){
                    context.state.help = false;
                    context.commit('changeHelp');
                }
                    setTimeout ( ()=> {
                        console.log("El next game state es ========= "+data.nextGameState);
                            context.commit('changeGameState',data.nextGameState);
                            console.log("El game state es "+this.state.gameState);
                            if (context.state.changeGeneralState) {
                                context.state.changeGeneralState = false;
                                context.commit('changeCategory', context.state.nextGeneralState);
                                context.dispatch('changeGeneralState', context.state.nextGeneralState);
                            }
                            if (context.state.resetIntent){
                                context.state.intent = 0;
                                context.state.resetIntent = false;
                            }
                            //Si cambio de ejercicio guardo el tiempo en que el paciente empieza a leer el ejercicio
                            if (data.nextGameState == GameValues.firstPartExplanation || data.nextGameState == GameValues.secondPartExplanation){
                                console.log("CAMBIO DE EJERCICIO, ACTION = "+GameValues.actionStartReading);
                                context.commit('writeTimes',{exercisenumber:context.state.nextGeneralState,action:GameValues.actionStartReading,intent:context.state.intent+1});
                            }
                            //Si vuelve a hacer el ejercicio, guardo el tiempo en que se muestra la pantalla nuevamente
                            /*else{
                                context.commit('writeTimes',{exercisenumber:context.state.nextGeneralState,action:GameValues.actionShowExercise,intent:context.state.intent});
                            }*/
                        },GameValues.showCorrectIncorrectTime
                        ,)
            },GameValues.showExerciseTime
            ,)
        },
        changeGeneralState(context,nextGeneralState){
            context.commit('changeGeneralState',nextGeneralState);
            context.commit('setQuadrants',nextGeneralState);
            context.dispatch('restartInterval');
        },
        restore(context, words){
            console.log("Estoy en el dispatch restore");
            context.commit('restore',words);
        },
        updateQuadrants(context,value){
          console.log("VEngo a hacer el update de quadrants"+context+" "+value);
        },
        changeGameState(context,value){
            context.commit('changeGameState',value);
            context.dispatch('restartInterval');
        },
        restartInterval({commit}){
            commit('clearStoreInterval');
            commit('setStoreInterval');
        },
        setPause(context,pause){
            console.log("puase se vuelve "+pause);
            context.commit('setPause',pause);
            if (pause){
                GameMethods.changeGameState(GameValues.pauseScreen);
                context.commit('clearStoreInterval');
            }
            else{
                GameMethods.changeGameState(context.state.lastGameState);
            }

        },
        calculateSessionValues(context){
            for (let i = context.state.exerciseData.length-1; i>=0; i--){
                context.state.exerciseData.pop();
            }
            console.log("stte");
            let intents = 0;
            let lastAction = null;
            let initialShowTime = 0;
            let initialReadingTime = 0;
            let exerciseTime = 0;
            let interactionTime = 0;
            let readingTime = 0;
            let exercise = 0;
            let hits = 0;
            let failures = 0;
            for (let i = 0; i < context.state.times.length;) {
                console.log("i = "+i);
                console.log(context.state.times[i]);
                if (context.state.times[i].action == GameValues.actionStartReading){
                    let data = null;
                    lastAction = GameValues.actionStartReading;
                    initialReadingTime = context.state.times[i].time;
                    intents = 0;
                    exercise = context.state.times[i].exercise;
                    initialShowTime = 0;
                    exerciseTime = 0;
                    interactionTime = 0;
                    readingTime = 0;
                    hits=0;
                    failures=0;
                    switch (exercise){
                        case 1.1: exercise = 1; break;
                        case 1.2: exercise = 2; break;
                        case 2.1: exercise = 3; break;
                        case 2.2: exercise = 4; break;
                        default: exercise = exercise + 2; break;
                    }
                    i+=1;
                    if( i<context.state.times.length ) {
                        while (i<context.state.times.length && context.state.times[i].action != GameValues.actionStartReading) {
                            console.log("i = " + i);
                            switch (context.state.times[i].action) {
                                case GameValues.actionShowExercise:
                                    console.log("Entra a show");
                                    if (lastAction == GameValues.actionStartReading) {
                                        initialShowTime = context.state.times[i].time;
                                        readingTime = initialShowTime - initialReadingTime;
                                    }/* else {
                                        initialShowTime = context.state.times[i].time;
                                        //initialShowTime.setSeconds(initialShowTime.getSeconds()+(GameValues.showExerciseTime+GameValues.showCorrectIncorrectTime)*intents);
                                    }*/
                                    break;
                                case GameValues.actionStartInteracting:
                                    console.log("Entra a start interacting");
                                    interactionTime = context.state.times[i].time - initialShowTime;
                                    break;
                                case GameValues.actionFinishCorrect:
                                    intents+=1;
                                    hits+=1;
                                    console.log("Entra a finish correct");
                                    exerciseTime = context.state.times[i].time - initialReadingTime;
                                    data = {
                                        exercise: exercise,
                                        codificationTime: interactionTime,
                                        completionTime: exerciseTime,
                                        intents: intents,
                                        readingTime: readingTime,
                                        hits: hits,
                                        failures: failures,
                                    }
                                    //Si todavia no se crearon los datos del ejercicio, se crean a partir de los datos obtenidos
                                    if (context.state.exerciseData[exercise - 1] == null){
                                        context.state.exerciseData.push(data);
                                    }
                                    //Si ya se creo el ejercicio, se saca el promedio de los tiempos
                                    else {
                                        let prevAmountHits = parseInt(context.state.exerciseData[exercise-1].hits,10);
                                        let prevAmountfailures = parseInt(context.state.exerciseData[exercise - 1].failures, 10);
                                        let prevHitsPlusFailures = prevAmountHits + prevAmountfailures;
                                        let prevAmountIntents = context.state.exerciseData[exercise-1].intents * (prevAmountHits+prevAmountfailures);
                                        let prevCodTime = parseFloat(context.state.exerciseData[exercise - 1].codificationTime,10);
                                        let prevCompletionTime = parseFloat(context.state.exerciseData[exercise - 1].completionTime,10);
                                        let prevReadingTime = parseFloat(context.state.exerciseData[exercise - 1].readingTime,10);

                                        context.state.exerciseData[exercise - 1].exercise = data.exercise;
                                        context.state.exerciseData[exercise - 1].codificationTime = (prevCodTime*prevHitsPlusFailures + parseFloat(data.codificationTime,10)) / (prevHitsPlusFailures+1);
                                        context.state.exerciseData[exercise - 1].completionTime = ((prevCompletionTime*prevHitsPlusFailures) + parseFloat(data.completionTime,10)) / (prevHitsPlusFailures+1);
                                        context.state.exerciseData[exercise - 1].intents = (prevAmountIntents * prevHitsPlusFailures + intents) / (prevHitsPlusFailures+1);
                                        context.state.exerciseData[exercise - 1].readingTime = ((prevReadingTime*prevHitsPlusFailures) + parseFloat(data.readingTime,10)) / (prevHitsPlusFailures+1);
                                        context.state.exerciseData[exercise - 1].hits = prevAmountHits + hits;
                                        //context.state.exerciseData[exercise - 1].failures = (parseInt(context.state.exerciseData[exercise - 1].failures,10)+failures);
                                    }
                                    console.log(context.state.exerciseData);
                                    break;
                                //Si la respuesta es incorrecta, se añade un intento
                                case GameValues.actionFinishIncorrect:
                                    intents+=1;
                                break;
                                //Si el ejercicio se responde incorrectamente, se añade un fallo y se guardan los tiempos
                                case GameValues.actionFinishExercise: {
                                    failures+=1;
                                    console.log("ENTR AA FNISH EXERCISE WRONG");
                                    exerciseTime = context.state.times[i].time - initialReadingTime;
                                    data = {
                                        exercise: exercise,
                                        codificationTime: interactionTime,
                                        completionTime: exerciseTime,
                                        intents: intents,
                                        readingTime: readingTime,
                                        hits: hits,
                                        failures: failures,
                                    }
                                    if (context.state.exerciseData[exercise - 1] == null){
                                        context.state.exerciseData.push(data);
                                    }
                                    else {
                                        let prevAmountHits = parseInt(context.state.exerciseData[exercise-1].hits,10);
                                        let prevAmountfailures = parseInt(context.state.exerciseData[exercise - 1].failures, 10);
                                        let prevHitsPlusFailures = prevAmountHits + prevAmountfailures;
                                        let prevAmountIntents = context.state.exerciseData[exercise-1].intents * (prevAmountHits+prevAmountfailures);
                                        let prevCodTime = parseFloat(context.state.exerciseData[exercise - 1].codificationTime,10);
                                        let prevCompletionTime = parseFloat(context.state.exerciseData[exercise - 1].completionTime,10);
                                        let prevReadingTime = parseFloat(context.state.exerciseData[exercise - 1].readingTime,10);

                                        context.state.exerciseData[exercise - 1].exercise = data.exercise;
                                        context.state.exerciseData[exercise - 1].codificationTime = (prevCodTime*prevHitsPlusFailures + parseFloat(data.codificationTime,10)) / (prevHitsPlusFailures+1);
                                        context.state.exerciseData[exercise - 1].completionTime = ((prevCompletionTime*prevHitsPlusFailures) + parseFloat(data.completionTime,10)) / (prevHitsPlusFailures+1);
                                        context.state.exerciseData[exercise - 1].intents = (prevAmountIntents * prevHitsPlusFailures + intents) (prevHitsPlusFailures+1);
                                        context.state.exerciseData[exercise - 1].readingTime = ((prevReadingTime*prevHitsPlusFailures) + parseFloat(data.readingTime,10)) / (prevHitsPlusFailures+1);
                                        //context.state.exerciseData[exercise - 1].hits = prevAmountHits + hits;
                                        context.state.exerciseData[exercise - 1].failures = prevAmountfailures + 1;
                                    }
                                    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
                                    console.log(context.state.exerciseData);
                                    lastAction = GameValues.actionFinishIncorrect;
                                    break;
                                }
                                    default: console.log("Entra a default"); break;
                            }
                            i += 1;
                        }
                    }
                }
            }
            console.log("data = ");
            console.log(context.state.exerciseData);
        },
    }
})
