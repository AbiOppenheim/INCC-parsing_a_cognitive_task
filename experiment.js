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
  stimulus: `<div style="font-size:${fixation_font_size}px;">X</div>`,
  choices: "NO_KEYS",
  trial_duration: 500, // TODO: preguntar si utilizar separador y de cuanto
  data: {
    task: 'fixation'
  }
};
 



// Function to create a random trial
function create_random_tone_number_task() {
  var delay = jsPsych.randomization.randomInt(0, 1025);
  var number = jsPsych.randomization.randomInt(21, 69);
  var audioFile = jsPsych.randomization.shuffle(['tones/440hz_short.mp3', 'tones/880hz_short.mp3'])[0];
    
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
    stimulus: function (){return jsPsych.data.get().last(1).values()[0].number;},
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
  trial_duration: 1300,  // outliers: trials in which the RTs to the first task were larger than 1,200 m
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



for (var i = 0; i < 5; i++) {
  timeline.push(fixation);
  timeline.push(create_random_tone_number_task());
  timeline.push(if_before_delay_block);
  timeline.push(if_after_delay_block);
  timeline.push(if_remaining_block_was_NOT_showned);
  timeline.push(if_remaining_block_was_showned_and_NOT_interrupted);
};


/* start the experiment */
jsPsych.run(timeline);
