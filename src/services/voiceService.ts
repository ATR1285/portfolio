import { voiceScripts } from '../data/voiceScripts';

export interface SpeakCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

class VoiceService {
  private activeAudio: HTMLAudioElement | null = null;
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private apiKey: string | undefined;
  private voiceId: string | undefined;

  constructor() {
    this.apiKey = import.meta.env.VITE_VOICE_API_KEY;
    this.voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB'; // Default natural voice ID fallback
  }

  /**
   * Stop any active audio stream or speech synthesis utterance
   */
  public stopSpeech(): void {
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
      this.activeAudio = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.activeUtterance = null;
    }
  }

  /**
   * Check if any audio stream is currently playing
   */
  public isSpeaking(): boolean {
    if (this.activeAudio && !this.activeAudio.paused) return true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis.speaking;
    }
    return false;
  }

  /**
   * Primary entry point for speaking a portfolio section explanation
   */
  public async speakSection(
    sectionId: string,
    callbacks: SpeakCallbacks = {}
  ): Promise<void> {
    this.stopSpeech();

    const scriptData = voiceScripts[sectionId] || voiceScripts.hero;
    const text = scriptData.script;
    const cacheKey = `${scriptData.id}-${scriptData.version}`;

    // 1. Check in-memory audio cache for pre-generated audio
    if (this.audioCache.has(cacheKey)) {
      const cachedAudio = this.audioCache.get(cacheKey)!;
      return this.playAudioElement(cachedAudio, callbacks);
    }

    // 2. Attempt API generated personal voice if API key exists
    if (this.apiKey) {
      try {
        const audio = await this.generateElevenLabsSpeech(text, cacheKey);
        if (audio) {
          this.audioCache.set(cacheKey, audio);
          return this.playAudioElement(audio, callbacks);
        }
      } catch (err) {
        console.warn("[VoiceService] Personal API voice generation failed, falling back to Web Speech API:", err);
      }
    }

    // 3. Browser Web Speech API fallback
    return this.speakWebSpeech(text, callbacks);
  }

  /**
   * Play an HTMLAudioElement with event handling
   */
  private playAudioElement(audio: HTMLAudioElement, callbacks: SpeakCallbacks): Promise<void> {
    return new Promise((resolve) => {
      this.activeAudio = audio;
      audio.currentTime = 0;

      audio.onplay = () => {
        callbacks.onStart?.();
      };

      audio.onended = () => {
        this.activeAudio = null;
        callbacks.onEnd?.();
        resolve();
      };

      audio.onerror = (e) => {
        this.activeAudio = null;
        callbacks.onError?.(e);
        resolve();
      };

      audio.play().catch((err) => {
        console.warn("[VoiceService] HTMLAudioElement play blocked by browser autoplay policy:", err);
        // Fallback to Web Speech API if audio.play() is blocked
        this.speakWebSpeech(audio.getAttribute('data-text') || '', callbacks).then(resolve);
      });
    });
  }

  /**
   * Generate ElevenLabs / Custom voice stream if configured
   */
  private async generateElevenLabsSpeech(text: string, cacheKey: string): Promise<HTMLAudioElement | null> {
    if (!this.apiKey) return null;

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.85,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Voice API HTTP error ${response.status}`);
    }

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.setAttribute('data-text', text);
    return audio;
  }

  /**
   * Fallback Web Speech API engine
   */
  private speakWebSpeech(text: string, callbacks: SpeakCallbacks): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        callbacks.onEnd?.();
        return resolve();
      }

      const synth = window.speechSynthesis;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      this.activeUtterance = utterance;

      const voices = synth.getVoices();
      const preferredVoice = this.getNaturalMaleVoice(voices);
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = 0.98;
      utterance.pitch = 0.95;

      utterance.onstart = () => {
        callbacks.onStart?.();
      };

      utterance.onend = () => {
        this.activeUtterance = null;
        callbacks.onEnd?.();
        resolve();
      };

      utterance.onerror = (e) => {
        this.activeUtterance = null;
        callbacks.onError?.(e);
        resolve();
      };

      synth.speak(utterance);
    });
  }

  /**
   * Helper to find a natural male English voice
   */
  private getNaturalMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (!voices || voices.length === 0) return null;
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const maleNames = ['male', 'david', 'george', 'james', 'mark', 'richard', 'alex', 'daniel', 'fred', 'oliver', 'ryan', 'guy', 'aaron'];

    // 1. Preferred Male Voice
    const maleVoice = englishVoices.find(v => maleNames.some(name => v.name.toLowerCase().includes(name)));
    if (maleVoice) return maleVoice;

    // 2. English Voice
    if (englishVoices.length > 0) return englishVoices[0];

    // 3. Default
    return voices[0] || null;
  }
}

export const voiceService = new VoiceService();
