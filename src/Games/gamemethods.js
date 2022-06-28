import Swal from "sweetalert2";
import store from "../store.js"

//Metodos del juego

//Espera 2 segundos en un estado intermedio para luego ir al siguiente
export function waitAndNextGameState(waitingState, nextGameState) {
    store.dispatch('waitingStateToNextState',{miliseconds: 2000,waitingState: waitingState, nextGameState: nextGameState});
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
//Activa la ayuda en el ejercicio
export function changeHelp(){
    store.commit('changeHelp');
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
export function getTypeOfExercise(){
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