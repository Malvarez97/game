import Swal from "sweetalert2";
import store from "../store.js"

export function waitAndNextGameState(waitingState, nextGameState) {
    store.dispatch('waitingStateToNextState',{miliseconds: 2000,waitingState: waitingState, nextGameState: nextGameState});
}
export function waitAndNextQuadrantState (waitingState, nextQuadrantState) {
    store.dispatch('waitingStateToNextQuadrantState',{miliseconds: 2000,waitingState: waitingState, nextQuadrantState: nextQuadrantState});
}
export function changeGameState(nextGameState){
    store.dispatch('changeGameState',nextGameState);
}
export function restore(){
    store.commit('restore');
}
export function setPause(pause){
    store.commit('setPause',pause);
}
export function restartInterval(){
    store.dispatch('restartInterval');
}
export function changeGeneralState(nextGeneralState) {
    store.commit('changeCategory', nextGeneralState);
    store.dispatch('changeGeneralState', (nextGeneralState));
}
export function changeHelp(){
    store.commit('changeHelp');
}
export function setTypeExercise(typeOfExercise){
    store.commit('setTypeOfExercise',typeOfExercise);
}
// salvar diferentes tipos de datos
export function saveValue(exercisenumberT, actionT ,intentT ) {
    store.commit('writeTimes', {exercisenumber:exercisenumberT, action:actionT,intent:intentT});
}
export function changeQuadrantState(nextQuadrantState) {
    store.dispatch('changeQuadrantState', nextQuadrantState);
}
export function reproduceAudio(audio){
  switch (audio){
      case 'success' : store.state.audioSuccess.play(); break;
      case 'mistake' : store.state.audioMistake.play(); break;
      case 'hint' : store.state.audioHint.play(); break;
      case 'error' : store.state.audioError.play(); break;
      case 'victory' : store.state.audioVictory.play(); break;
  }
}
export function getCorrectResponse(){
    return store.state.correctResponse;
}
export function getTypeOfExercise(){
    return store.state.typeOfExercise;
}
export function getGameState(){
    return parseInt(store.state.gameState,10);
}
export function getGeneralState(){
    return parseInt(store.state.generalState,10);
}
export function getQuadrantState(){
    return parseInt(store.state.quadrantState,10);
}
export function checkExercise(){
    store.commit('checkExercise');
}
export function changeState(state){
    store.dispatch('changeState',state);
}
export function changeDragEnd (dragEndValue){
    store.commit('changeDragEnd',dragEndValue);
}
export function changeButtonEnd(buttonEnd){
    store.commit('changeButtonEnd',buttonEnd);
}
export function showError(nroEjercicio) {
    Swal.fire({
        icon: 'error',
        title: 'Inténtalo nuevamente. Volverás al ejercicio '+nroEjercicio,
        //text: 'Inténtalo nuevamente. Volverás al ejercicio '+nroEjercicio,
        //timer: 2000,
        //footer: '<a href="">¿Como no caerse a los pedazos?</a>'
    })
}
export function showWarning(text) {
    Swal.fire({
        icon: 'warning',
        title: 'Te queda 1 solo intento!',
        text: text,
        showCloseButton: true
    })
}
export function showCorrect() {
    Swal.fire({
        icon: 'success',
        title: 'Buena!',
        //text: 'Segui asi fiera, idolo, titan, mastodonte, pura sangre',
    })
}