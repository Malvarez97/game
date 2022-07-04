import Swal from "sweetalert2";
import * as GameValues from "./gamevalues.js";
import store from "../store.js"

//Metodos del juego

//Espera 2 segundos en un estado intermedio para luego ir al siguiente
export function waitAndNextGameState(quadrantWaitingState, waitingState, nextGameState) {
    console.log("MANDO COMO NEXT GAME STATE A "+nextGameState);
    store.dispatch('waitingStateToNextGameState',{quadrantWaitingState: quadrantWaitingState, waitingState: waitingState, nextGameState: nextGameState});
}
//Resetea las variables del juego
export function restore(){
    store.commit('restore');
}
//Setea en verdadero o falso, la variable global "pausa", esta indicara si el juego esta en pausa o no
export function setPause(pause){
    store.dispatch('setPause',pause);
}
//Restaura el cronometro que lleva la cuenta del tiempo de inactividad del usuario en el juego
export function restartInterval(){
    store.dispatch('restartInterval');
}
//Cambia de ejercicio
export function changeGeneralState(nextGeneralState) {
    store.commit('changeCategory', nextGeneralState);
    store.dispatch('changeGeneralState', (nextGeneralState));
}
//Setea la ayuda para realizarla luego de la transicion
export function changeHelp(){
    store.state.help = true;
}
//Setea el tipo de ejercicio actual
export function setTypeExercise(typeOfExercise){
    store.commit('setTypeOfExercise',typeOfExercise);
}
//Guarda los tiempos en el cual el usuario realizo determinada accion
export function saveTime(exercisenumberT, actionT ,intentT ) {
    store.commit('writeTimes', {exercisenumber:exercisenumberT, action:actionT,intent:intentT});
}
//Reproduce un audio
export function reproduceAudio(audio){
  switch (audio){
      case 'success' : store.state.audioSuccess.play(); break;
      case 'mistake' : store.state.audioMistake.play(); break;
      case 'hint' : store.state.audioHint.play(); break;
      case 'error' : store.state.audioError.play(); break;
      case 'victory' : store.state.audioVictory.play(); break;
  }
}
//Devulve un booleano que indica si el usuario realizo correctamente el ejercicio o no
export function getCorrectResponse(){
    return store.state.correctResponse;
}
//Devuelve el tipo de ejercicio actual
export function getCurrentTypeOfExercise(){
    return store.state.typeOfExercise;
}
//Devuelve el estado actual del juego
export function getGameState(){
    return parseInt(store.state.gameState,10);
}
//Devuelve el ejercicio actual
export function getGeneralState(){
    return parseInt(store.state.generalState,10);
}
//Chequea si el ejercicio se completo correctamente o no
export function checkExercise(){
    store.commit('checkExercise');
}
//Cambia el estado del juego
export function changeGameState(state){
    store.dispatch('changeGameState',state);
}
//Indica que el arrastre de una palabra finalizo (ejercicio 5)
export function changeDragEnd (dragEndValue){
    store.commit('changeDragEnd',dragEndValue);
}
//Indica que
export function changeButtonEnd(buttonEnd){
    store.commit('changeButtonEnd',buttonEnd);
}
//Muestra un mensaje de error por pantalla
export function showError(nroEjercicio) {
    Swal.fire({
        icon: 'error',
        title: 'Inténtalo nuevamente. Volverás al ejercicio '+nroEjercicio,
        //text: 'Inténtalo nuevamente. Volverás al ejercicio '+nroEjercicio,
        //timer: 2000,
        //footer: '<a href="">¿Como no caerse a los pedazos?</a>'
    })
}
//Setea una alerta para mostrarse luego de una transicion
export function setAlert(type, title, text){
    store.state.typeOfAlert = type;
    store.state.alert = true;
    store.state.alertTitle = title;
    store.state.alertText = text;
}
export function resetIntent(){
    store.state.resetIntent = true;
}
//Muestra una alerta por pantalla
export function showAlert(icon,title,text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showCloseButton: true
    })
}
//Muestra un mensaje de advertencia por pantalla
export function showWarning(text) {
    Swal.fire({
        icon: 'warning',
        title: 'Te queda 1 solo intento!',
        text: text,
        showCloseButton: true
    })
}
//Muestra un mensaje de correcto por pantalla
export function showCorrect() {
    Swal.fire({
        icon: 'success',
        title: 'Buena!',
        //text: 'Gran trabajo',
    })
}
//Muestra un mensaje de advertencia por pantalla con título por parametro
export function showWarningTitle(text) {
    Swal.fire({
        icon: 'warning',
        title: text,
        //text: text,
        showCloseButton: true
    })
}
//Setea los atributos para ir al siguiente estado de juego luego de una transicion
export function setNextGeneralState(nextGeneralState){
    store.state.changeGeneralState = true;
    store.state.nextGeneralState = nextGeneralState;
}
export function getExerciseType(exercise){
    switch(exercise) {
      case 1: return GameValues.exercise1Type;
      case 1.1: return GameValues.exercise1sub1Type;
      case 1.2: return GameValues.exercise1sub2Type;
      case 2: return GameValues.exercise2Type;
      case 2.1: return GameValues.exercise2sub1Type;
      case 2.2: return GameValues.exercise2sub2Type;
      case 3: return GameValues.exercise3Type;
      case 4: return GameValues.exercise4Type;
      case 5: return GameValues.exercise5Type;
      case 6: return GameValues.exercise6Type;
      case 7: return GameValues.exercise7Type;
      case 8: return GameValues.exercise8Type;
      case 9: return GameValues.exercise9Type;
      case 10: return GameValues.exercise10Type;
      case 11: return GameValues.exercise11Type;
      case 12: return GameValues.exercise12Type;
      case 13: return GameValues.exercise13Type;
      case 14: return GameValues.exercise14Type;
  }
}
export function getTimeLimit(){
    switch (store.state.currentExercise){
        case 1: return GameValues.timeLimitEx1;
        case 2: return GameValues.timeLimitEx2;
        case 3: return GameValues.timeLimitEx3;
        case 4: return GameValues.timeLimitEx4;
        case 5: return GameValues.timeLimitEx5;
        case 6: return GameValues.timeLimitEx6;
        case 7: return GameValues.timeLimitEx7;
        case 8: return GameValues.timeLimitEx8;
        case 9: return GameValues.timeLimitEx9;
        case 10: return GameValues.timeLimitEx10;
        case 11: return GameValues.timeLimitEx11;
        case 12: return GameValues.timeLimitEx12;
        case 13: return GameValues.timeLimitEx13;
        case 14: return GameValues.timeLimitEx14;
    }
}
export function getLimitAttempts(){
    switch(store.state.currentExercise){
        case 1.1: return GameValues.limitIntentsEx1sub1;
        case 1.2: return GameValues.limitIntentsEx1sub2;
        case 2.1: return GameValues.limitIntentsEx2sub1;
        case 2.2: return GameValues.limitIntentsEx2sub2;
        case 3: return GameValues.limitIntentsEx3;
        case 4: return GameValues.limitIntentsEx4;
        case 5: return GameValues.limitIntentsEx5;
        case 6: return GameValues.limitIntentsEx6;
        case 7: return GameValues.limitIntentsEx7;
        case 8: return GameValues.limitIntentsEx8;
        case 9: return GameValues.limitIntentsEx9;
        case 10: return GameValues.limitIntentsEx10;
        case 11: return GameValues.limitIntentsEx11;
        case 12: return GameValues.limitIntentsEx12;
        case 13: return GameValues.limitIntentsEx13;
        case 14: return GameValues.limitIntentsEx14;
    }
}
export function hasHelp(){
    switch (store.state.currentExercise){
        case 1.1: return GameValues.exercise1sub1Help;
        case 1.2: return GameValues.exercise1sub2Help;
        case 2.1: return GameValues.exercise2sub1Help;
        case 2.2: return GameValues.exercise2sub2Help;
        case 3: return GameValues.exercise3Help;
        case 4: return GameValues.exercise4Help;
        case 5: return GameValues.exercise5Help;
        case 6: return GameValues.exercise6Help;
        case 7: return GameValues.exercise7Help;
        case 8: return GameValues.exercise8Help;
        case 9: return GameValues.exercise9Help;
        case 10: return GameValues.exercise10Help;
        case 11: return GameValues.exercise11Help;
        case 12: return GameValues.exercise12Help;
        case 13: return GameValues.exercise13Help;
        case 14: return GameValues.exercise14Help;
    }
}
export function getLoseExercise(){
    switch(store.state.currentExercise){
        case 1.1: return GameValues.loseExercise1;
        case 1.2: return GameValues.loseExercise1;
        case 2.1: return GameValues.loseExercise2;
        case 2.2: return GameValues.loseExercise2;
        case 3: return GameValues.loseExercise3;
        case 4: return GameValues.loseExercise4;
        case 5: return GameValues.loseExercise5;
        case 6: return GameValues.loseExercise6;
        case 7: return GameValues.loseExercise7;
        case 8: return GameValues.loseExercise8;
        case 9: return GameValues.loseExercise9;
        case 10: return GameValues.loseExercise10;
        case 11: return GameValues.loseExercise11;
        case 12: return GameValues.loseExercise12;
        case 13: return GameValues.loseExercise13;
        case 14: return GameValues.loseExercise14;
    }
}
export function getNextGeneralState(){
    console.log("El estado actual es = "+store.state.currentExercise);
    switch (store.state.currentExercise){
        case 1.1: console.log("Entra al 1.1"); return 1.2;
        case 1.2: return 2.1;
        case 2.1: return 2.2;
        case 2.2: return 3;
        default: return parseInt(store.state.currentExercise,10) + 1;
    }
}
export function getExerciseExplanation(){
    switch (store.state.currentExercise){
        case 1.1: return store.state.explanations[GameValues.explanationIdEx1sub1];
        case 1.2: return store.state.explanations[GameValues.explanationIdEx1sub2];
        case 2.1: return store.state.explanations[GameValues.explanationIdEx2sub1];
        case 2.2: return store.state.explanations[GameValues.explanationIdEx2sub2];
        case 3: return store.state.explanations[GameValues.explanationIdEx3];
        case 4: return store.state.explanations[GameValues.explanationIdEx4];
        case 5: return store.state.explanations[GameValues.explanationIdEx5];
        case 6: return store.state.explanations[GameValues.explanationIdEx6];
        case 7: return store.state.explanations[GameValues.explanationIdEx7];
        case 8: return store.state.explanations[GameValues.explanationIdEx8];
        case 9: return store.state.explanations[GameValues.explanationIdEx9];
        case 10: return store.state.explanations[GameValues.explanationIdEx10];
        case 11: return store.state.explanations[GameValues.explanationIdEx11];
        case 12: return store.state.explanations[GameValues.explanationIdEx12];
        case 13: return store.state.explanations[GameValues.explanationIdEx13];
        case 14: return store.state.explanations[GameValues.explanationIdEx14];
    }
}
export function getWaitingQuadrant(){
    if (store.state.intent < getLimitAttempts()){
        switch (store.state.currentExercise){
            case 1.1: return GameValues.exercise1sub1WaitingQuadrant;
            case 1.2: return GameValues.exercise1sub2WaitingQuadrant;
            case 2.1: return GameValues.exercise2sub1WaitingQuadrant;
            case 2.2: return GameValues.exercise2sub2WaitingQuadrant;
            case 3: return GameValues.exercise3WaitingQuadrant;
            case 4: return GameValues.exercise4WaitingQuadrant;
            case 5: return GameValues.exercise5WaitingQuadrant;
            case 6: return GameValues.exercise6WaitingQuadrant;
            case 7: return GameValues.exercise7WaitingQuadrant;
            case 8: return GameValues.exercise8WaitingQuadrant;
            case 9: return GameValues.exercise9WaitingQuadrant;
            case 10: return GameValues.exercise10WaitingQuadrant;
            case 11: return GameValues.exercise11WaitingQuadrant;
            case 12: return GameValues.exercise12WaitingQuadrant;
            case 13: return GameValues.exercise13WaitingQuadrant;
            case 14: return GameValues.exercise14WaitingQuadrant;
        }
    }
    //Si es el ultimo intento muestro el cuadrante con las respuestas correctas
    else{
        switch (store.state.currentExercise){
            case 1.1: return GameValues.exercise1sub1FinalWaitingQuadrant;
            case 1.2: return GameValues.exercise1sub2FinalWaitingQuadrant;
            case 2.1: return GameValues.exercise2sub1FinalWaitingQuadrant;
            case 2.2: return GameValues.exercise2sub2FinalWaitingQuadrant;
            case 3: return GameValues.exercise3FinalWaitingQuadrant;
            case 4: return GameValues.exercise4FinalWaitingQuadrant;
            case 5: return GameValues.exercise5FinalWaitingQuadrant;
            case 6: return GameValues.exercise6FinalWaitingQuadrant;
            case 7: return GameValues.exercise7FinalWaitingQuadrant;
            case 8: return GameValues.exercise8FinalWaitingQuadrant;
            case 9: return GameValues.exercise9FinalWaitingQuadrant;
            case 10: return GameValues.exercise10FinalWaitingQuadrant;
            case 11: return GameValues.exercise11FinalWaitingQuadrant;
            case 12: return GameValues.exercise12FinalWaitingQuadrant;
            case 13: return GameValues.exercise13FinalWaitingQuadrant;
            case 14: return GameValues.exercise14FinalWaitingQuadrant;
        }
    }
}
export function getExerciseState(){
    switch (store.state.currentExercise){
        case 1.1: return GameValues.exercise1sub1State;
        case 1.2: return GameValues.exercise1sub2State;
        case 2.1: return GameValues.exercise2sub1State;
        case 2.2: return GameValues.exercise2sub2State;
        case 3: return GameValues.exercise3State;
        case 4: return GameValues.exercise4State;
        case 5: return GameValues.exercise5State;
        case 6: return GameValues.exercise6State;
        case 7: return GameValues.exercise7State;
        case 8: return GameValues.exercise8State;
        case 9: return GameValues.exercise9State;
        case 10: return GameValues.exercise10State;
        case 11: return GameValues.exercise11State;
        case 12: return GameValues.exercise12State;
        case 13: return GameValues.exercise13State;
        case 14: return GameValues.exercise14State;
    }
}
export function hasIntermediateScreen(){
    console.log("INTERMEDIATE EXERCISE ="+store.state.currentExercise);
    switch(store.state.currentExercise){
        case 1.1: return GameValues.exercise1sub1HasIntermediateScreen;
        case 1.2: return GameValues.exercise1sub2HasIntermediateScreen;
        case 2.1: return GameValues.exercise2sub1HasIntermediateScreen;
        case 2.2: return GameValues.exercise2sub2HasIntermediateScreen;
        case 3: return GameValues.exercise3HasIntermediateScreen;
        case 4: return GameValues.exercise4HasIntermediateScreen;
        case 5: return GameValues.exercise5HasIntermediateScreen;
        case 6: return GameValues.exercise6HasIntermediateScreen;
        case 7: return GameValues.exercise7HasIntermediateScreen;
        case 8: return GameValues.exercise8HasIntermediateScreen;
        case 9: return GameValues.exercise9HasIntermediateScreen;
        case 10: return GameValues.exercise10HasIntermediateScreen;
        case 11: return GameValues.exercise11HasIntermediateScreen;
        case 12: return GameValues.exercise12HasIntermediateScreen;
        case 13: return GameValues.exercise13HasIntermediateScreen;
        case 14: return GameValues.exercise14HasIntermediateScreen;
    }
}
export function getIntermediateScreen(){
    switch(store.state.currentExercise){
        case 1.1: return GameValues.exercise1sub1IntermediateScreen;
        case 2.1: return GameValues.exercise2sub1IntermediateScreen;
        case 10: return GameValues.exercise10IntermediateScreen;
        case 11: return GameValues.exercise11IntermediateScreen;
        case 12: return GameValues.exercise12IntermediateScreen;
    }
}
export function isInIntermediateScreen() {
    switch (store.state.gameState) {
        case GameValues.showWordsAndIds:
        case GameValues.showAll :
            return true;
        default:
            return false;
    }
}
export function nextLocalState(){
    //Se añade 1 al intento actual
    store.state.intent += 1;
    //Si la respuesta fue correcta
    if (getCorrectResponse()){
        //Se ejecuta el audio de correcto, se guarda el tiempo, se resetean las variables y se realiza la transicion de pantallas
        reproduceAudio(GameValues.successAudio);
        saveTime(parseInt(store.state.currentExercise,10),GameValues.actionFinishExercise,store.state.intent);
        resetIntent();
        //Si el usuario contesta correctamente se pasa al ejercicio siguiente
        let nextGeneralState = getNextGeneralState();
        console.log("NExt general state = "+getNextGeneralState());
        console.log("Esta mal "+((nextGeneralState - Math.floor(nextGeneralState)).toFixed(1)));
        //Si el ejercicio tiene segunda parte, pasamos a la segunda parte de la explicacion, sino a la primera
        switch (((nextGeneralState - Math.floor(nextGeneralState)).toFixed(1))){
            case "0.0": transition(getWaitingQuadrant(),GameValues.correctTransition,GameValues.firstPartExplanation); break;
            case "0.1": transition(getWaitingQuadrant(),GameValues.correctTransition,GameValues.firstPartExplanation); break;
            //Si el ejercicio tiene segunda parte, tambien guardamos el tiempo de cuando se empieza a leer el otro ejercicio
            case "0.2": console.log("entro al 0.2"); transition(getWaitingQuadrant(),GameValues.correctTransition,GameValues.secondPartExplanation);
                saveTime(nextGeneralState, GameValues.actionStartReading, store.state.intent+1);
                break;
        }
        //Guardamos el estado siguiente para cambiarse luego de la transicion
        setNextGeneralState(getNextGeneralState());
    }
    //Si fue incorrecta
    else {
        console.log("LImite de intentos = "+getLimitAttempts());
        console.log("intet = "+store.state.intent);
        //Se guarda el tiempo de fallo
        saveTime(parseInt(store.state.currentExercise,10),GameValues.actionFinishIncorrect,store.state.intent);
        reproduceAudio(GameValues.errorAudio);
        //Si no fue el ultimo intento se hace la transicion
        if (store.state.intent < getLimitAttempts()) {
            //Transiciono a un estado incorrecto y luego al mismo estado de juego
            transition(getWaitingQuadrant(),GameValues.incorrectTransition,store.state.gameState);
            //Si queda solo 1 intento restante
            if (store.state.intent == getLimitAttempts() - 1){
                //Si el ejercicio tiene ayuda, la activo y le notifico al usuario
                if (hasHelp()){
                    changeHelp();
                    setAlert(GameValues.warningIcon,GameValues.warningHelpTitle,"");
                }
                //Si el ejercicio no tiene ayuda, le notifico al usuario que le queda solo 1 intento
                else{
                    setAlert(GameValues.warningIcon,GameValues.defaultWarningTitle,"");
                }
            }
        }
        //Si fue el ultimo intento
        else {
            //Se notifica el fallo en el ejercicio al usuario y se transiciona hacia atras
            transition(getWaitingQuadrant(),GameValues.incorrectTransition,GameValues.firstPartExplanation);
            //Se resetea la variable de cantidad de intentos
            resetIntent();
            setAlert(GameValues.errorIcon,GameValues.defaultErrorTitle+Math.floor(getLoseExercise()),"");
            setNextGeneralState(getLoseExercise());
        }
    }
}
//Metodo para realizar transiciones de pantallas. Se invoca a waitAndNextGameState, que cambia de estado por
//dos segundos y luego vuelve al estado indicado
export function transition(quadrantWaitingState,waitingState,nextGameState){
    waitAndNextGameState(quadrantWaitingState,waitingState,nextGameState);
    //Si vuelve a hacer el ejercicio, guardo el tiempo en que se muestra la pantalla nuevamente
    if (nextGameState == store.state.gameState){
        saveTime(parseInt(store.state.currentExercise,10),GameValues.actionShowExercise,store.state.intent+1);
    }
}
//Metodo que se ejecuta al clickear el boton de siguiente o completar el ejercicio correctamente\
//Este metodo setea los valores del juego, estado, tipo de ejercicio y guarda tiempos en pantallas explicativas
//En pantallas no explicativas, chequea que el ejercicio se haya respondido correctamente
export function changeValues() {
    console.log("Game state = "+store.state.gameState);
    console.log("has intermediate screen = "+hasIntermediateScreen());
    console.log("current exercise = "+store.state.currentExercise);
    if (store.state.gameState == GameValues.draggable){
        changeDragEnd(true);
    }
    switch (store.state.gameState) {
        //Explicaciones de los ejercicios
        case GameValues.firstPartExplanation:
        case GameValues.secondPartExplanation:
            //Si el juego tiene pantalla intermedia
            if (hasIntermediateScreen()){
                console.log("cambio al estado = "+getIntermediateScreen());
                changeGameState(getIntermediateScreen());
            }
            //Si directamente va al juego
            else{
                changeGameState(getExerciseState());
            }
            saveTime(store.state.currentExercise,GameValues.actionShowExercise,store.state.intent + 1);
            setTypeExercise(getExerciseType(store.state.currentExercise));
            break;
        //Estados en los cuales se muestra la solucion del juego como estado intermedio entre la explicacion y el ejercicio
        case GameValues.showWordsAndIds:
        case GameValues.showAll:
            changeGameState(getExerciseState());
            break;
        default:
            checkExercise();
    }
}
