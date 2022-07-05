//Valores constantes del juego

//Estados del juego
export const firstPartExplanation = 0;
export const secondPartExplanation = 1;
export const showWordsAndIds = 2;
export const completeWords = 3;
export const completeIds = 4;
export const showIdsCompleteWords = 5;
export const showWordsCompleteIds = 6;
export const showWordsCompleteCategories = 7;
export const showIdsShowWordsCompleteWords = 8;
export const showAll = 9;
export const buttons = 10;
export const highlightWrongValues = 11;
export const draggable = 12;
export const correctTransition = 13;
export const incorrectTransition = 14;
export const congratulationsScreen = 15;
export const pauseScreen = 16;
export const highlightWrongAnswer = 17;
export const showWrongAnswer = 18;

//Ejercicio al que se volveria si se pierde en determinado ejercicio
export const loseExercise1 = 1.1;
export const loseExercise2 = 1.1;
export const loseExercise3 = 1.1;
export const loseExercise4 = 2.1;
export const loseExercise5 = 1.1;
export const loseExercise6 = 1.1;
export const loseExercise7 = 6;
export const loseExercise8 = 5;
export const loseExercise9 = 5;
export const loseExercise10 = 1.1;
export const loseExercise11 = 12;
export const loseExercise12 = 13;
export const loseExercise13 = 14;
export const loseExercise14 = 10;

//Intentos en cada uno de los juegos
export const limitIntentsEx1sub1 = 3;
export const limitIntentsEx1sub2 = 2;
export const limitIntentsEx2sub1 = 3;
export const limitIntentsEx2sub2 = 2;
export const limitIntentsEx3 = 3;
export const limitIntentsEx4 = 3;
export const limitIntentsEx5 = 5;
export const limitIntentsEx6 = 3;
export const limitIntentsEx7 = 3;
export const limitIntentsEx8 = 3;
export const limitIntentsEx9 = 3;

export const limitIntentsEx10 = 3;
export const limitIntentsEx11 = 3;
export const limitIntentsEx12 = 3;
export const limitIntentsEx13 = 3;
export const limitIntentsEx14 = 3;

//Tiempo limite para los ejercicios
export const timeLimitEx1 = 240;
export const timeLimitEx2 = 240;
export const timeLimitEx3 = 240;
export const timeLimitEx4 = 240;
export const timeLimitEx5 = 240;
export const timeLimitEx6 = 240;
export const timeLimitEx7 = 240;
export const timeLimitEx8 = 240;
export const timeLimitEx9 = 240;
export const timeLimitEx10 = 240;
export const timeLimitEx11 = 240;
export const timeLimitEx12 = 240;
export const timeLimitEx13 = 240;
export const timeLimitEx14 = 240;

//Variables de las alertas
export const defaultWarningTitle = "Te queda 1 solo intento";
export const warningHelpTitle = "Último intento. Recibirás una ayuda";
export const defaultSuccessTitle = "Respuesta correcta";
export const defaultErrorTitle = "Inténtalo nuevamente. Volverás al ejercicio ";
export const warningIcon = "warning";
export const errorIcon = "error";
export const successIcon = "success";

//Audios
export const successAudio = "success";
export const errorAudio = "error";
export const warningAudio = "warning";
export const victoryAudio = "victory";
export const hintAudio = "hint";

//Tipos de ejercicios
export const words = "words";
export const ids = "ids";
export const wordsAndIds = "words and ids";
export const drag = "drag";
export const category = "category";

//Tipos de ejercicios de cada game
export const exercise1Type = wordsAndIds;
export const exercise1sub1Type = words;
export const exercise1sub2Type = ids;
export const exercise2Type = wordsAndIds;
export const exercise2sub1Type = words;
export const exercise2sub2Type = ids;
export const exercise3Type = ids;
export const exercise4Type = ids;
export const exercise5Type = drag;
export const exercise6Type = words;
export const exercise7Type = words;
export const exercise8Type = words;
export const exercise9Type = category;
export const exercise10Type = words;
export const exercise11Type = words;
export const exercise12Type = words;
export const exercise13Type = words;
export const exercise14Type = ids;

//Tiempos espera
export const showExerciseTime = 2000;
export const showCorrectIncorrectTime = 2000;

//Actions

export const actionFinishCorrect = "finish correct";
export const actionFinishIncorrect = "finish failure";
export const actionShowExercise = "show";
export const actionStartReading = "start reading";
//export const actionFinishReading = "finish reading";
export const actionFinishExercise = "finish exercise";
export const actionStartInteracting = "start interacting";

//Exercise
export const exercise1sub1State = completeWords;
export const exercise1sub2State = completeIds;
export const exercise2sub1State = completeWords;
export const exercise2sub2State = completeIds;
export const exercise3State = completeIds;
export const exercise4State = completeIds;
export const exercise5State = draggable;
export const exercise6State = showIdsCompleteWords;
export const exercise7State = showIdsCompleteWords;
export const exercise8State = buttons;
export const exercise9State = showWordsCompleteCategories;
export const exercise10State = showIdsShowWordsCompleteWords;
export const exercise11State = showIdsShowWordsCompleteWords;
export const exercise12State = showIdsShowWordsCompleteWords;
export const exercise13State = showIdsCompleteWords;
export const exercise14State = showWordsCompleteIds;

//El ejercicio tiene ayuda?
export const exercise1sub1Help = true;
export const exercise1sub2Help = false;
export const exercise2sub1Help = true;
export const exercise2sub2Help = false;
export const exercise3Help = false;
export const exercise4Help = false;
export const exercise5Help = false;
export const exercise6Help = true;
export const exercise7Help = true;
export const exercise8Help = false;
export const exercise9Help = true;
export const exercise10Help = true;
export const exercise11Help = true;
export const exercise12Help = true;
export const exercise13Help = true;
export const exercise14Help = false;

//Quadrante de espera antes de pasar a la transicion de correcto/incorrecto
export const exercise1sub1WaitingQuadrant = showWrongAnswer;
export const exercise1sub1FinalWaitingQuadrant = showWrongAnswer;
export const exercise1sub2WaitingQuadrant = showWrongAnswer;
export const exercise1sub2FinalWaitingQuadrant = showWrongAnswer;
export const exercise2sub1WaitingQuadrant = showWrongAnswer;
export const exercise2sub1FinalWaitingQuadrant = showWrongAnswer;
export const exercise2sub2WaitingQuadrant = showWrongAnswer;
export const exercise2sub2FinalWaitingQuadrant = showWrongAnswer;
export const exercise3WaitingQuadrant = showWrongAnswer;
export const exercise3FinalWaitingQuadrant = showWrongAnswer;
export const exercise4WaitingQuadrant = showWrongAnswer;
export const exercise4FinalWaitingQuadrant = showWrongAnswer;
export const exercise5WaitingQuadrant = highlightWrongValues;
export const exercise5FinalWaitingQuadrant = highlightWrongValues;
export const exercise6WaitingQuadrant = exercise6State;
export const exercise6FinalWaitingQuadrant = showWrongAnswer;
export const exercise7WaitingQuadrant = exercise7State;
export const exercise7FinalWaitingQuadrant = showWrongAnswer;
export const exercise8WaitingQuadrant = exercise8State;
export const exercise8FinalWaitingQuadrant = showWrongAnswer;
export const exercise9WaitingQuadrant = exercise9State;
export const exercise9FinalWaitingQuadrant = showWrongAnswer;
export const exercise10WaitingQuadrant = exercise10State;
export const exercise10FinalWaitingQuadrant = showWrongAnswer;
export const exercise11WaitingQuadrant = exercise11State;
export const exercise11FinalWaitingQuadrant = highlightWrongAnswer;
export const exercise12WaitingQuadrant = exercise12State;
export const exercise12FinalWaitingQuadrant = highlightWrongAnswer;
export const exercise13WaitingQuadrant = exercise13State;
export const exercise13FinalWaitingQuadrant = highlightWrongAnswer;
export const exercise14WaitingQuadrant = exercise14State;
export const exercise14FinalWaitingQuadrant = showWrongAnswer;

//El juego tiene pantalla intermedia?
export const exercise1sub1HasIntermediateScreen = true;
export const exercise1sub2HasIntermediateScreen = false;
export const exercise2sub1HasIntermediateScreen = true;
export const exercise2sub2HasIntermediateScreen = false;
export const exercise3HasIntermediateScreen = false;
export const exercise4HasIntermediateScreen = false;
export const exercise5HasIntermediateScreen = false;
export const exercise6HasIntermediateScreen = false;
export const exercise7HasIntermediateScreen = false;
export const exercise8HasIntermediateScreen = false;
export const exercise9HasIntermediateScreen = false;
export const exercise10HasIntermediateScreen = true;
export const exercise11HasIntermediateScreen = true;
export const exercise12HasIntermediateScreen = true;
export const exercise13HasIntermediateScreen = false;
export const exercise14HasIntermediateScreen = false;

//Pantalla intermedia de los ejercicios
export const exercise1sub1IntermediateScreen = showWordsAndIds;
export const exercise2sub1IntermediateScreen = showWordsAndIds;
export const exercise10IntermediateScreen = showAll;
export const exercise11IntermediateScreen = showAll;
export const exercise12IntermediateScreen = showAll;

//Pantalla siguiente de ejercicios que muestran la solucion y hay que poner siguiente
export const exercise1sub1StateAfterShow = completeWords;
export const exercise1sub2StateAfterShow = completeIds;
export const exercise2sub1StateAfterShow = completeWords;
export const exercise2sub2StateAfterShow = completeIds;
export const exercise10StateAfterShow = showIdsShowWordsCompleteWords;
export const exercise11StateAfterShow = showIdsShowWordsCompleteWords;
export const exercise12StateAfterShow = showIdsShowWordsCompleteWords;

//Explicaciones de los ejercicios
export const explanationIdEx1sub1 = 0;
export const explanationIdEx1sub2 = 1;
export const explanationIdEx2sub1 = 2;
export const explanationIdEx2sub2 = 3;
export const explanationIdEx3 = 4;
export const explanationIdEx4 = 5;
export const explanationIdEx5 = 6;
export const explanationIdEx6 = 7;
export const explanationIdEx7 = 8;
export const explanationIdEx8 = 9;
export const explanationIdEx9 = 10;
export const explanationIdEx10 = 11;
export const explanationIdEx11 = 12;
export const explanationIdEx12 = 13;
export const explanationIdEx13 = 14;
export const explanationIdEx14 = 15;

//Limite de intentos para escribir un id
export const limitBlocking = 3;
