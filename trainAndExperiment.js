const numerosEnPalabras = {
  21: "veintiuno",
  22: "veintid\u00F3s",
  23: "veintitres",
  24: "veinticuatro",
  25: "veinticinco",
  26: "veintiseis",
  27: "veintisiete",
  28: "veintiocho",
  29: "veintinueve",
  30: "treinta",
  31: "treinta y uno",
  32: "treinta y dos",
  33: "treinta y tres",
  34: "treinta y cuatro",
  35: "treinta y cinco",
  36: "treinta y seis",
  37: "treinta y siete",
  38: "treinta y ocho",
  39: "treinta y nueve",
  40: "cuarenta",
  41: "cuarenta y uno",
  42: "cuarenta y dos",
  43: "cuarenta y tres",
  44: "cuarenta y cuatro",
  46: "cuarenta y seis",
  47: "cuarenta y siete",
  48: "cuarenta y ocho",
  49: "cuarenta y nueve",
  50: "cincuenta",
  51: "cincuenta y uno",
  52: "cincuenta y dos",
  53: "cincuenta y tres",
  54: "cincuenta y cuatro",
  55: "cincuenta y cinco",
  56: "cincuenta y seis",
  57: "cincuenta y siete",
  58: "cincuenta y ocho",
  59: "cincuenta y nueve",
  60: "sesenta",
  61: "sesenta y uno",
  62: "sesenta y dos",
  63: "sesenta y tres",
  64: "sesenta y cuatro",
  65: "sesenta y cinco",
  66: "sesenta y seis",
  67: "sesenta y siete",
  68: "sesenta y ocho",
  69: "sesenta y nueve",
};

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

var all_choices = ['j','k','a','s'];
var number_time_on_screen = 150;
const fixation_font_size = 100;
const digit_font_size = 40;

/* initialize jsPsych */
var jsPsych = initJsPsych({
  // show_progress_bar: true,
  on_finish: function() {
    jsPsych.data.displayData();
  }
});


/* preload audios */
var preload_files = {
  type: jsPsychPreload,
  audio: ['tones/440hz_short.mp3', 'tones/880hz_short.mp3'],
  images: ['img/hand.png'],
};

var instructionsMessage = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h3>Instrucciones del Experimento:</h3>
    <ol style="text-align: left;">
        <li>Vas a realizar un experimento de <strong>dos tareas simult\u00E1neas</strong>. Tendr\u00E1s que responder utilizando el teclado con las dos manos.</li>
        <li>A continuaci\u00F3n describiremos las tareas. No te preocupes, luego de eso vas a tener unos minutos de prueba para familiarizarte con ellas.</li>
        <li>
            <p>Tarea 1: Discriminaci\u00F3n de Tonos <strong>(mano izquierda)</strong></p>
            <ul><li>Escuchar\u00E1s un tono breve.</li>
                <li>Tu objetivo es determinar si la frecuencia del tono es alta o baja.</li>
                <li>Pulsa 'A' si crees que es un tono de baja frecuencia o 'S' si crees que es un tono de alta frecuencia.</li>
            </ul>
        </li>
        <li>
            <p>Tarea 2: Comparaci\u00F3n de N\u00FAmeros <strong>(mano derecha)</strong></p>
            <ul>
                <li>Simult\u00E1neamente o luego de un per\u00EDodo de la presentaci\u00F3n del tono, aparecer\u00E1 un n\u00FAmero en la pantalla.</li>
                <li>Tu objetivo es decidir si el d\u00EDgito mostrado es mayor o menor que el n\u00FAmero 45.</li>
                <li>Pulsa 'J' si el d\u00EDgito es menor que 45 y 'K' si es mayor que 45.</li>
            </ul>
        </li>
        <li><strong>Realiza ambas tareas lo m\u00E1s r\u00E1pido y precisamente posible.</strong></li>
        <li>Repetir\u00E1s estas tareas varias veces durante el experimento.</li>
    </ol>
    <img src="img/hand.png" width="600" height="350"></img>
  `,
  choices: ['Continuar']
};

var changeDigitToWordsMessage = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h1> Muy bien </h1>
  <p> Ahora, en vez de ser presentados en d\u00EDgitos, los n\u00FAmeros vendr\u00E1n escritos en palabras. </p>
  <p> Por ejemplo, en vez de 44 te aparecer\u00E1 "cuarenta y cuatro". </p>
  <p> \u00BFEst\u00E1s listo? </p>
  `,
  choices: ['Continuar']
}


var endTrainingMessage = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h1> Fin del Entrenamiento </h1>
  <p> \u00A1Felicitaciones, terminaste el entrenamiento! Ahora vamos a comenzar con el experimento. </p>
  <p> Record\u00E1 que ten\u00E9s que responder lo m\u00E1s r\u00E1pido que puedas, pero sin equivocarte. </p>
  <p> Si al finalizar el experimento no est\u00E1s conforme con tus respuestas, vas a tener la oportunidad de repetirlo. </p>
  `,
  choices: ['Continuar']
}

var tryAgainMessage = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h1> Mmm </h1>
  <p> Respondiste a alguno de los est\u00EDmulos de manera incorrecta. Por favor, repas\u00E1 las instrucciones y seguimos desde donde nos quedamos. </p>
  `,
  choices: ['Continuar']
}

var endExperimentMessage = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h1> Fin del Experimento </h1>
  <p> \u00A1Felicitaciones, terminaste el experimento! </p>
  <p> Muchas gracias por participar. </p>
  `,
  choices: ['Finalizar']
}

var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div style="font-size:${fixation_font_size}px;">X</div>`,
  choices: "NO_KEYS",
  trial_duration: jsPsych.randomization.randomInt(2600, 3000),
  data: {
    task: 'fixation'
  }
};


function getLastBlockData(){
  return jsPsych.data.get().last(1).values()[0];
}

function getDataTwoBlocksBefore(){
  return jsPsych.data.get().last(2).values()[0];
}

function fromWordsToDigits(numberInWords){
  return Object.keys(numerosEnPalabras).find(key => numerosEnPalabras[key] === numberInWords);
}


function choose_random_digit_number(){
  return jsPsych.randomization.sampleWithoutReplacement(Object.keys(numerosEnPalabras), 1)[0];
}

function choose_random_word_number(){
  return jsPsych.randomization.sampleWithoutReplacement(Object.values(numerosEnPalabras), 1)[0];
}

function choose_random_tone(){
  return jsPsych.randomization.shuffle(['tones/440hz_short.mp3', 'tones/880hz_short.mp3'])[0];
}

function check_answer(data){
  let stimulus = data.stimulus;
  let number = data.number;
  let response = data.response;

  if (number.length > 3) {
    number = fromWordsToDigits(number);
  }

  if (response == null) return true;

  if (response == "a"){
    return stimulus == "tones/440hz_short.mp3";
  }
  if (response == "s"){
    return stimulus == "tones/880hz_short.mp3";
  }
  if (response == "j"){
    return number < 45;
  }
  if (response == "k"){
    return number > 45;
  }
  return false;
}


// Function to create a random trial
function create_random_tone_number_task(training = false, is_word = false, delay) {
  if (delay == null) delay = jsPsych.randomization.randomInt(0, 1025);

  let number = null;
  if (!is_word) {
    number = choose_random_digit_number();
  } else {
    number = choose_random_word_number();
  }

  let audioFile = choose_random_tone();
    
  var tone_number_task = { 
    type: jsPsychAudioKeyboardResponse,
    stimulus: audioFile,
    prompt: `<p id="prompt" style="visibility:hidden;font-size:${digit_font_size}px;">${number}</p>`,
    choices: all_choices,
    on_load: function() {
      setTimeout(function() {
        if (document.getElementById('prompt') != null){
          document.getElementById('prompt').style.visibility = "visible";
        }
      }, delay); // delay before showing the number
    },
    trial_duration: delay + number_time_on_screen, // total trial duration
    response_ends_trial: true,  // if the participant press a key, the trial ends
    data: {
      task: 'tone_number_task',
      delay: delay,
      stimulus: audioFile,
      number: number,
      audioFile: audioFile,
      trial_duration: delay + number_time_on_screen
    },
    on_finish:function(data){
      if (!training) return;
      let check = check_answer(data);
      jsPsych.data.addProperties({check: check});
      console.log(check);
      console.log(data);
    }
  };

  return tone_number_task;
}


function create_tone_number_task_remaining_before_delay(training = false) {
  var _delay_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
    choices: "NO_KEYS", // important: this is to avoid the participant to press a key before the number is shown
    trial_duration: function () {return getLastBlockData().delay - getLastBlockData().rt;},  
    data: {
      task: 'delay_block'
    }
  };

  var tone_number_task_remaining_before_delay = {
    type: jsPsychHtmlKeyboardResponse,
    // important: we are using the data of the trial 2 blocks before (the one with the tone and the number)
    stimulus: function () {return `<p id="stimulus" style="font-size:${digit_font_size}px;">${getDataTwoBlocksBefore().number}</p>`},
    choices: all_choices, 
    trial_duration: number_time_on_screen,  
    response_ends_trial: false,
    data: {
      task: 'tone_number_task_remaining_before_delay',
      stimulus: function () {return `<p id="stimulus" style="font-size:${digit_font_size}px;">${getDataTwoBlocksBefore().number}</p>`},
      number: function () {return getDataTwoBlocksBefore().number},
      trial_duration: function () {return getDataTwoBlocksBefore().delay - getDataTwoBlocksBefore().rt + number_time_on_screen;},
      audioFile: ''
    },
    on_finish:function(data){
      if (!training) return;
      let check = getDataTwoBlocksBefore().check && check_answer(data);
      jsPsych.data.addProperties({check: check});
      console.log(check);
      console.log(data);
    }
  };
  return [_delay_block, tone_number_task_remaining_before_delay];
}

function tone_number_task_remaining_after_delay(training = false) {
  // bug: faltaba agregar el number en la data de aca
  var tone_number_task_remaining_after_delay = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return `<p id="stimulus" style="font-size:${digit_font_size}px;">${getLastBlockData().number}</p>`},
    choices: all_choices, 
    trial_duration: function () {return getLastBlockData().trial_duration-getLastBlockData().rt;},  
    response_ends_trial: false,
    data: {
      number: function () {return getLastBlockData().number},
      task: 'tone_number_task_remaining_after_delay',
    },
    on_finish:function(data){
      if (!training) return;
      let check = getLastBlockData().check && check_answer(data);
      jsPsych.data.addProperties({check: check});
      console.log(check);
      console.log(data);
    }
  }
  return tone_number_task_remaining_after_delay;
}


function create_empty_block(training = false){
  var empty_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "",
    choices: all_choices,
    // outliers: trials in which the RTs to the first task were larger than 1,200 ms
    trial_duration: function () {
      if (training) return 10000; // si estamos en training no importan los outliers.
      return 1200;
    },
    response_ends_trial: true,
    data: {
      task: 'empty_block',
      number: function () {return getLastBlockData().number},
      stimulus: function () {return getLastBlockData().stimulus},
    },
    // at end check if the answer was correct
    on_finish:function(data){
      if (!training) return;
      let check = getLastBlockData().check && check_answer(data);
      jsPsych.data.addProperties({check: check});
      console.log(check);
      console.log(data);
    }
  }
  return empty_block;
}


function if_before_delay(training = false){
  var if_before_delay_block = {
    timeline: create_tone_number_task_remaining_before_delay(training),
    conditional_function: function(){
      let lastBlockData = getLastBlockData();
      if (lastBlockData.rt == null) return false; 
      return (lastBlockData.rt <= lastBlockData.delay);
    }
  }
  return if_before_delay_block;
}

function if_after_delay(training = false){
  var if_after_delay_block = {
    timeline: [tone_number_task_remaining_after_delay(training)], // al final un chequeo de respuesta de numero
    conditional_function: function(){
      let lastBlockData = getLastBlockData();
      if (lastBlockData.rt == null) return false; 
      return (  lastBlockData.rt > lastBlockData.delay && 
                lastBlockData.rt <= lastBlockData.trial_duration);
    }
  }
  return if_after_delay_block;
}

function if_remaining_block_was_not_shown(training = false){
  var if_remaining_block_was_NOT_shown = {
    timeline: [create_empty_block(training), create_empty_block(training)], // entre medio un chequeo de respuesta de tono y al final un chequeo de respuesta de numero
    conditional_function: function(){
      let lastBlockData = getLastBlockData();
      return (lastBlockData.task == "tone_number_task");
    }
  }
  return if_remaining_block_was_NOT_shown;
}

function if_remaining_block_was_shown_and_not_interrupted(training = false){
  var if_remaining_block_was_showned_and_NOT_interrupted = {
    timeline: [create_empty_block(training)], // al final un chequeo de respuesta de numero
    conditional_function: function(){
      if (getLastBlockData().task != "tone_number_task_remaining_before_delay" && getLastBlockData().task != "tone_number_task_remaining_after_delay") return false;
      return getLastBlockData().rt == null;
    }
  }
  return if_remaining_block_was_showned_and_NOT_interrupted;
}

function create_digit_block_with_instructions() {
  let timeline = [];
  for (let i = 0; i < 2; i++) { // DIGIT BLOCK WITH INSTRUCTIONS (2)
    timeline.push(instructionsMessage);
    //timeline.push(instructions_digit);
    for (let i = 0; i < 2; i++) { // DIGIT BLOCK (40)
      timeline.push(fixation);
      timeline.push(create_random_tone_number_task(training=false, is_word=false));
      timeline.push(if_before_delay());
      timeline.push(if_after_delay()); 
      timeline.push(if_remaining_block_was_not_shown()); 
      timeline.push(if_remaining_block_was_shown_and_not_interrupted());
    }
  }
  return timeline;
}

function create_word_block_with_instructions() {
  let timeline = [];
  for (let i = 0; i < 2; i++) { // WORD BLOCK WITH INSTRUCTIONS (2)
    timeline.push(instructionsMessage);
    //timeline.push(instructions_word);
    for (let i = 0; i < 2; i++) { // WORD BLOCK (40)
      timeline.push(fixation);
      timeline.push(create_random_tone_number_task(training=false, is_word=true));
      timeline.push(if_before_delay());
      timeline.push(if_after_delay()); 
      timeline.push(if_remaining_block_was_not_shown()); 
      timeline.push(if_remaining_block_was_shown_and_not_interrupted());
    }
  }
  return timeline;
}

function create_training_block(words, delay) {
  return [
    fixation,
    create_random_tone_number_task(training=true, words, delay),
    if_before_delay(training=true), 
    if_after_delay(training=true),
    if_remaining_block_was_not_shown(training=true),
    if_remaining_block_was_shown_and_not_interrupted(training=true),
  ]
}

function check_answer_of_last_5_blocks(){
    let last_check = true; 
    let lastFiveBlocks = jsPsych.data.get().last(5).values();
    let blocksWithPossibleAnswers = ["tone_number_task_remaining_before_delay", "tone_number_task_remaining_after_delay", "empty_block"];

    for (let i = 4; i >= 0; i--) { 
      let block_i = lastFiveBlocks[i];
      if ('task' in block_i) {
        if (blocksWithPossibleAnswers.includes(block_i.task)){
          last_check = block_i.check;
          break;
        }
      }
    }
    return last_check;
}



// Estos dos bloques van a estar en loop.
var if_feedback_train = {
  timeline: [tryAgainMessage, instructionsMessage],
  conditional_function: () => !check_answer_of_last_5_blocks()
}

function create_main_inner_loop(words, delay){
  var main_inner_loop = {
    timeline: create_training_block(words, delay).concat([if_feedback_train]),
    loop_function: () => !check_answer_of_last_5_blocks()
  }
  return main_inner_loop;
}

// Este bloque lo puse porque sino había unos llamados recursivos para repetir los entrenamientos que no funcionaban.
function if_feedback_train_2(words, delay) {
  var if_feedback_train_2 = {
    timeline: [tryAgainMessage, instructionsMessage].concat(create_main_inner_loop(words, delay)),
    conditional_function: () => !check_answer_of_last_5_blocks()
  }
  return if_feedback_train_2;
}





function create_main_loop(){
  let delaysToUse = [1000, 500, 300, 150, 50];
  let timeline = [];
  
  timeline.push(instructionsMessage);

  for (let i = 0; i < delaysToUse.length; i++) {
    timeline.push(create_main_inner_loop(words=false, delay=delaysToUse[i]));
    timeline.push(if_feedback_train_2(words=false, delay=delaysToUse[i]));
  }

  timeline.push(changeDigitToWordsMessage);

  for (let i = 0; i < delaysToUse.length; i++) {
    timeline.push(create_main_inner_loop(words=true, delay=delaysToUse[i]));
    timeline.push(if_feedback_train_2(words=true, delay=delaysToUse[i]));
  }

  timeline.push(endTrainingMessage);
  return timeline;
}

/* create timeline */
var timeline = [];
timeline.push(preload_files);

timeline = timeline.concat(create_main_loop());
timeline = timeline.concat(create_digit_block_with_instructions());
timeline = timeline.concat(create_word_block_with_instructions());
timeline.push(endExperimentMessage);

/* start the experiment */
jsPsych.run(timeline);