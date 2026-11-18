/**
 * Tiny Web Audio synth for ΑΘΗΝΑ's mechanical sound effects.
 * Everything is generated in the browser: no audio files to download or license.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;

const VOLUME = 0.22;

function audio() {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = VOLUME;
    // gentle compression keeps the layered hits from clipping
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);
    noise = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return { ctx, out: master!, noise: noise! };
}

type A = NonNullable<ReturnType<typeof audio>>;

/** Short filtered noise hit: the "clunk" of a latch or plate seating. */
function clunk({ ctx, out, noise }: A, t: number, freq: number, dur = 0.07, level = 1) {
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = freq;
  bp.Q.value = 3;
  const g = ctx.createGain();
  g.gain.setValueAtTime(level, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(bp).connect(g).connect(out);
  src.start(t);
  src.stop(t + dur + 0.02);

  // low body thump under the noise
  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(freq / 8, t);
  o.frequency.exponentialRampToValueAtTime(40, t + dur);
  const og = ctx.createGain();
  og.gain.setValueAtTime(level * 0.8, t);
  og.gain.exponentialRampToValueAtTime(0.001, t + dur * 1.4);
  o.connect(og).connect(out);
  o.start(t);
  o.stop(t + dur * 1.5);
}

/** Low servo grind: detuned saws plus a dissonant tritone through a resonant low-pass. */
function servo({ ctx, out }: A, t: number, from: number, to: number, dur: number, level = 0.4) {
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.Q.value = 10;
  lp.frequency.setValueAtTime(from * 3, t);
  lp.frequency.exponentialRampToValueAtTime(to * 3, t + dur);

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(level, t + 0.04);
  g.gain.setValueAtTime(level, t + dur - 0.06);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  lp.connect(g).connect(out);

  // gear-tooth flutter shared by all voices
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 22;
  lfo.start(t);
  lfo.stop(t + dur + 0.02);

  for (const [ratio, detune, vol] of [
    [1, -14, 1],
    [1, 11, 1],
    [Math.SQRT2, 0, 0.45],
  ]) {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.detune.value = detune;
    o.frequency.setValueAtTime(from * ratio, t);
    o.frequency.exponentialRampToValueAtTime(to * ratio, t + dur);
    const fl = ctx.createGain();
    fl.gain.value = from * ratio * 0.05;
    lfo.connect(fl).connect(o.frequency);
    const vg = ctx.createGain();
    vg.gain.value = vol;
    o.connect(vg).connect(lp);
    o.start(t);
    o.stop(t + dur + 0.02);
  }
}

/** Dark, muffled signal tone. */
function tone({ ctx, out }: A, t: number, freq: number, dur = 0.2, level = 0.12) {
  const o = ctx.createOscillator();
  o.type = "square";
  o.frequency.setValueAtTime(freq, t);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = freq * 3;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(level, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(lp).connect(g).connect(out);
  o.start(t);
  o.stop(t + dur + 0.02);
}

/** Sub-bass hit whose pitch falls away. */
function boom({ ctx, out }: A, t: number, from: number, to: number, dur: number, level = 0.7) {
  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(from, t);
  o.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(level, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + dur + 0.02);
}

/** Routes a sound through a dark feedback echo; cleans itself up after `tail` seconds. */
function withEcho(a: A, tail: number, delayTime = 0.24, feedback = 0.38): A {
  const { ctx, out } = a;
  const src = ctx.createGain();
  const delay = ctx.createDelay(1);
  delay.delayTime.value = delayTime;
  const fb = ctx.createGain();
  fb.gain.value = feedback;
  const dark = ctx.createBiquadFilter();
  dark.type = "lowpass";
  dark.frequency.value = 650;
  const wet = ctx.createGain();
  wet.gain.value = 0.38;
  src.connect(out);
  src.connect(delay);
  delay.connect(dark).connect(fb).connect(delay);
  dark.connect(wet).connect(out);
  window.setTimeout(() => {
    src.disconnect();
    delay.disconnect();
    fb.disconnect();
    wet.disconnect();
  }, tail * 1000);
  return { ...a, out: src };
}

/** Opening: heavy latch → low servo grind → plates lock → two dark tones a tritone apart. */
export function playMechaOpen() {
  const raw = audio();
  if (!raw) return;
  const a = withEcho(raw, 2.2);
  const t = raw.ctx.currentTime + 0.01;
  clunk(a, t, 380, 0.12, 1);
  boom(a, t, 70, 32, 0.3, 0.55);
  servo(a, t + 0.04, 36, 118, 0.34);
  clunk(a, t + 0.37, 520, 0.08, 0.85);
  clunk(a, t + 0.43, 300, 0.16, 1);
  boom(a, t + 0.43, 60, 28, 0.35, 0.5);
  tone(a, t + 0.52, 196, 0.2, 0.12); // G3
  tone(a, t + 0.66, 277.2, 0.36, 0.1); // C#4, a tritone up
}

/** Closing: falling tone → servo grinds down → heavy seal with a sinking boom. */
export function playMechaClose() {
  const raw = audio();
  if (!raw) return;
  const a = withEcho(raw, 2);
  const t = raw.ctx.currentTime + 0.01;
  tone(a, t, 277.2, 0.14, 0.09);
  servo(a, t + 0.03, 118, 32, 0.3);
  clunk(a, t + 0.32, 240, 0.3, 1.1);
  boom(a, t + 0.32, 65, 22, 0.6, 0.65);
}

let activeSpin: GainNode | null = null;

/** Sine whose pitch follows the spin envelope: from → peak (spin-up), hold, → floor (wind-down). */
function sweep(
  param: AudioParam,
  t: number,
  end: number,
  up: number,
  down: number,
  [from, peak, floor]: [number, number, number],
) {
  param.setValueAtTime(from, t);
  param.exponentialRampToValueAtTime(peak, t + up);
  param.linearRampToValueAtTime(peak * 1.04, end - down);
  param.exponentialRampToValueAtTime(floor, end);
}

/**
 * Overclock spin: a low, dissonant turbine grinds up to speed over a sub-bass rumble while a
 * heavy ratchet accelerates, holds, then winds down into a deep boom with a dark echo tail.
 * Matches the halo's charge window.
 */
export function playMechaSpin(duration = 2.6) {
  const a = audio();
  if (!a) return;
  const { ctx } = a;
  const t = ctx.currentTime + 0.01;
  const end = t + duration;
  const up = 0.9; // spin-up time
  const down = 0.9; // wind-down time
  const tail = 2.5; // echo ring-out after the end

  // Fade out a spin that's still playing so rapid clicks don't stack.
  if (activeSpin) {
    activeSpin.gain.cancelScheduledValues(t);
    activeSpin.gain.setTargetAtTime(0, t, 0.04);
  }
  const bus = ctx.createGain();
  bus.gain.value = 1;
  bus.connect(a.out);
  activeSpin = bus;

  // Dark cavernous echo: filtered feedback delay.
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.27;
  const fb = ctx.createGain();
  fb.gain.value = 0.42;
  const dark = ctx.createBiquadFilter();
  dark.type = "lowpass";
  dark.frequency.value = 700;
  const wet = ctx.createGain();
  wet.gain.value = 0.4;
  const src = ctx.createGain(); // everything feeds this
  src.connect(bus);
  src.connect(delay);
  delay.connect(dark).connect(fb).connect(delay);
  dark.connect(wet).connect(bus);
  const b: A = { ...a, out: src };

  // Turbine body: detuned saws plus a tritone above, through a resonant low-pass.
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.Q.value = 11;
  sweep(lp.frequency, t, end, up, down, [110, 950, 70]);

  const body = ctx.createGain();
  body.gain.setValueAtTime(0.0001, t);
  body.gain.exponentialRampToValueAtTime(0.34, t + 0.25);
  body.gain.setValueAtTime(0.34, end - down);
  body.gain.exponentialRampToValueAtTime(0.0001, end);
  // slow throb that quickens with speed
  const throb = ctx.createOscillator();
  sweep(throb.frequency, t, end, up, down, [3, 11, 2]);
  const throbDepth = ctx.createGain();
  throbDepth.gain.value = 0.12;
  throb.connect(throbDepth).connect(body.gain);
  lp.connect(body).connect(src);

  const voices: [number, number, number][] = [
    [1, -14, 1],
    [1, 11, 1],
    [Math.SQRT2, 0, 0.45], // tritone: the "something is wrong" interval
  ];
  const stopAt = end + 0.05;
  for (const [ratio, detune, level] of voices) {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.detune.value = detune;
    sweep(o.frequency, t, end, up, down, [28 * ratio, 105 * ratio, 20 * ratio]);
    const g = ctx.createGain();
    g.gain.value = level;
    o.connect(g).connect(lp);
    o.start(t);
    o.stop(stopAt);
  }
  throb.start(t);
  throb.stop(stopAt);

  // Sub-bass rumble.
  const sub = ctx.createOscillator();
  sub.type = "sine";
  sweep(sub.frequency, t, end, up, down, [30, 55, 24]);
  const subG = ctx.createGain();
  subG.gain.setValueAtTime(0.0001, t);
  subG.gain.exponentialRampToValueAtTime(0.55, t + 0.3);
  subG.gain.setValueAtTime(0.55, end - down);
  subG.gain.exponentialRampToValueAtTime(0.0001, end + 0.2);
  sub.connect(subG).connect(src);
  sub.start(t);
  sub.stop(end + 0.25);

  // Low, beating whine: two sines a hair apart.
  for (const ratio of [1, 1.018]) {
    const w = ctx.createOscillator();
    w.type = "sine";
    sweep(w.frequency, t, end, up, down, [160 * ratio, 560 * ratio, 110 * ratio]);
    const wg = ctx.createGain();
    wg.gain.setValueAtTime(0.0001, t);
    wg.gain.exponentialRampToValueAtTime(0.035, t + up);
    wg.gain.setValueAtTime(0.035, end - down);
    wg.gain.exponentialRampToValueAtTime(0.0001, end);
    w.connect(wg).connect(src);
    w.start(t);
    w.stop(stopAt);
  }

  // Heavy ratchet: rate climbs from ~4/s to ~18/s, holds, then slows again.
  const max = 18;
  const rateAt = (time: number) => {
    const s = time - t;
    if (s < up) return 4 + (max - 4) * (s / up) ** 1.4;
    if (time < end - down) return max;
    return max - (max - 3) * ((time - (end - down)) / down) ** 0.8;
  };
  let tick = t + 0.08;
  let i = 0;
  while (tick < end - 0.12) {
    const level = tick < end - down ? 0.32 : 0.32 * Math.max(0.2, (end - tick) / down);
    clunk(b, tick, i % 2 ? 950 : 700, 0.035, level);
    tick += 1 / rateAt(tick);
    i++;
  }

  // Engage with a deep clank; end on a heavy boom that drops away.
  clunk(b, t, 380, 0.14, 1);
  clunk(b, end - 0.08, 220, 0.4, 1.2);
  const drop = ctx.createOscillator();
  drop.type = "sine";
  drop.frequency.setValueAtTime(75, end - 0.08);
  drop.frequency.exponentialRampToValueAtTime(22, end + 0.7);
  const dropG = ctx.createGain();
  dropG.gain.setValueAtTime(0.7, end - 0.08);
  dropG.gain.exponentialRampToValueAtTime(0.0001, end + 0.8);
  drop.connect(dropG).connect(src);
  drop.start(end - 0.08);
  drop.stop(end + 0.85);

  window.setTimeout(() => {
    if (activeSpin === bus) activeSpin = null;
    bus.disconnect();
    delay.disconnect();
    fb.disconnect();
  }, (duration + tail) * 1000);
}
