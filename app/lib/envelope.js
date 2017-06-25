import _ from 'lodash';

class Envelope {
  constructor(context, props) {
    this.context = context;
    this.props = props;
    this.gain = context.createGain();
    this.gainParams = this.gain.gain;
    this.gainParams.value = 0;
  }
  trigger() {
    const { attack, decay, sustain, length } = this.props;
    const time = this.context.currentTime;
    const startDecayAt = time + attack;
    
    this.gainParams.cancelScheduledValues(time);
    this.gainParams.setValueAtTime(0, time);
    this.gainParams.linearRampToValueAtTime(1.0, time + attack);
    this.gainParams.linearRampToValueAtTime(sustain, startDecayAt + decay);

    if (length){
      setTimeout(() => { this.release(); }, length);
    }
  }
  release() {
    console.log('releasing');
    const time = this.context.currentTime;
    const gainValue = this.gainParams.value;
    const { release } = this.props;
    
    this.gainParams.cancelScheduledValues(time);
    this.gainParams.setValueAtTime(gainValue, time);
    this.gainParams.linearRampToValueAtTime(0, time + release);
  }
  toString(time) {
    const { attack, decay, sustain, release, length } = this.props;
    
    return `Envelope (attack: ${attack}, decay: ${decay}, sustain: ${sustain}, release: ${release}, length: ${length})`;
  }
}

export default Envelope;
