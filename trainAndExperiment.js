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

var all_choices = ['j','k','a','z'];
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

var intro_1 = { // FULLSIZE BLOCK: SPECIAL TYPE 
  type: jsPsychFullscreen,
  message: '<p style="font-size: 24px; color: blue;">¡Te damos la bienvenida al experimento!</p><br><p>(La página se colocará en modo pantalla completa durante todo el experimento)</p>',
  button_label:'Continuar',
  fullscreen_mode: true
}


// var intro_1 = {
//   type: jsPsychHtmlButtonResponse,
//   stimulus: '<p style="font-size:24px; color:red;">¡Bienvenidx al experimento!</p>',
//   choices: ['Continuar'],
// };

var intro_2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<p style="font-size:24px; color:red;">Cosas importantes a tener en cuenta antes de comenzar el experimento:</p>',
  choices: ['Continuar'],
};


var intro_3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<p style="font-size:24px;">El experimento dura aproximadamente 15 minutos.</p><p style="font-size:24px;">Por favor, no cierres la ventana del navegador durante el experimento.</p><p style="font-size:24px;">Si se completa de forma parcial, no se guardará ningún resultado.</p>',
  choices: ['Tengo 15 minutos disponibles.'],
};

var intro_4 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<p style="font-size:24px;">El experimento contiene estímulos sonoros.</p>',
  choices: ['Tengo parlantes o auriculares disponibles para realizar el experimento.'],
};


var survey_1 = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p>¿Cuantos años tenés?</p>',
  html: '<p>Tengo <input type="text" id="test-resp-box" name="response" size="10"> años</p>',
  autofocus: 'test-resp-box'
};


var survey_2 = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "Ingrese su género", 
      name: 'gender', 
      options: ['Mujer', 'Hombre', 'Otrx', 'Prefiero no decir'], 
      required: true,
      horizontal: true
    }, 
    {
      prompt: "Ingrese la mano que utiliza para escribir", 
      name: 'hand', 
      options: ['Izquierda', 'Derecha'], 
      required: true,
      horizontal: true
    }
  ],
};

const instances = {
  0: "Recordamos las instrucciones antes de comenzar el primer experimento con dígitos",
  1: "Recordamos las instrucciones antes de comenzar el último experimento con dígitos",
  2: "Recordamos las instrucciones antes de comenzar el primer experimento con palabras",
  3: "Recordamos las instrucciones antes de comenzar el último experimento con palabras",
  4: "Instrucciones"
}

const instances2 = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "No te preocupes, lo que le sigue es una prueba de entrenamiento para que te familiarices con las tareas.",
}

// Function to play audio
function playAudio(audioFile) {
  var audio = new Audio(audioFile);
  audio.play();
}

function showInstructionsMessage(insance){
  // if insance is none, instane = 4
  if (insance == null) insance = 4;

  var instructionsMessage = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <style>
    .button-3 {
      appearance: none;
      background-color: #2ea44f;
      border: 1px solid rgba(27, 31, 35, .15);
      border-radius: 6px;
      box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      padding: 6px 16px;
      position: relative;
      text-align: center;
      text-decoration: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      vertical-align: middle;
      white-space: nowrap;
    }

    .button-3:focus:not(:focus-visible):not(.focus-visible) {
      box-shadow: none;
      outline: none;
    }

    .button-3:hover {
      background-color: #2c974b;
    }

    .button-3:focus {
      box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
      outline: none;
    }

    .button-3:disabled {
      background-color: #94d3a2;
      border-color: rgba(27, 31, 35, .1);
      color: rgba(255, 255, 255, .8);
      cursor: default;
    }

    .button-3:active {
      background-color: #298e46;
      box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
    }
  </style>
      <h3>${instances[insance]}</h1>
      <ul style="text-align: left;">
        <li>Vas a realizar un experimento de <strong>dos tareas simultáneas</strong>. Tendrás que responder utilizando el teclado con las dos manos.</li>
        <li>A continuación describiremos las tareas. ${instances2[insance]}</li>
        <li>
          Tarea 1: Discriminación de Tonos <strong>(mano izquierda)</strong>
          <ul>
            <li>Escucharás un tono breve.</li>
            <li>Tu objetivo es determinar si el tono es de <button class="button-3" role="button" onclick="playAudio('tones/440hz_short.mp3')">baja Frecuencia</button> o <button class="button-3" role="button"  onclick="playAudio('tones/880hz_short.mp3')">alta Frecuencia</button>.</li>
            <li>Pulsa 'A' si crees que es un tono de baja frecuencia o 'S' si crees que es un tono de alta frecuencia.</li>
          </ul>
        </li>
        <li>
          Tarea 2: Comparación de Números <strong>(mano derecha)</strong>
          <ul>
            <li>Simultáneamente o luego de un período de la presentación del tono, aparecerá un número en la pantalla.</li>
            <li>Tu objetivo es decidir si el dígito mostrado es mayor o menor que el número 45.</li>
            <li>Pulsa 'J' si el dígito es menor que 45 y 'K' si es mayor que 45.</li>
          </ul>
        </li>
        <li><strong>Realiza ambas tareas lo más rápido y precisamente posible.</strong></li>
        <li>Repetirás estas tareas varias veces durante el experimento.</li>
      </ul>
      <img src="img/hand.png"></img>
    `,
    choices: ['Continuar']
  };
  return instructionsMessage;
}



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


var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
}
var endExperimentMessage = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>¡Terminaste el experimento! Muchísimas gracias por participar :)</p>
    <p>Si te interesa saber de que se trata lo que acabaste de hacer, podes hacer click <a href="https://abioppenheim.github.io/INCC-parsing_a_cognitive_task/">aquí.</a></p>`,
  choices: "NO_KEYS"
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
    return stimulus == "tones/880hz_short.mp3";
  }
  if (response == "z"){
    return stimulus == "tones/440hz_short.mp3";
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
    timeline.push(showInstructionsMessage(i));
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
    timeline.push(showInstructionsMessage(i+2));
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
  timeline: [tryAgainMessage, showInstructionsMessage()],
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
    timeline: [tryAgainMessage, showInstructionsMessage()].concat(create_main_inner_loop(words, delay)),
    conditional_function: () => !check_answer_of_last_5_blocks()
  }
  return if_feedback_train_2;
}



function create_training_loop(){
  let delaysToUse = [1000, 500, 150, 50]; // elimino delay de 300
  let timeline = [];
  
  timeline.push(showInstructionsMessage());

  // for (let i = 0; i < delaysToUse.length; i++) {
  //   timeline.push(create_main_inner_loop(words=false, delay=delaysToUse[i]));
  //   timeline.push(if_feedback_train_2(words=false, delay=delaysToUse[i]));
  // }

  timeline.push(changeDigitToWordsMessage);

  // for (let i = 0; i < 1; i++) { // dejo solamente el delay de 1000
  //   timeline.push(create_main_inner_loop(words=true, delay=delaysToUse[i]));
  //   timeline.push(if_feedback_train_2(words=true, delay=delaysToUse[i]));
  // }

  timeline.push(endTrainingMessage);
  return timeline;
}

/* create timeline */
// var timeline = [];

// timeline.push(preload_files);

// timeline.push(intro_1);//, intro_2, intro_3, intro_4);
// timeline.push(survey_1, survey_2);

// timeline = timeline.concat(create_training_loop());
// timeline = timeline.concat(create_digit_block_with_instructions());
// timeline = timeline.concat(create_word_block_with_instructions());
// timeline.push(exit_fullscreen);
// timeline.push(endExperimentMessage);


/* start the experiment */
// jsPsych.run(timeline);
