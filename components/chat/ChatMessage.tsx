'use client';

import { useState } from 'react';
import { Copy, Check, Volume2, Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/types';

interface Props {
  message: ChatMessageType;
  onSpeak?: (text: string) => void;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/g, '<ul>$1</ul>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-green-600 underline">$1</a>');
}

export default function ChatMessageComponent({ message, onSpeak }: Props) {
  const [copied, setCopied] = useState(false);
  const isBot = message.role === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (ts: string) => {
    return new Date(ts).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot size={16} className="text-white" />
        </div>
      )}

      <div className="max-w-xs md:max-w-md lg:max-w-2xl">
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="Uploaded crop"
            className="w-full rounded-xl mb-2 max-h-48 object-cover border border-gray-200"
          />
        )}

        <div className={`rounded-2xl px-4 py-3 ${
          isBot
            ? 'bg-white border border-green-100 text-gray-800 rounded-tl-sm shadow-sm'
            : 'bg-green-600 text-white rounded-tr-sm'
        }`}>
          {isBot ? (
            <div
              className="prose-farm text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
            />
          ) : (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
        </div>

        <div className={`flex items-center gap-2 mt-1 ${isBot ? 'justify-start' : 'justify-end'}`}>
          <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
          {isBot && (
            <>
              <button onClick={handleCopy} className="text-gray-400 hover:text-gray-600 transition-colors p-0.5">
                {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
              </button>
              {onSpeak && (
                <button onClick={() => onSpeak(message.content)} className="text-gray-400 hover:text-green-600 transition-colors p-0.5">
                  <Volume2 size={13} />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
          <User size={16} className="text-gray-600" />
        </div>
      )}
    </div>
  );
}
