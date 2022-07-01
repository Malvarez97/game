import Swal from "sweetalert2";
import * as GameValues from "./gamevalues.js";
import store from "../store.js"

//Metodos del juego

//Espera 2 segundos en un estado intermedio para luego ir al siguiente
export function waitAndNextGameState(waitingState, nextGameState, changeGeneralState, nextGeneralState, help) {
    console.log("DATA CHANGE GS = "+changeGeneralState);
    console.log("NGS = "+nextGeneralState);
    store.dispatch('waitingStateToNextGameState',{miliseconds: 2000,waitingState: waitingState, nextGameState: nextGameState, changeGenS: changeGeneralState, nextGeneralState: nextGeneralState, help:help});
}
//Espera 2 segundos en un estado de cuadrante intermedio para luego ir al siguiente
export function waitAndNextQuadrantState (waitingState, nextQuadrantState) {
    store.dispatch('waitingStateToNextQuadrantState',{miliseconds: 2000,waitingState: waitingState, nextQuadrantState: nextQuadrantState});
}
//Cambia el estado del juego
export function changeGameState(nextGameState){
    store.dispatch('changeGameState',nextGameState);
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
export function saveValue(exercisenumberT, actionT ,intentT ) {
    store.commit('writeTimes', {exercisenumber:exercisenumberT, action:actionT,intent:intentT});
}
//Cambia el estado del cuadrante
export function changeQuadrantState(nextQuadrantState) {
    store.dispatch('changeQuadrantState', nextQuadrantState);
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
//Devuelve el estado del cuadrante actual
export function getQuadrantState(){
    return parseInt(store.state.quadrantState,10);
}
//Chequea si el ejercicio se completo correctamente o no
export function checkExercise(){
    store.commit('checkExercise');
}
//Cambia el estado del juego
export function changeState(state){
    store.dispatch('changeState',state);
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
export function getExerciseType(idExercise){
  let exercise = idExercise + 1;
    switch(exercise) {
      case 1: return GameValues.game1Type;
      case 2: return GameValues.game1Type;
      case 3: return GameValues.game2Type;
      case 4: return GameValues.game2Type;
      case 5: return GameValues.game3Type;
      case 6: return GameValues.game4Type;
      case 7: return GameValues.game4Type;
      case 8: return GameValues.game5Type;
      case 9: return GameValues.game6Type;
      case 10: return GameValues.game7Type;
      case 11: return GameValues.game7Type;
      case 12: return GameValues.game7Type;
      case 13: return GameValues.game8Type;
      case 14: return GameValues.game9Type;
  }
}
export function getTimeLimit(idExercise){
    let exercise = idExercise + 1;
    switch (exercise){
        case 1: return 240;
        case 2: return 240;
        case 3: return 240;
        case 4: return 240;
        case 5: return 240;
        case 6: return 240;
        case 7: return 240;
        case 8: return 240;
        case 9: return 240;
        case 10: return 240;
        case 11: return 240;
        case 12: return 240;
        case 13: return 240;
        case 14: return 240;
    }
}