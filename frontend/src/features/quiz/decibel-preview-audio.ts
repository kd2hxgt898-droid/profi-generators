/**
 * Короткие синтетические демо для шкалы дБ в квизе (Web Audio, без файлов).
 */

let audioContext: AudioContext | null = null;
let activeCleanup: (() => void) | null = null;
let activeTimer: number | null = null;

function getCtx(): AudioContext {
  if (!audioContext) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    audioContext = new AC();
  }
  return audioContext;
}

export async function resumeDecibelAudio(): Promise<void> {
  const c = getCtx();
  if (c.state === 'suspended') {
    await c.resume();
  }
}

function makeBrownNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
  const len = Math.max(1, Math.floor(ctx.sampleRate * durationSec));
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < len; i += 1) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) * 0.995;
    data[i] = Math.max(-1, Math.min(1, lastOut * 3.2));
  }
  return buffer;
}

export function stopDecibelPreview(): void {
  if (activeTimer !== null) {
    window.clearTimeout(activeTimer);
    activeTimer = null;
  }
  if (activeCleanup !== null) {
    activeCleanup();
    activeCleanup = null;
  }
}

export function playDecibelPreview(tone: 'loud' | 'quiet'): void {
  stopDecibelPreview();

  const c = getCtx();
  const t0 = c.currentTime;
  const dur = tone === 'loud' ? 2.55 : 2.65;

  const master = c.createGain();
  master.connect(c.destination);

  const disposers: Array<() => void> = [];

  const registerSource = (node: OscillatorNode | AudioBufferSourceNode): void => {
    disposers.push((): void => {
      try {
        node.stop();
      } catch {
        /* already stopped */
      }
      try {
        node.disconnect();
      } catch {
        /* */
      }
    });
  };

  if (tone === 'loud') {
    master.gain.setValueAtTime(0.0001, t0);
    master.gain.exponentialRampToValueAtTime(0.34, t0 + 0.07);
    master.gain.setValueAtTime(0.3, t0 + dur - 0.22);
    master.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    const buf = makeBrownNoiseBuffer(c, 1.3);
    const src = c.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const bp = c.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(480, t0);
    bp.frequency.exponentialRampToValueAtTime(1900, t0 + 0.55);
    bp.Q.value = 1.05;
    const gN = c.createGain();
    gN.gain.value = 0.88;
    src.connect(bp);
    bp.connect(gN);
    gN.connect(master);
    src.start(t0);
    src.stop(t0 + dur);
    registerSource(src);

    const saw = c.createOscillator();
    saw.type = 'sawtooth';
    saw.frequency.setValueAtTime(58, t0);
    saw.frequency.exponentialRampToValueAtTime(92, t0 + 0.45);
    const gS = c.createGain();
    gS.gain.value = 0.15;
    saw.connect(gS);
    gS.connect(master);
    saw.start(t0);
    saw.stop(t0 + dur);
    registerSource(saw);

    const buzz = c.createOscillator();
    buzz.type = 'square';
    buzz.frequency.setValueAtTime(124, t0);
    const gB = c.createGain();
    gB.gain.value = 0.045;
    buzz.connect(gB);
    gB.connect(master);
    buzz.start(t0);
    buzz.stop(t0 + dur);
    registerSource(buzz);
  } else {
    master.gain.setValueAtTime(0.0001, t0);
    master.gain.exponentialRampToValueAtTime(0.07, t0 + 0.14);
    master.gain.setValueAtTime(0.052, t0 + dur - 0.28);
    master.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    const buf = makeBrownNoiseBuffer(c, 1.6);
    const src = c.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 720;
    const gN = c.createGain();
    gN.gain.value = 0.24;
    src.connect(lp);
    lp.connect(gN);
    gN.connect(master);
    src.start(t0);
    src.stop(t0 + dur);
    registerSource(src);

    const sine = c.createOscillator();
    sine.type = 'sine';
    sine.frequency.value = 200;
    const gSi = c.createGain();
    gSi.gain.value = 0.065;
    sine.connect(gSi);
    gSi.connect(master);
    sine.start(t0);
    sine.stop(t0 + dur);
    registerSource(sine);
  }

  const disposeAll = (): void => {
    disposers.forEach((d) => {
      d();
    });
    disposers.length = 0;
    try {
      master.disconnect();
    } catch {
      /* */
    }
  };

  activeCleanup = disposeAll;
  activeTimer = window.setTimeout(() => {
    stopDecibelPreview();
  }, Math.ceil(dur * 1000) + 180);
}
