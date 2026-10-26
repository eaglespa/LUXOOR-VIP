/**
 * Web Audio API based ambient sound generator for Luxor.
 * Generates organic atmospheric desert breezes, gentle Nile waters, and balloon burner swooshes
 * without requiring external MP3 downloads.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 2);
      this.masterGain.connect(this.ctx.destination);

      // Create pink noise buffer for warm desert breeze
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.11;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Warm low-pass filter
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);

      whiteNoise.connect(this.filterNode);
      this.filterNode.connect(this.masterGain);
      whiteNoise.start();

      this.noiseNode = whiteNoise;
      this.isPlaying = true;
    } catch {
      // AudioContext could be blocked by browser policy until gesture
      this.isPlaying = false;
    }
  }

  public playBurnerPulse() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const pulseGain = this.ctx.createGain();
      pulseGain.gain.setValueAtTime(0.001, now);
      pulseGain.gain.exponentialRampToValueAtTime(0.2, now + 0.3);
      pulseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(220, now);
      filter.Q.setValueAtTime(1.8, now);

      // Noise burst for burner
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(filter);
      filter.connect(pulseGain);
      pulseGain.connect(this.ctx.destination);

      source.start(now);
      source.stop(now + 2.0);
    } catch {
      // fail silently
    }
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.noiseNode && 'stop' in this.noiseNode) {
          (this.noiseNode as AudioBufferSourceNode).stop();
        }
        this.isPlaying = false;
      }, 500);
    } else {
      this.isPlaying = false;
    }
  }

  public getActive(): boolean {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientSoundEngine();
