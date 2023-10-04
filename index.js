const numerosEnPalabras = {
  21: "veintiuno",
  22: "veintidós",
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

/* create timeline */
var timeline = [];

// TODO:
// 1. agregar un mejor entrenamiento (mas parecido al experimento) con fixations
// 4. agregar los 4 bloques con instrucciones intermedias

/* preload audios */
var preload_files = {
  type: jsPsychPreload,
  audio: ['tones/440hz_short.mp3', 'tones/880hz_short.mp3'],
  images: ['img/hand.png'],
};
timeline.push(preload_files);


var intro_1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<p style="font-size:24px; color:red;">¡Bienvenidx al experimento!</p>',
  choices: ['Continuar'],
};

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
// timeline.push(intro_1, intro_2, intro_3, intro_4);

var survey_1 = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p>¿Cuántos años tenés?</p>',
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
// timeline.push(survey_1, survey_2);



var instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h1>Instrucciones del Experimento:</h1>
    <ol style="text-align: left;">
        <li>Vas a realizar un experimento de <strong>dos tareas simultáneas</strong>. Tendrás que responder utilizando el teclado con las dos manos.</li>
        <li>A continuación describiremos las tareas. No te preocupes, luego de eso vas a tener unos minutos de prueba para familiarizarte con ellas.</li>
        <li>
            <h4>Tarea 1: Discriminación de Tonos <strong>(mano izquierda)</strong></h4>
            <ul>
                <li>Escucharás un tono breve.</li>
                <li>Tu objetivo es determinar si la frecuencia del tono es alta o baja.</li>
                <li>Pulsa 'A' si crees que es un tono de baja frecuencia o 'S' si crees que es un tono de alta frecuencia.</li>
            </ul>
        </li>
        <li>
            <h4>Tarea 2: Comparación de Números <strong>(mano derecha)</strong></h4>
            <ul>
                <li>Simultáneamente o luego de un período de la presentación del tono, aparecerá un número en la pantalla.</li>
                <li>Tu objetivo es decidir si el dígito mostrado es mayor o menor que el número 45.</li>
                <li>Pulsa 'J' si el dígito es menor que 45 y 'K' si es mayor que 45.</li>
            </ul>
        </li>
        <li><strong>Realiza ambas tareas lo más rápido y precisamente posible.</strong></li>
        <li>Repetirás estas tareas varias veces durante el experimento.</li>
    </ol>
    <img src="img/hand.png"></img>
  `,
  choices: ['Continuar']
};
// timeline.push(instructions);

var instructions_word = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p>Atención: en las siguientes tareas los números serán presentados escritos con <strong>palabras</strong>.</p>

  <img src="img/hand.png"></img>
  `,
  choices: ['Continuar']
};

var instructions_digit = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p>Atención: en las siguientes tareas los números serán presentados escritos con <strong>dígitos</strong>.</p>

  <img src="img/hand.png"></img>
  `,
  choices: ['Continuar']
};

var train_1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<p style="font-size:24px; color:red;">A continuación se realizará un breve entrenamiento de las tareas que se realizarán en el experimento.</p>',
  choices: ['Continuar'],
};

var train_2 = {
  type: jsPsychAudioButtonResponse,
  stimulus: 'tones/440hz_short.mp3',
  choices: ['Repetir', 'Lo escucho (continuar)'],
  prompt: "<p>Acaba de sonar el tono de <strong>baja</strong> frecuencia. ¿Lo escuchaste?</p>",
};
var train_3 = {
  type: jsPsychAudioButtonResponse,
  stimulus: 'tones/880hz_short.mp3',
  choices: ['Repetir', 'Lo escucho (continuar)'],
  prompt: "<p>Acaba de sonar el tono de <strong>alta</strong> frecuencia. ¿Lo escuchaste?</p>",
};

var loop_train_2 = {
  timeline: [train_2],
  loop_function: function(data){

      if(jsPsych.data.get().last(1).values()[0].response == 0){
          return true;
      } else {
          return false;
      }
  }
}
var loop_train_3 = {
  timeline: [train_3],
  loop_function: function(data){

      if(jsPsych.data.get().last(1).values()[0].response == 0){
          return true;
      } else {
          return false;
      }
  }
}

var train_4 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p>A continuación comenzará el entrenamiento:</p>
  <p>Recuerda que vas a realizar un experimento de <strong>dos tareas simultáneas</strong>. Que tendrás que responder utilizando el teclado con las dos manos.</p>
    <img src="img/hand.png"></img>
  `,
  choices: ['Continuar']
};

var train_5 = { 
  type: jsPsychAudioKeyboardResponse,
  stimulus: 'tones/440hz_short.mp3',
  choices: all_choices,
  response_ends_trial: true,
  on_finish: function(data){
    // Score the response as correct or incorrect.
    if(jsPsych.pluginAPI.compareKeys(data.response, "a")){
      data.correct = true;
    } else {
      data.correct = false; 
    }
  }
};


var correction_train_5 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p style="font-size:24px; color:red;">Incorrecto</p>Este fué el tono de frecuencia baja.</p> 
  <p>Recuerda las instrucciones:</p>
  <img src="img/hand.png"></img>
  `,
  choices: ['Continuar']
};


var feedback_train_5 = {
  timeline: [correction_train_5, train_5],
  loop_function: function(data){
    console.log(jsPsych.data.get().last(1).values()[0].correct);
      return !jsPsych.data.get().last(1).values()[0].correct
  }
}

var if_feedback_train_5 = {
  timeline: [feedback_train_5],
  conditional_function: function(data){
    console.log(jsPsych.data.get().last(1).values()[0].correct);
      return !jsPsych.data.get().last(1).values()[0].correct
  }
}


var train_6 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p id="prompt" font-size:${digit_font_size}px;">25</p>`,
  choices: all_choices, 
  response_ends_trial: true,
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, "j")){
      data.correct = true;
    } else {
      data.correct = false; 
    }
  }
};


var correction_train_6 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p style="font-size:24px; color:red;">Incorrecto</p>El número es menor a 45.</p> 
  <p>Recuerda las instrucciones:</p>
  <img src="img/hand.png"></img>
  `,
  choices: ['Continuar']
};
var feedback_train_6 = {
  timeline: [correction_train_6, train_6],
  loop_function: function(data){
    console.log(jsPsych.data.get().last(1).values()[0].correct);
      return !jsPsych.data.get().last(1).values()[0].correct
  }
}

var if_feedback_train_6 = {
  timeline: [feedback_train_6],
  conditional_function: function(data){
    console.log(jsPsych.data.get().last(1).values()[0].correct);
      return !jsPsych.data.get().last(1).values()[0].correct
  }
}



// timeline.push(train_1, loop_train_2, loop_train_3, train_4, train_5, if_feedback_train_5, train_6, if_feedback_train_6);


var pre_experiment = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p>Ahora si comenzaremos el experimento.</p>
  <p>Muchas gracias por participar.</p>
  `,
  choices: ['Continuar']
};

timeline.push(pre_experiment);

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
function create_random_tone_number_task(is_word = false) {
  let delay = jsPsych.randomization.randomInt(0, 1025);
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
      number: number,
      audioFile: audioFile,
      trial_duration: delay + number_time_on_screen
    }
  };

  return tone_number_task;
}

function create_tone_number_task_remaining_before_delay() {
  
  var _delay_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
    choices: "NO_KEYS", // important: this is to avoid the participant to press a key before the number is shown
    trial_duration: function () {return jsPsych.data.get().last(1).values()[0].delay - jsPsych.data.get().last(1).values()[0].rt;},  
    data: {
      task: 'delay_block'
    }
  };

  var tone_number_task_remaining_before_delay = {
    type: jsPsychHtmlKeyboardResponse,
    // important: we are using the data of the trial 2 blocks before (the one with the tone and the number)
    // stimulus:"",
    // prompt:,
    stimulus: function () {return `<p id="stimulus" style="font-size:${digit_font_size}px;">${jsPsych.data.get().last(2).values()[0].number}</p>`},
    choices: all_choices, 
    trial_duration: number_time_on_screen,  
    response_ends_trial: false,
    data: {
      task: 'tone_number_task_remaining_before_delay',
      number: function () {return jsPsych.data.get().last(2).values()[0].number},
      trial_duration: function () {return jsPsych.data.get().last(2).values()[0].delay - jsPsych.data.get().last(2).values()[0].rt + number_time_on_screen;},
      audioFile: ''
    }
  };
  return [_delay_block, tone_number_task_remaining_before_delay];
}


var if_before_delay_block = {
  timeline: create_tone_number_task_remaining_before_delay(),
  conditional_function: function(){
    if (jsPsych.data.get().last(1).values()[0].rt == null) return false; 
    console.log(jsPsych.data.get().last(1).values()[0].rt <= jsPsych.data.get().last(1).values()[0].delay);
    return jsPsych.data.get().last(1).values()[0].rt <= jsPsych.data.get().last(1).values()[0].delay;
  }
}

var tone_number_task_remaining_after_delay = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return `<p id="stimulus" style="font-size:${digit_font_size}px;">${jsPsych.data.get().last(1).values()[0].number}</p>`},
    choices: all_choices, 
    trial_duration: function () {return jsPsych.data.get().last(1).values()[0].trial_duration-jsPsych.data.get().last(1).values()[0].rt;},  
    response_ends_trial: false,
    data: {
      task: 'tone_number_task_remaining_after_delay'
    },
};

var if_after_delay_block = {
  timeline: [tone_number_task_remaining_after_delay],
  conditional_function: function(){
    if (jsPsych.data.get().last(1).values()[0].rt == null) return false; 
    return jsPsych.data.get().last(1).values()[0].rt > jsPsych.data.get().last(1).values()[0].delay && jsPsych.data.get().last(1).values()[0].rt <= jsPsych.data.get().last(1).values()[0].trial_duration;
  }
}

var empty_block = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "",
  choices: all_choices, 
  // trial_duration: 1300,  // outliers: trials in which the RTs to the first task were larger than 1,200 m
  response_ends_trial: true,
  data: {
    task: 'empty_block'
  },
};

var if_remaining_block_was_NOT_showned = {
  timeline: [empty_block, empty_block],
  conditional_function: function(){
    return (jsPsych.data.get().last(1).values()[0].task == "tone_number_task");
  }
}

var if_remaining_block_was_showned_and_NOT_interrupted = {
  timeline: [empty_block],
  conditional_function: function(){
    if (jsPsych.data.get().last(1).values()[0].task != "tone_number_task_remaining_before_delay" && jsPsych.data.get().last(1).values()[0].task != "tone_number_task_remaining_after_delay") return false;
    return jsPsych.data.get().last(1).values()[0].rt == null;
  }
}


function create_digit_block_with_instructions() {
  for (let i = 0; i < 1; i++) { // DIGIT BLOCK WITH INSTRUCTIONS
    timeline.push(instructions_digit);
    for (let i = 0; i < 2; i++) { // DIGIT BLOCK
      timeline.push(fixation);
      timeline.push(create_random_tone_number_task(false));
      timeline.push(if_before_delay_block);
      timeline.push(if_after_delay_block); 
      timeline.push(if_remaining_block_was_NOT_showned); 
      timeline.push(if_remaining_block_was_showned_and_NOT_interrupted);
    }
  }
}

function create_word_block_with_instructions() {
  for (let i = 0; i < 1; i++) { // WORD BLOCK WITH INSTRUCTIONS
    timeline.push(instructions_word);
    for (let i = 0; i < 2; i++) { // WORD BLOCK
      timeline.push(fixation);
      timeline.push(create_random_tone_number_task(true));
      timeline.push(if_before_delay_block);
      timeline.push(if_after_delay_block); 
      timeline.push(if_remaining_block_was_NOT_showned); 
      timeline.push(if_remaining_block_was_showned_and_NOT_interrupted);
    }
  }
}

// var version = jsPsych.randomization.sampleWithoutReplacement([1,2],1)[0];
// if(version == 1){
//   timeline.push(create_digit_block_with_instructions(), create_word_block_with_instructions());
// }else {
//   timeline.push(create_word_block_with_instructions(), create_digit_block_with_instructions());
// };


var final_trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>¡Terminaste el experimento! Muchísimas gracias por participar :)</p>
    <p>Si te interesa saber de que se trata lo que acabaste de hacer, podes hacer click <a href="https://abioppenheim.github.io/INCC-parsing_a_cognitive_task/">aquí.</a></p>`,
  choices: "NO_KEYS"
}

timeline.push(final_trial);

/* start the experiment */
jsPsych.run(timeline);