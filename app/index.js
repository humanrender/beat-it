import Envelope from './lib/Envelope.js';

const context = new window.AudioContext();

const osc = context.createOscillator();
osc.type = 'sine';
osc.frequency.value = 50;
osc.start(0);

const envelope = new Envelope(context, {
  attack: 0.001,
  decay: 0.1,
  sustain: 0,
  release: 0.25,
  length: 0.05
});

osc.connect(envelope.gain);
envelope.gain.connect(context.destination);

const trigger = document.getElementById('trigger');
trigger.addEventListener('click', function(){
  envelope.trigger();
});
