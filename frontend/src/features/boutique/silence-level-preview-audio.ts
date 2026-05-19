/**
 * Короткие синтетические демо «как звучит» уровень тишины витрины (1 — тише … 3 — громче).
 * Web Audio, без файлов; после жеста пользователя (кнопка «Послушать»).
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

export async function resumeSilencePreviewAudio(): Promise<void> {
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

export function stopSilenceLevelPreview(): void {
  if (activeTimer !== null) {
    window.clearTimeout(activeTimer);
    activeTimer = null;
  }
  if (activeCleanup !== null) {
    activeCleanup();
    activeCleanup = null;
  }
}

type LevelParams = {
  dur: number;
  bandHz: number;
  bandQ: number;
  noiseGain: number;
  buzzHz: number;
  buzzGain: number;
  sawHz: number;
  sawGain: number;
  masterPeak: number;
};

const LEVEL_PARAMS: Record<1 | 2 | 3, LevelParams> = {
  1: {
    dur: 2.45,
    bandHz: 190,
    bandQ: 0.82,
    noiseGain: 0.42,
    buzzHz: 118,
    buzzGain: 0.018,
    sawHz: 52,
    sawGain: 0.04,
    masterPeak: 0.052,
  },
  2: {
    dur: 2.45,
    bandHz: 360,
    bandQ: 0.95,
    noiseGain: 0.55,
    buzzHz: 132,
    buzzGain: 0.038,
    sawHz: 62,
    sawGain: 0.085,
    masterPeak: 0.11,
  },
  3: {
    dur: 2.45,
    bandHz: 620,
    bandQ: 1.05,
    noiseGain: 0.72,
    buzzHz: 145,
    buzzGain: 0.065,
    sawHz: 76,
    sawGain: 0.14,
    masterPeak: 0.2,
  },
};

export function playSilenceLevelPreview(level: 1 | 2 | 3): void {
  stopSilenceLevelPreview();

  const c = getCtx();
  const t0 = c.currentTime;
  const p = LEVEL_PARAMS[level];

  const master = c.createGain();
  master.connect(c.destination);
  master.gain.setValueAtTime(0.0001, t0);
  master.gain.exponentialRampToValueAtTime(p.masterPeak, t0 + 0.12);
  master.gain.setValueAtTime(p.masterPeak * 0.92, t0 + p.dur - 0.26);
  master.gain.exponentialRampToValueAtTime(0.0001, t0 + p.dur);

  const disposers: Array<() => void> = [];

  const registerSource = (node: OscillatorNode | AudioBufferSourceNode): void => {
    disposers.push((): void => {
      try {
        node.stop();
      } catch {
        /* */
      }
      try {
        node.disconnect();
      } catch {
        /* */
      }
    });
  };

  const buf = makeBrownNoiseBuffer(c, 1.35);
  const src = c.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = p.bandHz;
  bp.Q.value = p.bandQ;
  const gN = c.createGain();
  gN.gain.value = p.noiseGain;
  src.connect(bp);
  bp.connect(gN);
  gN.connect(master);
  src.start(t0);
  src.stop(t0 + p.dur);
  registerSource(src);

  const buzz = c.createOscillator();
  buzz.type = 'square';
  buzz.frequency.value = p.buzzHz;
  const gB = c.createGain();
  gB.gain.value = p.buzzGain;
  buzz.connect(gB);
  gB.connect(master);
  buzz.start(t0);
  buzz.stop(t0 + p.dur);
  registerSource(buzz);

  const saw = c.createOscillator();
  saw.type = 'sawtooth';
  saw.frequency.value = p.sawHz;
  const gS = c.createGain();
  gS.gain.value = p.sawGain;
  saw.connect(gS);
  gS.connect(master);
  saw.start(t0);
  saw.stop(t0 + p.dur);
  registerSource(saw);

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
    stopSilenceLevelPreview();
  }, Math.ceil(p.dur * 1000) + 200);
}
