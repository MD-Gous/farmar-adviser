'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { Mic, MicOff, Volume2, Send, RotateCcw, Languages } from 'lucide-react';
import { DEMO_CHAT_RESPONSES } from '@/lib/constants';

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

export default function VoicePage() {
  const { language, t } = useLanguage();
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      synthRef.current?.cancel();
      recognitionRef.current?.stop();
    };
  }, []);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    setError('');
    setTranscript('');
    setResponse('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition: SpeechRecognition = new SpeechRecognition();

    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => setVoiceState('listening');

    recognition.onresult = (event) => {
      const result = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join('');
      setTranscript(result);
    };

    recognition.onend = () => {
      if (transcript) {
        handleProcess(transcript);
      } else {
        setVoiceState('idle');
      }
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      setError(`Recognition error: ${e.error}. Please try again.`);
      setVoiceState('idle');
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setVoiceState('idle');
  };

  const handleProcess = async (text: string) => {
    if (!text.trim()) return;
    setVoiceState('processing');

    await new Promise(r => setTimeout(r, 1500));

    const lower = text.toLowerCase();
    let reply = DEMO_CHAT_RESPONSES.default;
    if (lower.includes('disease') || lower.includes('blight') || lower.includes('rust') || lower.includes('rot'))
      reply = DEMO_CHAT_RESPONSES.disease;
    else if (lower.includes('pest') || lower.includes('insect') || lower.includes('bug') || lower.includes('worm'))
      reply = DEMO_CHAT_RESPONSES.pest;
    else if (lower.includes('soil') || lower.includes('ph') || lower.includes('nutrient'))
      reply = DEMO_CHAT_RESPONSES.soil;

    // Strip markdown for speech
    const plainText = reply
      .replace(/#{1,3} /g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\|[^|\n]+\|/g, '')
      .replace(/^[-*] /gm, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n{2,}/g, '. ')
      .replace(/\n/g, '. ')
      .trim();

    setResponse(plainText);
    setVoiceState('speaking');
    speakText(plainText);
  };

  const speakText = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text.substring(0, 500));
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => setVoiceState('idle');
    utterance.onerror = () => setVoiceState('idle');

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    synthRef.current?.cancel();
    setVoiceState('idle');
  };

  const reset = () => {
    synthRef.current?.cancel();
    recognitionRef.current?.stop();
    setVoiceState('idle');
    setTranscript('');
    setResponse('');
    setError('');
  };

  const stateConfig = {
    idle: { label: 'Tap to speak', sublabel: 'Ask your farming question', icon: Mic, color: 'bg-green-600', ring: '' },
    listening: { label: t('listening'), sublabel: 'Speak now...', icon: MicOff, color: 'bg-red-500', ring: 'pulse-ring' },
    processing: { label: 'Processing...', sublabel: 'Analysing your query', icon: Mic, color: 'bg-amber-500', ring: '' },
    speaking: { label: 'Speaking...', sublabel: 'AI is responding', icon: Volume2, color: 'bg-blue-500', ring: 'pulse-ring' },
  };

  const config = stateConfig[voiceState];
  const Icon = config.icon;

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <Mic size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Voice Assistant</h1>
          </div>
          <p className="text-gray-500 text-sm">Speak your farming question in English, Hindi or Kannada</p>
        </div>

        {/* Language notice */}
        <div className="flex items-center gap-2 justify-center mb-6">
          <Languages size={16} className="text-green-600" />
          <span className="text-sm text-gray-600">
            Speaking in: <strong className="text-green-700">
              {language === 'hi' ? 'Hindi (हिंदी)' : language === 'kn' ? 'Kannada (ಕನ್ನಡ)' : 'English'}
            </strong>
          </span>
          <Link href="/profile" className="text-xs text-green-600 underline ml-1">Change</Link>
        </div>

        {/* Main Voice Button */}
        <div className="flex flex-col items-center gap-8 mb-8">
          <div className="relative">
            {(voiceState === 'listening' || voiceState === 'speaking') && (
              <>
                <div className={`absolute inset-0 rounded-full ${voiceState === 'listening' ? 'bg-red-400' : 'bg-blue-400'} opacity-20 animate-ping`} />
                <div className={`absolute inset-0 rounded-full ${voiceState === 'listening' ? 'bg-red-400' : 'bg-blue-400'} opacity-10 scale-125 animate-ping`}
                  style={{ animationDelay: '0.3s' }} />
              </>
            )}
            <button
              onClick={() => {
                if (voiceState === 'idle') startListening();
                else if (voiceState === 'listening') stopListening();
                else if (voiceState === 'speaking') stopSpeaking();
              }}
              disabled={voiceState === 'processing'}
              className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1 shadow-xl transition-all ${config.color} text-white disabled:opacity-70 ${config.ring}`}
            >
              <Icon size={36} />
              {voiceState === 'processing' && (
                <div className="flex gap-1 mt-1">
                  {[0, 0.15, 0.3].map((d, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                  ))}
                </div>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="font-semibold text-gray-900 text-lg">{config.label}</p>
            <p className="text-gray-500 text-sm">{config.sublabel}</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="mb-4 bg-white rounded-2xl border border-green-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">You said</span>
            </div>
            <p className="text-gray-800 font-medium">{transcript}</p>
            {voiceState === 'idle' && !response && (
              <button
                onClick={() => handleProcess(transcript)}
                className="mt-3 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <Send size={14} /> Process this query
              </button>
            )}
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="mb-4 bg-white rounded-2xl border border-green-100 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">🤖</span>
                </div>
                <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">AI Response</span>
              </div>
              <button
                onClick={() => speakText(response)}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                <Volume2 size={13} /> Play again
              </button>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-6">{response}</p>
            <Link
              href={`/chat?q=${encodeURIComponent(transcript)}`}
              className="mt-3 inline-flex items-center gap-1 text-xs text-green-600 underline font-medium"
            >
              See full response in Chat →
            </Link>
          </div>
        )}

        {/* Reset */}
        {(transcript || response) && (
          <div className="flex justify-center">
            <button
              onClick={reset}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <RotateCcw size={16} /> Start over
            </button>
          </div>
        )}

        {/* Quick Prompts */}
        {voiceState === 'idle' && !transcript && (
          <div className="mt-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center mb-3">Quick Questions</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                'My crop leaves are turning yellow, what should I do?',
                'How to control aphids in my vegetable field?',
                'What fertilizer should I apply for rice?',
                'Tell me about PM-KISAN scheme',
              ].map(q => (
                <button
                  key={q}
                  onClick={() => { setTranscript(q); handleProcess(q); }}
                  className="text-left px-4 py-3 bg-white rounded-xl border border-green-100 text-sm text-gray-700 hover:bg-green-50 hover:border-green-300 transition-all"
                >
                  🎙️ &quot;{q}&quot;
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
