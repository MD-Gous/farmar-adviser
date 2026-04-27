'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Paperclip, Mic, MicOff, Plus, Sprout, X, Image } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import ChatMessageComponent from '@/components/chat/ChatMessage';
import TypingIndicator from '@/components/chat/TypingIndicator';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { ChatMessage } from '@/types';
import { DEMO_CHAT_RESPONSES } from '@/lib/constants';
import toast from 'react-hot-toast';

const SUGGESTED_QUESTIONS = {
  en: [
    "My tomato leaves have yellow spots — what disease is it?",
    "How to control stem borer in rice?",
    "Best fertilizer schedule for wheat crop?",
    "When to irrigate cotton crop?",
    "Organic pest control methods for vegetables?",
  ],
  hi: [
    "मेरे टमाटर की पत्तियों पर पीले धब्बे हैं — क्या बीमारी है?",
    "चावल में तना छेदक को कैसे नियंत्रित करें?",
    "गेहूं के लिए सर्वोत्तम उर्वरक कार्यक्रम?",
    "कपास की फसल में सिंचाई कब करें?",
  ],
  kn: [
    "ನನ್ನ ಟೊಮ್ಯಾಟೋ ಎಲೆಗಳಲ್ಲಿ ಹಳದಿ ಚುಕ್ಕೆಗಳಿವೆ — ಯಾವ ರೋಗ?",
    "ಭತ್ತದಲ್ಲಿ ಕಾಂಡ ಕೊರೆಯುವ ಹುಳವನ್ನು ಹೇಗೆ ನಿಯಂತ್ರಿಸುವುದು?",
    "ಗೋಧಿ ಬೆಳೆಗೆ ಉತ್ತಮ ಗೊಬ್ಬರ ಕಾರ್ಯಕ್ರಮ?",
  ]
};

function detectIntent(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('disease') || lower.includes('spot') || lower.includes('yellow') || lower.includes('blight') || lower.includes('रोग') || lower.includes('ರೋಗ')) return 'disease';
  if (lower.includes('pest') || lower.includes('insect') || lower.includes('borer') || lower.includes('कीट') || lower.includes('ಕೀಟ')) return 'pest';
  if (lower.includes('soil') || lower.includes('fertilizer') || lower.includes('urea') || lower.includes('मिट्टी') || lower.includes('ಮಣ್ಣು')) return 'soil';
  return 'default';
}

async function getAIResponse(userMessage: string, language: string): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, language }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.response;
    }
  } catch {}
  // Fallback to local responses
  await new Promise(r => setTimeout(r, 1000));
  const intent = detectIntent(userMessage);
  return DEMO_CHAT_RESPONSES[intent] || DEMO_CHAT_RESPONSES.default;
}

function ChatPageContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language, t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic) {
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: DEMO_CHAT_RESPONSES.default,
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMsg]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text?: string, imgUrl?: string) => {
    const msgText = text || input.trim();
    if (!msgText && !imgUrl) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: msgText || 'Please analyze this crop image.',
      timestamp: new Date().toISOString(),
      imageUrl: imgUrl,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setImagePreview(null);
    setLoading(true);

    const response = await getAIResponse(msgText, language);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error('Voice not supported in this browser. Try Chrome!');
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
    };
    recognition.onerror = () => {
      setIsRecording(false);
      toast.error('Voice recognition failed');
    };
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const speakText = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text.replace(/[*#\[\]]/g, ''));
    utter.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-IN';
    utter.rate = 0.9;
    speechSynthesis.speak(utter);
  };

  const suggestions = (SUGGESTED_QUESTIONS as any)[language] || SUGGESTED_QUESTIONS.en;

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-64px-5rem)] lg:h-[calc(100vh-64px)] max-w-4xl mx-auto">

        {/* Chat Header */}
        <div className="bg-white border-b border-green-100 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Sprout size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">AI Krishi Officer</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600">Online • Ready to help</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => { setMessages([]); setInput(''); }}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus size={14} /> {t('newChat')}
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-green-50/30">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 py-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🌾</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {language === 'hi' ? 'नमस्ते! मैं आपका AI कृषि अधिकारी हूं' :
                   language === 'kn' ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಅಧಿಕಾರಿ' :
                   'Namaste! I\'m your AI Krishi Officer'}
                </h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                  {language === 'hi' ? 'अपनी फसल की समस्या बताएं या नीचे से एक प्रश्न चुनें' :
                   language === 'kn' ? 'ನಿಮ್ಮ ಬೆಳೆ ಸಮಸ್ಯೆ ಹೇಳಿ ಅಥವಾ ಕೆಳಗಿನ ಪ್ರಶ್ನೆ ಆಯ್ಕೆ ಮಾಡಿ' :
                   'Describe your crop issue or choose a question below'}
                </p>
              </div>
              {/* Quick suggestion chips */}
              <div className="w-full max-w-lg flex flex-wrap gap-2 justify-center">
                {suggestions.map((q: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="bg-white border border-green-200 text-green-800 text-xs px-3 py-2 rounded-full hover:bg-green-50 hover:border-green-400 transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
              {/* Feature hints */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                {[
                  { icon: '📸', label: 'Upload photo' },
                  { icon: '🎙️', label: 'Voice query' },
                  { icon: '🌐', label: 'Multilingual' },
                ].map(({ icon, label }) => (
                  <div key={label} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map(msg => (
                <ChatMessageComponent key={msg.id} message={msg} onSpeak={speakText} />
              ))}
              {loading && <TypingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="bg-white border-t border-gray-100 px-4 py-2">
            <div className="relative inline-block">
              <img src={imagePreview} alt="Preview" className="h-20 w-20 rounded-xl object-cover border border-gray-200" />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <X size={10} />
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-green-100 px-4 py-3">
          <div className="flex items-end gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-green-400 hover:text-green-600 transition-colors"
              title="Upload crop image"
            >
              <Image size={18} />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('typeMessage')}
                rows={1}
                className="input-field resize-none py-2.5 pr-4 text-sm min-h-[44px] max-h-32"
                style={{ height: 'auto' }}
                onInput={e => {
                  const el = e.target as HTMLTextAreaElement;
                  el.style.height = 'auto';
                  el.style.height = Math.min(el.scrollHeight, 128) + 'px';
                }}
              />
            </div>

            <button
              onClick={handleVoice}
              className={`flex-shrink-0 w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-colors
                ${isRecording
                  ? 'border-red-400 bg-red-50 text-red-600 pulse-ring'
                  : 'border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600'}`}
              title="Voice input"
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <button
              onClick={() => sendMessage(undefined, imagePreview || undefined)}
              disabled={loading || (!input.trim() && !imagePreview)}
              className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-xs text-center text-gray-400 mt-2">
            {isRecording ? (
              <span className="text-red-500 font-medium">🔴 Listening... speak your question</span>
            ) : (
              <span>Enter to send • Shift+Enter for new line • 🌐 Supports EN, हिंदी, ಕನ್ನಡ</span>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-green-50 flex items-center justify-center"><div className="text-green-600">Loading...</div></div>}>
      <ChatPageContent />
    </Suspense>
  );
}
