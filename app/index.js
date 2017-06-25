import Envelope from './lib/Envelope.js';
import WhiteNoise from './lib/WhiteNoise.js';

const context = new window.AudioContext();

/* const osc = context.createOscillator();
 * osc.type = 'sine';
 * osc.frequency.value = 50;
 * osc.start(0);
 * 
 * const envelope = new Envelope(context, {
 *   attack: 0.001,
 *   decay: 0.1,
 *   sustain: 0,
 *   release: 0.25,
 *   length: 0.05
 * });
 * 
 * osc.connect(envelope.gain);
 * envelope.gain.connect(context.destination);
 * 
 * const trigger = document.getElementById('trigger');
 * trigger.addEventListener('click', function(){
 *   envelope.trigger();
 * });*/

const osc = context.createOscillator();
osc.type = 'sine';
osc.frequency.value = 60;
osc.start(0);

const envelope = new Envelope(context, {
  attack: 0.001,
  decay: 0.1,
  sustain: 0,
  release: 0.25,
  length: 1000
});

osc.connect(envelope.gain);
envelope.gain.connect(context.destination);

const clickEnvelope = new Envelope(context, {
  attack: 0.001,
  decay: 0.1,
  sustain: 0,
  release: 0.25,
  length: 1000
});

const trigger = document.getElementById('trigger');
trigger.addEventListener('click', function(){
  envelope.trigger();
});
