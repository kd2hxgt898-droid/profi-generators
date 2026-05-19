/**
 * Звуки «Выключателя спокойствия» через Web Audio API — без отдельных файлов,
 * чтобы не утяжелять бандл; инициализация после жеста пользователя (autoplay policy).
 */

function makeNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
  const len = Math.max(1, Math.floor(ctx.sampleRate * durationSec));
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i += 1) {
    data[i] = (Math.random() * 2 - 1) * 0.45;
  }
  return buffer;
}

export type CalmSwitchAudio = {
  resume: () => Promise<void>;
  playClunk: () => void;
  playVoltageDrop: () => void;
  startHum: () => void;
  stopHum: () => void;
  dispose: () => void;
};

export function createCalmSwitchAudio(): CalmSwitchAudio {
  let ctx: AudioContext | null = null;
  let humOsc1: OscillatorNode | null = null;
  let humOsc2: OscillatorNode | null = null;
  let humNoise: AudioBufferSourceNode | null = null;
  let humMaster: GainNode | null = null;

  const getCtx = (): AudioContext => {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
    }
    return ctx;
  };

  const resume = async (): Promise<void> => {
    const c = getCtx();
    if (c.state === 'suspended') {
      await c.resume();
    }
  };

  const playClunk = (): void => {
    const c = getCtx();
    const t = c.currentTime;
    const master = c.createGain();
    master.gain.value = 0.9;
    master.connect(c.destination);

    const osc = c.createOscillator();
    osc.type = 'sine';
    const og = c.createGain();
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(48, t + 0.1);
    og.gain.setValueAtTime(0.22, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(og);
    og.connect(master);
    osc.start(t);
    osc.stop(t + 0.2);

    const noiseBuf = makeNoiseBuffer(c, 0.07);
    const nSrc = c.createBufferSource();
    nSrc.buffer = noiseBuf;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.1, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    nSrc.connect(ng);
    ng.connect(master);
    nSrc.start(t);
    nSrc.stop(t + 0.08);
  };

  const playVoltageDrop = (): void => {
    const c = getCtx();
    const t = c.currentTime;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.35);
    g.gain.setValueAtTime(0.06, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.4);
  };

  const startHum = (): void => {
    stopHum();
    const c = getCtx();
    const master = c.createGain();
    master.gain.value = 0.055;
    master.connect(c.destination);
    humMaster = master;

    const osc58 = c.createOscillator();
    humOsc1 = osc58;
    osc58.type = 'sine';
    osc58.frequency.value = 58;
    const g58 = c.createGain();
    g58.gain.value = 0.55;
    osc58.connect(g58);
    g58.connect(master);
    osc58.start();

    const osc116 = c.createOscillator();
    humOsc2 = osc116;
    osc116.type = 'sine';
    osc116.frequency.value = 118;
    const g116 = c.createGain();
    g116.gain.value = 0.12;
    osc116.connect(g116);
    g116.connect(master);
    osc116.start();

    const nBuf = makeNoiseBuffer(c, 1.2);
    const nLoop = c.createBufferSource();
    humNoise = nLoop;
    nLoop.buffer = nBuf;
    nLoop.loop = true;
    const nf = c.createBiquadFilter();
    nf.type = 'lowpass';
    nf.frequency.value = 220;
    const ng = c.createGain();
    ng.gain.value = 0.35;
    nLoop.connect(nf);
    nf.connect(ng);
    ng.connect(master);
    nLoop.start();
  };

  const stopHum = (): void => {
    const safeStop = (n: OscillatorNode | AudioBufferSourceNode | null): void => {
      if (!n) return;
      try {
        n.stop();
      } catch {
        /* */
      }
      try {
        n.disconnect();
      } catch {
        /* */
      }
    };
    safeStop(humOsc1);
    safeStop(humOsc2);
    safeStop(humNoise);
    humOsc1 = null;
    humOsc2 = null;
    humNoise = null;
    try {
      humMaster?.disconnect();
    } catch {
      /* */
    }
    humMaster = null;
  };

  const dispose = (): void => {
    stopHum();
    void ctx?.close();
    ctx = null;
  };

  return {
    resume,
    playClunk,
    playVoltageDrop,
    startHum,
    stopHum,
    dispose,
  };
}
