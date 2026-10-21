/**
 * Web Audio Ambient Synth & Lyria Music Engine
 * 
 * Provides:
 * 1. Procedural harmonic ambient synth pads for each portfolio section (Hero, About, Projects, etc.)
 *    with ultra-smooth crossfading and high-end warm filter shaping.
 * 2. Lyria AI Music playback, caching, and section binding (using WAV Blobs from lyria-3-clip-preview / lyria-3-pro-preview).
 * 3. Section change detection cues ("music when another section opens").
 */

export type SectionKey = 'hero' | 'about' | 'projects' | 'philosophy' | 'experience' | 'contact' | 'modal';

interface ChordProfile {
  name: string;
  frequencies: number[];
  filterFreq: number;
  resonance: number;
  type: OscillatorType;
  chimeNotes?: number[];
}

const SECTION_HARMONIES: Record<SectionKey, ChordProfile> = {
  hero: {
    name: 'Ethereal Horizon (Cmaj9)',
    frequencies: [130.81, 196.00, 246.94, 293.66, 329.63], // C3, G3, B3, D4, E4
    filterFreq: 1100,
    resonance: 1.2,
    type: 'sine',
    chimeNotes: [523.25, 659.25, 783.99],
  },
  about: {
    name: 'Warm Human Touch (Am7/9)',
    frequencies: [110.00, 164.81, 196.00, 261.63, 329.63], // A2, E3, G3, C4, E4
    filterFreq: 950,
    resonance: 1.5,
    type: 'triangle',
    chimeNotes: [440.0, 523.25, 659.25],
  },
  projects: {
    name: 'Deep Emerald Innovation (Eadd9)',
    frequencies: [82.41, 164.81, 246.94, 329.63, 370.00], // E2, E3, B3, E4, F#4
    filterFreq: 1300,
    resonance: 1.8,
    type: 'sine',
    chimeNotes: [659.25, 740.0, 987.77],
  },
  philosophy: {
    name: 'Zen Clarity (Dmaj7)',
    frequencies: [146.83, 220.00, 293.66, 369.99, 440.00], // D3, A3, D4, F#4, A4
    filterFreq: 1000,
    resonance: 1.0,
    type: 'triangle',
    chimeNotes: [587.33, 739.99, 880.0],
  },
  experience: {
    name: 'Steadfast Momentum (Fmaj9)',
    frequencies: [87.31, 174.61, 261.63, 329.63, 349.23], // F2, F3, C4, E4, F4
    filterFreq: 1200,
    resonance: 1.4,
    type: 'sine',
    chimeNotes: [523.25, 698.46, 880.0],
  },
  contact: {
    name: 'Luminous Connection (Gmaj9)',
    frequencies: [98.00, 196.00, 246.94, 293.66, 392.00], // G2, G3, B3, D4, G4
    filterFreq: 1400,
    resonance: 1.3,
    type: 'sine',
    chimeNotes: [783.99, 987.77, 1174.66],
  },
  modal: {
    name: 'Insight Focus (Acoustic Shimmer)',
    frequencies: [130.81, 196.00, 329.63, 392.00, 523.25],
    filterFreq: 1600,
    resonance: 2.0,
    type: 'sine',
    chimeNotes: [659.25, 783.99, 1046.5],
  },
};

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private activeGains: GainNode[] = [];
  
  private isEnabled: boolean = false;
  private volume: number = 0.25; // Subtle, elegant background level
  private currentSection: SectionKey = 'hero';
  private listeners: Set<(state: AudioEngineState) => void> = new Set();
  
  // Custom Lyria track audio element
  private lyriaAudio: HTMLAudioElement | null = null;
  private lyriaTrackUrl: string | null = null;
  private sectionLyriaTracks: Partial<Record<SectionKey, string>> = {};

  constructor() {
    // Initial check from localStorage if user previously enabled sound
    if (typeof window !== 'undefined') {
      const storedMuted = localStorage.getItem('natalia_portfolio_audio_enabled');
      this.isEnabled = storedMuted === 'true';
      const storedVol = localStorage.getItem('natalia_portfolio_audio_volume');
      if (storedVol) {
        this.volume = parseFloat(storedVol) || 0.25;
      }
    }
  }

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isEnabled ? this.volume : 0, this.ctx.currentTime);

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(1200, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);

      this.filterNode.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn('AudioContext initialization deferred until interaction:', e);
    }
  }

  public subscribe(listener: (state: AudioEngineState) => void) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  public getState(): AudioEngineState {
    return {
      isEnabled: this.isEnabled,
      volume: this.volume,
      currentSection: this.currentSection,
      sectionHarmonyName: SECTION_HARMONIES[this.currentSection]?.name || 'Ambient',
      hasLyriaTrack: Boolean(this.sectionLyriaTracks[this.currentSection] || this.lyriaTrackUrl),
      isLyriaPlaying: Boolean(this.lyriaAudio && !this.lyriaAudio.paused),
    };
  }

  /**
   * Toggle global audio on/off
   */
  public async toggleAudio(force?: boolean) {
    const newState = force !== undefined ? force : !this.isEnabled;
    this.isEnabled = newState;
    localStorage.setItem('natalia_portfolio_audio_enabled', String(this.isEnabled));

    this.initContext();

    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {
        console.warn('Could not resume AudioContext', e);
      }
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      if (this.isEnabled) {
        this.masterGain.gain.setValueAtTime(0.001, now);
        this.masterGain.gain.exponentialRampToValueAtTime(this.volume, now + 1.2);
        this.playSectionPad(this.currentSection, true);
        if (this.lyriaAudio && this.lyriaTrackUrl) {
          this.lyriaAudio.volume = this.volume;
          this.lyriaAudio.play().catch(() => {});
        }
      } else {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => this.stopPads(), 900);
        if (this.lyriaAudio) {
          this.lyriaAudio.pause();
        }
      }
    }

    this.notify();
  }

  /**
   * Set master volume (0.0 to 1.0)
   */
  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    localStorage.setItem('natalia_portfolio_audio_volume', String(clamped));

    if (this.masterGain && this.ctx && this.isEnabled) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(clamped, now + 0.1);
    }
    if (this.lyriaAudio) {
      this.lyriaAudio.volume = clamped;
    }
    this.notify();
  }

  /**
   * Called whenever user navigates or scrolls to another section
   */
  public onSectionEnter(section: SectionKey) {
    if (this.currentSection === section) return;
    const previous = this.currentSection;
    this.currentSection = section;

    // Check if there's a dedicated Lyria track for this section
    const sectionTrack = this.sectionLyriaTracks[section];
    if (sectionTrack && this.isEnabled) {
      this.playLyriaTrack(sectionTrack);
      this.playSectionChime(section);
      this.notify();
      return;
    }

    if (this.isEnabled) {
      // Play brief transitional chord / shimmer to signify section boundary
      this.playSectionChime(section);
      // Crossfade continuous ambient harmonic pad to the new section
      this.playSectionPad(section, false);
    }

    this.notify();
  }

  /**
   * Crossfade ambient harmonic pad to the target section
   */
  private playSectionPad(section: SectionKey, isInitial: boolean = false) {
    if (!this.ctx || !this.filterNode) return;
    const harmony = SECTION_HARMONIES[section] || SECTION_HARMONIES.hero;
    const now = this.ctx.currentTime;
    const fadeDuration = isInitial ? 1.0 : 2.2;

    // Fade out previous oscillators
    const oldOscs = [...this.activeOscillators];
    const oldGains = [...this.activeGains];
    this.activeOscillators = [];
    this.activeGains = [];

    oldGains.forEach((g) => {
      try {
        g.gain.cancelScheduledValues(now);
        g.gain.setValueAtTime(g.gain.value, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + fadeDuration);
      } catch (e) {}
    });

    setTimeout(() => {
      oldOscs.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      oldGains.forEach((g) => {
        try {
          g.disconnect();
        } catch (e) {}
      });
    }, (fadeDuration + 0.2) * 1000);

    // Gently modulate filter cutoff to match profile
    this.filterNode.frequency.cancelScheduledValues(now);
    this.filterNode.frequency.setValueAtTime(this.filterNode.frequency.value, now);
    this.filterNode.frequency.exponentialRampToValueAtTime(harmony.filterFreq, now + fadeDuration);

    // Start new harmonic chord oscillators
    const count = harmony.frequencies.length;
    harmony.frequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.filterNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Subtle detune for rich spatial warmth
      const detuneCents = (idx % 2 === 0 ? 1 : -1) * (idx * 2.5);
      osc.type = harmony.type;
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime(detuneCents, now);

      const targetGain = (0.28 / count) * (1 - idx * 0.12);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, targetGain), now + fadeDuration);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(now);

      this.activeOscillators.push(osc);
      this.activeGains.push(gain);
    });
  }

  /**
   * Plays a delicate harmonic chime accent when crossing into a new section
   */
  private playSectionChime(section: SectionKey) {
    if (!this.ctx || !this.masterGain) return;
    const harmony = SECTION_HARMONIES[section];
    if (!harmony?.chimeNotes) return;

    const now = this.ctx.currentTime;
    harmony.chimeNotes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const noteStart = now + i * 0.08;
      const noteEnd = noteStart + 1.4;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.setValueAtTime(0.08, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(noteStart);
      osc.stop(noteEnd + 0.1);

      setTimeout(() => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
      }, 1800);
    });
  }

  private stopPads() {
    this.activeGains.forEach((g) => {
      try {
        g.gain.setValueAtTime(0.0001, 0);
        g.disconnect();
      } catch (e) {}
    });
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.activeOscillators = [];
    this.activeGains = [];
  }

  /**
   * Set a custom Lyria track for playback (either global or per-section)
   */
  public playLyriaTrack(url: string, section?: SectionKey) {
    if (section) {
      this.sectionLyriaTracks[section] = url;
    }
    this.lyriaTrackUrl = url;

    if (!this.lyriaAudio) {
      this.lyriaAudio = new Audio();
      this.lyriaAudio.loop = true;
    }
    this.lyriaAudio.src = url;
    this.lyriaAudio.volume = this.volume;

    if (this.isEnabled) {
      this.lyriaAudio.play().catch((err) => {
        console.warn('Autoplay blocked for Lyria audio:', err);
      });
      // Soften procedural synth while Lyria track plays
      this.stopPads();
    }
    this.notify();
  }

  public setSectionLyriaTrack(section: SectionKey, url: string) {
    this.sectionLyriaTracks[section] = url;
    this.notify();
  }

  public getSectionLyriaTrack(section: SectionKey): string | undefined {
    return this.sectionLyriaTracks[section];
  }
}

export interface AudioEngineState {
  isEnabled: boolean;
  volume: number;
  currentSection: SectionKey;
  sectionHarmonyName: string;
  hasLyriaTrack: boolean;
  isLyriaPlaying: boolean;
}

export const audioEngine = new AudioEngine();
