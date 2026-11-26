import React, { useState } from 'react';
import { Play, Square, SkipForward } from 'lucide-react';
import { voiceService } from '../services/voiceService';

interface ExplainGuideProps {
  activeSection: string;
  isSpeaking: boolean;
  setIsSpeaking: (speaking: boolean) => void;
}

const SECTION_FLOW = ['hero', 'objective', 'about', 'work', 'capabilities', 'experience', 'education', 'contact'];

export default function ExplainGuide({ activeSection, isSpeaking, setIsSpeaking }: ExplainGuideProps) {
  const [currentSection, setCurrentSection] = useState<string>(activeSection || 'hero');

  const handleToggleExplain = () => {
    if (isSpeaking) {
      voiceService.stopSpeech();
      setIsSpeaking(false);
    } else {
      const targetSection = activeSection || currentSection || 'hero';
      setCurrentSection(targetSection);
      voiceService.speakSection(targetSection, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  const handleNextSection = () => {
    voiceService.stopSpeech();
    const currentIndex = SECTION_FLOW.indexOf(activeSection || currentSection);
    const nextIndex = (currentIndex + 1) % SECTION_FLOW.length;
    const nextSection = SECTION_FLOW[nextIndex];
    setCurrentSection(nextSection);

    const el = document.getElementById(nextSection) || document.querySelector(`[data-section="${nextSection}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    voiceService.speakSection(nextSection, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  return (
    <div className="explain-guide-widget" aria-label="AI Guide Control Panel">
      <div className="explain-guide-header">
        <span className="explain-guide-title">AI GUIDE</span>
        <span className={`explain-guide-status ${isSpeaking ? 'explain-guide-status--active' : ''}`}>
          <i /> {isSpeaking ? 'PROCESSING' : 'SYSTEM READY'}
        </span>
      </div>

      <div className="explain-guide-actions">
        <button
          type="button"
          className={`explain-btn ${isSpeaking ? 'explain-btn--stop' : 'explain-btn--play'}`}
          onClick={handleToggleExplain}
          aria-label={isSpeaking ? 'Stop speech explanation' : 'Start speech explanation'}
        >
          {isSpeaking ? (
            <>
              <Square size={12} /> STOP
            </>
          ) : (
            <>
              <Play size={12} /> EXPLAIN
            </>
          )}
        </button>

        <button
          type="button"
          className="explain-btn explain-btn--next"
          onClick={handleNextSection}
          aria-label="Explain next portfolio section"
        >
          <SkipForward size={12} /> NEXT
        </button>
      </div>
    </div>
  );
}
