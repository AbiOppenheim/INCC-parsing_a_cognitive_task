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

var instructions = {
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


var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div style="font-size:${fixation_font_size}px;">X</div>`,
  choices: "NO_KEYS",
  trial_duration: jsPsych.randomization.randomInt(2600, 3000),
  data: {
    task: 'fixation'
  }
};

// Function to create a random trial
function create_random_tone_number_task_training(is_word = false, delay) {
  let number = null;
  if (!is_word) {
    number = jsPsych.randomization.sampleWithoutReplacement(Object.keys(numerosEnPalabras), 1)[0];
  } else {
    number = jsPsych.randomization.sampleWithoutReplacement(Object.values(numerosEnPalabras), 1)[0];
  }
  let audioFile = jsPsych.randomization.shuffle(['tones/440hz_short.mp3', 'tones/880hz_short.mp3'])[0];
    
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
      let check = check_answer(data);
      jsPsych.data.addProperties({check: check});
    }
  };

  return tone_number_task;
}

function getLastBlockData(){
  return jsPsych.data.get().last(1).values()[0];
}

function getDataTwoBlocksBefore(){
  return jsPsych.data.get().last(2).values()[0];
}

function create_tone_number_task_remaining_before_delay() {
  
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
      let check = getDataTwoBlocksBefore().check && check_answer(data);
      jsPsych.data.addProperties({check: check});
    }
  };
  return [_delay_block, tone_number_task_remaining_before_delay];
}

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
    let check = getLastBlockData().check && check_answer(data);
    jsPsych.data.addProperties({check: check});
  }
};



function check_answer(data){
  let stimulus = data.stimulus;
  let number = data.number;
  let response = data.response;

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

var empty_block = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "",
  choices: all_choices,
   // outliers: trials in which the RTs to the first task were larger than 1,200 m
  trial_duration: 5000, // Lo seteo en 5000 porque pasaba que si no llegabas a responder checkAnswer() daba False y cagaba todo.
  response_ends_trial: true,
  data: {
    task: 'empty_block',
    number: function () {return getLastBlockData().number},
    stimulus: function () {return getLastBlockData().stimulus},
  },
  // at end check if the answer was correct
  on_finish:function(data){
    let check = getLastBlockData().check && check_answer(data);
    jsPsych.data.addProperties({check: check});
  }
};



var if_before_delay_block = {
  timeline: create_tone_number_task_remaining_before_delay(),
  conditional_function: function(){
    let lastBlockData = getLastBlockData();
    if (lastBlockData.rt == null) return false; 
    return (lastBlockData.rt <= lastBlockData.delay);
  }
}

var if_after_delay_block = {
  timeline: [tone_number_task_remaining_after_delay], // al final un chequeo de respuesta de numero
  conditional_function: function(){
    let lastBlockData = getLastBlockData();
    if (lastBlockData.rt == null) return false; 
    return (  lastBlockData.rt > lastBlockData.delay && 
              lastBlockData.rt <= lastBlockData.trial_duration);
  }
}


var if_remaining_block_was_NOT_showned = {
  timeline: [empty_block, empty_block], // entre medio un chequeo de respuesta de tono y al final un chequeo de respuesta de numero
  conditional_function: function(){
    let lastBlockData = getLastBlockData();
    return (lastBlockData.task == "tone_number_task");
  }
}

var if_remaining_block_was_showned_and_NOT_interrupted = {
  timeline: [empty_block], // al final un chequeo de respuesta de numero
  conditional_function: function(){
    if (getLastBlockData().task != "tone_number_task_remaining_before_delay" && getLastBlockData().task != "tone_number_task_remaining_after_delay") return false;
    return getLastBlockData().rt == null;
    // chequear que respuesta de tono fue la correcta
  }
}


function create_training_block(words, delay) {
  return [
    fixation,
    create_random_tone_number_task_training(words, delay),
    if_before_delay_block, 
    if_after_delay_block,
    if_remaining_block_was_NOT_showned,
    if_remaining_block_was_showned_and_NOT_interrupted,
  ]
}

// var feedback_train = {
//   timeline: create_training_block(),
// }

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

var tryAgain = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h1> Mmm </h1>
  <p> Respondiste a alguno de los est\u00EDmulos de manera incorrecta. Por favor, repas\u00E1 las instrucciones y seguimos desde donde nos quedamos. </p>
  `,
  choices: ['Continuar']
}

// Estos dos bloques van a estar en loop.
var if_feedback_train = {
  timeline: [tryAgain, instructions],
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
    timeline: [tryAgain, instructions].concat(create_main_inner_loop(words, delay)),
    conditional_function: () => !check_answer_of_last_5_blocks()
  }
  return if_feedback_train_2;
}



var cambiamosDeDigitosAPalabras = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h1> Muy bien </h1>
  <p> Ahora, en vez de ser presentados en d\u00EDgitos, los n\u00FAmeros vendr\u00E1n escritos en palabras. </p>
  <p> Por ejemplo, en vez de 44 te aparecer\u00E1 "cuarenta y cuatro". </p>
  <p> \u00BFEst\u00E1s listo? </p>
  `,
  choices: ['Continuar']
}


var finEntrenamiento = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h1> Fin del Entrenamiento </h1>
  <p> \u00A1Felicitaciones, terminaste el entrenamiento! Ahora vamos a comenzar con el experimento. </p>
  <p> Record\u00E1 que ten\u00E9s que responder lo m\u00E1s r\u00E1pido que puedas, pero sin equivocarte. </p>
  <p> Si al finalizar el experimento no est\u00E1s conforme con tus respuestas, vas a tener la oportunidad de repetirlo. </p>
  `,
  choices: ['Continuar']
}

function create_main_loop(){
  let delaysToUse = [1000, 500, 300, 150, 50];
  let timeline = [];
  
  timeline.push(instructions);

  for (let i = 0; i < delaysToUse.length; i++) {
    timeline.push(create_main_inner_loop(false, delaysToUse[i]));
    timeline.push(if_feedback_train_2(false, delaysToUse[i]));
  }

  timeline.push(cambiamosDeDigitosAPalabras);

  for (let i = 0; i < delaysToUse.length; i++) {
    timeline.push(create_main_inner_loop(true, delaysToUse[i]));
    timeline.push(if_feedback_train_2(true, delaysToUse[i]));
  }

  timeline.push(finEntrenamiento);
  return timeline;
}

/* create timeline */
var timeline = [];
timeline.push(preload_files);

timeline = timeline.concat(create_main_loop());


/* start the experiment */
jsPsych.run(timeline);