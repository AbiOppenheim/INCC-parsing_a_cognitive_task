const numerosEnPalabras = {
  1: "uno",
  2: "dos",
  3: "tres",
  4: "cuatro",
  5: "cinco",
  6: "seis",
  7: "siete",
  8: "ocho",
  9: "nueve",
  10: "diez",
  11: "once",
  12: "doce",
  13: "trece",
  14: "catorce",
  15: "quince",
  16: "dieciseis",
  17: "diecisiete",
  18: "dieciocho",
  19: "diecinueve",
  20: "veinte",
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
  45: "cuarenta y cinco",
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
  70: "setenta",
  71: "setenta y uno",
  72: "setenta y dos",
  73: "setenta y tres",
  74: "setenta y cuatro",
  75: "setenta y cinco",
  76: "setenta y seis",
  77: "setenta y siete",
  78: "setenta y ocho",
  79: "setenta y nueve",
  80: "ochenta",
  81: "ochenta y uno",
  82: "ochenta y dos",
  83: "ochenta y tres",
  84: "ochenta y cuatro",
  85: "ochenta y cinco",
  86: "ochenta y seis",
  87: "ochenta y siete",
  88: "ochenta y ocho",
  89: "ochenta y nueve",
  90: "noventa",
  91: "noventa y uno",
  92: "noventa y dos",
  93: "noventa y tres",
  94: "noventa y cuatro",
  95: "noventa y cinco",
  96: "noventa y seis",
  97: "noventa y siete",
  98: "noventa y ocho",
  99: "noventa y nueve",
  100: "cien"
};


/* initialize jsPsych */
var jsPsych = initJsPsych({
  // show_progress_bar: true,
  on_finish: function() {
    jsPsych.data.displayData();
  }
});

/* create timeline */
var timeline = [];

/* preload audios */
var preload_audios = {
  type: jsPsychPreload,
  audio: ['tones/440hz.mp3', 'tones/880hz.mp3']
};
timeline.push(preload_audios);

/* define welcome message trial */
var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Welcome to the experiment. Press any key to begin."
};
timeline.push(welcome);


/* define instructions trial */
var instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this experiment, a number will appear in the center 
    of the screen followed by a tone.</p><p>If the number is <strong>lesser than 45</strong>, 
    press the letter J on the keyboard as fast as you can.</p>
    <p>If the circle is <strong>greater than 45</strong>, press the letter K 
    as fast as you can.</p>
    <p> And for the tone task, if the tone is <strong>low</strong>, press the letter A as fast as you can.</p>
    <p>If the tone is <strong>high</strong>, press the letter S as fast as you can.</p>
    <p>Press any key to begin.</p>
  `,
  post_trial_gap: 2000
};
timeline.push(instructions);

var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">X</div>',
  choices: "NO_KEYS",
  trial_duration: 500, // TODO: preguntar si utilizar separador y de cuanto
  data: {
    task: 'fixation'
  }
};
 
var all_choices = ['j','k','a','s'];

/* define trial stimuli array for timeline variables */
// var number_task = {
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: function () { return jsPsych.randomization.randomInt(21, 69); },
//   choices: all_choices,
//   data: {
//     task: 'number_task'
//   },
//   trial_duration: 3000,
// };

// var number_task_remaining = { //
//   type: jsPsychHtmlKeyboardResponse,
//   // stimulus: jsPsych.data.get().last(1).values()[0].stimulus,
//   stimulus: 3,
//   choices: all_choices, 
//   trial_duration: function () {return 150-jsPsych.data.get().last(1).values()[0].rt;},  
//   response_ends_trial: false,
//   data: {
//     task: 'number_task_remaining'
//   },
// };


// Function to create a random trial
function create_random_number_tone_task() {
  var delay = jsPsych.randomization.randomInt(2600, 3000);
  var number = jsPsych.randomization.randomInt(21, 69);
  var audioFile = jsPsych.randomization.shuffle(['jspsych/examples/sound/speech_blue.mp3', 'jspsych/examples/sound/speech_red.mp3'])[0];
    
  // si interrumpen este bloque  
  // - si lo hacen previo sl delay (no vieron el numero) --> hay que terminar el delay y mostrar el numero
  // - si lo hacen post al delay (vieron el numero) --> hay que terminar numero
  var number_tone_task = { 
    type: jsPsychAudioKeyboardResponse,
    stimulus: audioFile,
    prompt: `<p id="prompt" style="visibility:hidden;">${number}</p>`,
    choices: all_choices,
    on_load: function() {
      // wait for 3 seconds, then show the prompt
      setTimeout(function() {
        document.getElementById('prompt').style.visibility = "visible";
      }, delay);
    },
    data: {
      task: 'number_tone_task',
      delay: delay,
      number: number,
      audioFile: audioFile
    }
  };

  return number_tone_task;
}


var number_tone_task_remaining_before_delay = { 
  type: jsPsychAudioKeyboardResponse,
  // no audio played
  stimulus: '',
  // same number as before
  prompt: `<p id="prompt" style="visibility:hidden;">${jsPsych.data.get().last(1).values()[0].number}</p>`,
  choices: all_choices,
  // remaining_delay_1 = delay_0 - rt_0
  on_load: function() {
    setTimeout(function() {
      document.getElementById('prompt').style.visibility = "visible";
    }, jsPsych.data.get().last(1).values()[0].delay-jsPsych.data.get().last(1).values()[0].rt); // TODO: check
  },
  data: {
    task: 'number_tone_task'
  }
};

var number_tone_task_remaining_after_delay = { 
  type: jsPsychAudioKeyboardResponse,
  // no audio played
  stimulus: '',
  // same number as before
  prompt: `<p id="prompt" style="visibility:hidden;">${jsPsych.data.get().last(1).values()[0].number}</p>`,
  choices: all_choices,
  // remaining_delay_1 = delay_0 - rt_0
  data: {
    task: 'number_tone_task'
  }
};


var if_before_delay_block = {
  timeline: [number_tone_task_before_delay_remaining],
  conditional_function: function(){
    console.log(jsPsych.data.get().last(1).values()[0])
    if (jsPsych.data.get().last(1).values()[0].rt == null) return false; 
    return jsPsych.data.get().last(1).values()[0].rt <= jsPsych.data.get().last(1).values()[0].delay;
  }
}

var if_after_delay_block = {
  timeline: [number_tone_task_before_delay_remaining],
  conditional_function: function(){
    console.log(jsPsych.data.get().last(1).values()[0])
    if (jsPsych.data.get().last(1).values()[0].rt == null) return false; 
    return jsPsych.data.get().last(1).values()[0].rt <= jsPsych.data.get().last(1).values()[0].delay;
  }
}



// var conditional_number_task_remaining = {
//   timeline: [number_task_remaining],
//   conditional_function: function(){
//     console.log(jsPsych.data.get().last(1).values());
//     if (jsPsych.data.get().last(1).values()[0].rt == null) return false; 
//     return jsPsych.data.get().last(1).values()[0].rt <= 150;
//   }
// }
// var time_reimaining_response = { 
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: '',
//   choices: all_choices, 
//   data: {
//     task: 'participant_responnse'
//   },
//   trial_duration: 3000, // outliers : 1200 ms
// };

// var conditional_time_reimaining_response = {
//   timeline: [time_reimaining_response],
//   conditional_function: function(){
//     return jsPsych.data.get().last(3).values()[0].rt == null; // if first block of number task was not responded, show this trial
//   }
// }


// var number_as_text_task = {
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: function () { return numerosEnPalabras[jsPsych.randomization.randomInt(21, 69)]; },
//   choices: ['j','k'],
//   data: {
//     task: 'number_task'
//   }
// }

// var tone_task = {
//   type: jsPsychAudioKeyboardResponse,
//   stimulus: function () {
//     return jsPsych.randomization.shuffle(['tones/440hz.mp3', 'tones/880hz.mp3'])[0];
//   },
//   choices: ['a','s'],
//   trial_duration: 150,
//   trial_ends_after_audio: false,
//   response_allowed_while_playing: true,
//   data: {
//     task: 'tone_task'
//   }
// };


/* define test procedure */
var test_procedure = {
  // timeline: [fixation, tone_task, number_task, conditional_number_task_remaining, time_reimaining_response, conditional_time_reimaining_response],//, tone_task],
  timeline: [fixation, create_random_number_tone_task(), if_before_delay_block],
  // timeline: [fixation, number_task, conditional_number_task_remaining],
  repetitions: 2
};
timeline.push(test_procedure);


/* start the experiment */
jsPsych.run(timeline);
